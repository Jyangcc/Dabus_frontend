import { createContext, useEffect, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Firebase Initialization //
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

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
const database = getDatabase(app)

const DataContext = createContext(null);

const DataDispatchContext = createContext(null);

export function DataProvider({ children }) {
  const init = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem("data"));
      return data;
    } catch (error) {
      console.log(error); 
      return initialData; // yeah // can we push a version that contain our discussion and we can clear it lol
      // i go get some water
      // ok 
    }
  }
  //如何思考async
  // 我完全不知道常數可以async完丟到reducer裡 
  //超協 什麼
  // wait does async work like that
  // don't we need to use something like await
  // idk tho
  // not sure if we need to get each of the item in data 
  // or we can do it just like above 
  // maybe don't need when getItem()
  // but need await when setItem(), i just copy some of the code on the link i send in dc 
  // what about uh
  // wait is init a function that returns data or we need to use data in 
  // here
  // i think init is fuction
  // then no one calls it
  // 哇勒
  // how about sleeping first
  // what if a function is that returns a value but in it it await AsyncStorage.getItem("data") and if error it returns initialData
  // it could work
  // who call it, 
  // like since it returns a vlaue we can just const data = that function;
  // got it
  // how to name it
  // it's not initialData but it's a initial data => ok 
  // ok just call it data what ever uh wait we can't
  // yeah even it might not be local data just call it local data
  const localData = init(); // what
  // ok maybe
  const [data, dispatch] = useReducer(
    dataReducer,
    localData 
  );
  
  async function fetchData(/*TODO*/) {
    const dispatch = useDataDispatch();
    dispatch({
      type: 'setLoading', 
      value: true
    });

    try {
      const data = await getDataFromDB(/*TODO*/); // TODO
      dispatch({
        type: 'overWrite', 
        data: data
      }); 
      dispatch({
        type: 'setLoading', 
        value: false
      });
    } catch (err) {
      console.error('Error getting data from db', err);
      if (true/*TODO: if there's data in asyncStorage*/) {
        const data = null; // TODO: get data from asyncStorage

        dispatch({
          type: 'overWrite',
          data: data
        }) //ycc can u help me think
        // so we all get data from local ?
        // and then check the uid or sth to know whether 
        // but how to do that before [data, dispatch] works 
        // the [data, dispatch] at the very beginning of the DataProvider will set data to initil data
        // but we need to check the loggedIn from the data in asyncStorage first to know wether we should fetch data from db
        dispatch({
          type: 'setLoading', 
          value: false
        });
      }
    }
  }

  useEffect(() => {
    fetchData(/*TODO*/);
  }, []);

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

function writeDataToDB(uuid, data) {
  
}

function getDataFromDB(uuid) {
  const reference = ref(database, 'users/' + uuid);
  onValue(reference, (snapshot) => {
    return snapshot.val();
  }) 
}

export function useData() {
  return useContext(DataContext);
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}

function dataReducer(data, action) {
  switch (action.type) {
    case 'overWrite': {
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
      // 期待呼叫這個reducer的action裡面有uuid
      const uuid = action.uuid
      // 那我先串一下db的東東(fetch資料merge之類的)
      const loggedIn = /*dbReturn*/true;
      return {
        ...data,
        loggedIn: loggedIn,
      }
    }
    case 'setLoading': {
      return {
        ...data,
        loading: action.loading
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
  uuid: null,
  loading: true,
  settings: {theme: 'light', language: 'english', color: '#07B'},
  favorite: [
    'stop 1',
    'stop 2',
    'stop 3',
    'stop 4',
  ],
  recentlySearched: [
    'stop 1',
    'stop 6',
    'stop 8',
    'stop 99'
  ],
  reminder: [
    {
      id : 0,
      bus: 'Bus1',
      from: 'Here',
      to: 'There',
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
      from: 'Here',
      to: 'There',
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
    {color: '#D83', unlocked: false},
    {color: '#56B', unlocked: false},
    {color: '#39B', unlocked: false},
    {color: '#969', unlocked: false},
  ],
};