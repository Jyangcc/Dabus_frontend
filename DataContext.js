import { createContext, useEffect, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Firebase Initialization //
import { initializeApp } from "@firebase/app";
import { getDatabase, ref, set, get, onValue } from "@firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAul7mwI4BoZVSw5BdDYyo7o5FOGJxMm2A",
  authDomain: "dabus-d0bb3.firebaseapp.com",
  databaseURL: "https://dabus-d0bb3-default-rtdb.firebaseio.com",
  projectId: "dabus-d0bb3",
  storageBucket: "dabus-d0bb3.appspot.com",
  messagingSenderId: "1050889385758",
  appId: "1:1050889385758:web:6cab81cf8b78c7429d7b0f",
  measurementId: "G-K5Q4PMNELZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
var uid;

const DataContext = createContext(null);

const DataDispatchContext = createContext(null);
export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(
    dataReducer,
    initialData
  );

  useEffect(() => {
    // getDataFromDB('ycc_test_1')
    fetchData();
    // console.log(data)
  }, []); 

  const fetchData =  async () => {
    // const dispatch = useDataDispatch();
    console.log('🤯');
    // dispatch({
    //   type: 'setLoading', 
    //   value: true
    // });
  
    // const localData = (async () => {
    //   try {
    //     const data = JSON.parse(await AsyncStorage.getItem("data"));
    //     dispatch({
    //       type: 'overwrite', 
    //       value: data
    //     });
    //     console.log('🤯');
    //     return data;
    //   } catch (error) {
    //     console.log(error);
    //     console.log('🤯');
    //     await AsyncStorage.setItem("data", JSON.stringify(initialData)); 
    //     return initialData; 
    //   }
    // })(); // don't remove the ()
  
    // if (localData.loggedIn) {
    if(true){
      const uuid = 'ycc_test_1'
      try {
        const dbData = await getDataFromDB(uuid);//
        dispatch({
          type: 'overwrite', 
          data: dbData
        }); 
        // dispatch({
        //   type: 'setLoading', 
        //   value: false
        // });
      } 
      catch (err) {
        console.error('Error getting data from db', err);
        dispatch({
          type: 'setLoading', 
          value: false
        });
      }
    }
  } 


  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

function writeDataToDB(uid, data) {
  const reference = ref(database, '/users/' + uid);
  try{
    set(reference, data);
    console.log('Successfully write data to DB.');
  }
  catch (err) {
    console.log('Failed to write data to DB.', err);
  }
}

async function getDataFromDB(uid) {
  const reference = ref(database, 'users/' + uid);
  try {
    const snapshot = await new Promise((resolve, reject) => {
      onValue(reference, (snapshot) => {
        resolve(snapshot);
      }, (error) => {
        reject(error);
      });
    });

    const data = snapshot.val();
    console.log('Successfully read data from DB.');
    console.log(data);
    return data;
  } catch (error) {
    console.log('Failed to read data from DB.', error);
    throw error;
  }
}

function SignIn(email, password) {
  return new Promise ((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log('Logged in successfully.');
        uid = credential.user.uid;
        resolve(credential.user.uid);
      })
      .catch((err) => {
        console.log('Failed to log in,', err);
        reject('Failed to log in,', err);
        
      })
  })
}

function SignOut() {
  return new Promise((resolve, reject) => {
    signOut(auth).then(() => {
      resolve('Signed out successfully.')
    }).catch((err) => {
      reject('Failed to signed out.', err);
    });
  })
}

function createAccount(email, password) {
  return new Promise ((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log('Created successfully!');
        uid = credential.user.uid;
        resolve(credential.user.uid);
      })
      .catch((err) => {
        reject('Failed to create account', err);
      })
  })
}

export function useData() {
  return useContext(DataContext);
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}

function dataReducer(data, action) {
  console.log(data)

  switch (action.type) {
    case 'todb':{
      writeDataToDB('ycc_test_1',data);
      return data;
    }
    case'busdata':{ 
      return{
        ...data,
        busdata : action.data
      };
    }
    case 'overwrite': {
      return action.data;
    }
    case 'toggleTheme': {
      return {...data, settings: {
        ...data.settings,
        theme: data.settings.theme === 'dark' ? 'light' : 'dark'
      }};
    }
    case 'setLanguage': {
      return {...data, settings: {
        ...data.settings,
        language: action.language
      }};
    }
    case 'setColor': {
      return {...data, settings: {
        ...data.settings,
        color: action.color
      }};
    }
    case 'addTreePercents':{
      if (data.treePercents + action.treePercents > 100) {
        const newColor = data.colors.find(c => c.unlocked === false);
        if (newColor) 
          return {
            ...data,
            showFruit: true,
            newColor: newColor.color,
            colors: data.colors.map(c => {
              if (c.color === newColor.color)  
                return {
                  ...c,
                  unlocked: true
                }
              else 
                return c;
            })
          }
        else {
          console.log('Not enough colors!');
          return data;
        }
      }
      else{
        return {
          ...data,
          treePercents: data.treePercents + action.treePercents
        }
      }
    }
    case 'addFavorite':{
      return {
        ...data, 
        favorite : [
          ...data.favorite,
          action.name
        ]
      };
     
    }
    case 'removeFavorite':{
      return {
        ...data, 
        favorite: data.favorite.filter(fav =>
          fav !== action.name
        )
      };
    }
    case 'addReminder':{
      return {
        ...data, 
        reminder :[
          ...data.reminder,
          {
            ...action.reminder,
            id: nextid++
          }
        ]
        
      };
    }
    case 'removeReminder':{
      return {
        ...data,
        reminder: data.reminder.filter(rem => 
          rem.id !== action.id
        )
      };
    }
    case 'setReminderHour':{
      return {
        ...data, 
        reminder: data.reminder.map(rem => {
            if (rem.id === action.id)
              return {...rem, hour: action.hour}
            else 
              return rem
          }
        )
      };
    }
    case 'setReminderMinute':{
      console.log(action)
      return {
        ...data, 
        reminder: data.reminder.map(rem => {
          if (rem.id === action.id)
            return {...rem, minute: action.minute}
          else 
            return rem
        }
      )
      };
    }
    case 'toggleReminderRepeatDay':{
      console.log('Toggling ', action.day);
      console.log(action)
      return {
        ...data, 
        reminder: data.reminder.map(rem => {
            if (rem.id === action.id) {
              return {
                ...rem,
                repeat: rem.repeat.map(rep => {
                  if (rep.day === action.day)
                    return {
                      ...rep,
                      on: !rep.on
                    }
                  else 
                    return rep;
                })
              }
            }
            else 
              return rem;
          }
        )
      };
    }
    case 'setReminderBeforeTime':{
      return {
        ...data, 
        reminder: data.reminder.map(rem => {
            if (rem.id === action.id)
              return {...rem, remind: action.remind}
            else 
              return rem
          }
        )
      };
    }
    case 'setReminderType':{
      return {
        ...data, 
        reminder: data.reminder.map(rem => {
            if (rem.id === action.id)
              return {...rem, type: action.type};
            else 
              return rem;
          }
        )
      };
    }
    case 'hideFruit': {
      return {
        ...data,
        showFruit: false,
        treePercents: 0
      }
    }
    case 'login':{
      // 期待呼叫這個reducer的action裡面有uuid(只是用來更新下面的uuid)
      // (無論他之前有沒有登入過，如果沒有的話，我們)

      console.log("press log in")
      return {
        ...data,
        uuid: action.uuid,
        loggedIn: true,
      }
    }
    case 'setLoading': {
      return {
        ...data,
        loading: action.loading
      }
    }
    case 'setRouteData': {
      return {
        ...data,
        present_location: action.present_location,
        destination_location: action.destination_location,
        p_lon: action.p_lon,   // 現在位置經度
        p_lat: action.p_lat,   // 現在位置緯度
        d_lon: action.d_lon,   // 目的地位置經度
        d_lat: action.p_lat,   // 目的地位置緯度
        buses_routes: action.buses_routes, // 可能的公車路線
        busdata : action.busdata
      }
    }
    
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextid = 1;

const initialData = {
  loggedIn: false,
  uuid: 'ycc_test_1',
  loading: true,
  settings: {theme: 'light', language: 'english', color: '#07B'},
  favorite: [
    '新竹火車站',
    '馬偕醫院',
    
  ],
  recentlySearched: [
    '東門市場',
    '新竹高鐵站',
    '新竹火車站'
  ],
  reminder: [
    {
      id : 0,
      bus: 'Bus1',
      from: '清華大學',
      to: '新竹火車站',
      repeat: [
        {day: 0, on: false},
        {day: 1, on: false},
        {day: 2, on: true},
        {day: 3, on: false},
        {day: 4, on: false},
        {day: 5, on: true},
        {day: 6, on: false},
      ],
      hour: 18,
      minute: 30,
      remind: 10
    },
    {
      id : 1,
      bus: 'Bus3',
      from: '清華大學',
      to: '新竹高鐵站',
      repeat: [
        {day: 0, on: false},
        {day: 1, on: false},
        {day: 2, on: false},
        {day: 3, on: false},
        {day: 4, on: false},
        {day: 5, on: false},
        {day: 6, on: false},
      ],
      hour: 18,
      minute: 30,
      remind: 10
    },
  ],
  treePercents: 40,
  showFruit: false,
  newColor: null,
  colors: [
    {color: '#07B', unlocked: true},
    {color: '#D83', unlocked: true},
    {color: '#56B', unlocked: false},
    {color: '#39B', unlocked: false},
    {color: '#969', unlocked: false},
  ],
  present_location: '清華大學', // 現在位置
  destination_location: null, // 目的地位置
  p_lon: 120.994375,   // 現在位置經度
  p_lat: 24.797119,   // 現在位置緯度
  d_lon: 120.994375,   // 目的地位置經度
  d_lat: 24.797119,   // 目的地位置緯度
  buses_routes: [], // 可能的公車路線
  busdata : [
    {
      busType: '11',
      score: 2753.5304461060095
    },
    {
      busName: "2",
      departureStop: "火車站",
      destinationStop: "交大光復校區",
      currentStop: [
      ],
      arriveTime: 40,
      FromStopLat: 24.803307,
      FromStopLon: 120.971927,
      Stops: [
        {
          name: "火車站",
          arriveTime: 2400
        },
        {
          name: "東門市場",
          arriveTime: 2460
        }
      ],
      BusType: 0,
      Direction: 0,
      score: 5067.4403770957515
    }
    ],

};