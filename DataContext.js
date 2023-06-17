import { createContext, useContext, useReducer } from 'react';

const DataContext = createContext(null);

const DataDispatchContext = createContext(null);

export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(
    dataReducer,
    initialData
  );

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(dataContext);
}

export function useDataDispatch() {
  return useContext(dataDispatchContext);
}

function dataReducer(data, action) {
  switch (action.type) {
    case 'toggleTheme': {
      return {...data, settings: {
        ...data.settings,
        theme: data.settings.theme === 'dark' ? 'light' : 'dark'
      }};
    }
    case 'toggleLanguage': {
      return {...data, settings: {
        ...data.settings,
        language: data.settings.language === 'english' ? 'chinese' : 'english'
      }};
    }
    case 'setColor': {
      return {...data, settings: {
        ...data.settings,
        color: data.settings.color === action.color
      }};
    }
    case 'addtreePercents':{
      if (data.treePercents + action.treePercents > 100) {
        // TODO: handle fruit
        return {
          ...data,
          treePercents: 0
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
        favorite : data.favorite.push(action.favorite)
      };
    }
    case 'removeFavorite':{
      return {
        ...data, 
        favorite: data.favorite.filter(fav =>
          fav !== action.favorite
        )
      };
    }
    case 'addReminder':{
      return {
        ...data, 
        reminder: data.reminder.push({
          ...action.reminder,
          id: nextid++
        }),
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
        reminder: reminder.map(rem => {
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
        reminder: reminder.map(rem => {
          if (rem.id === action.id)
            return {...rem, minute: action.minute}
          else 
            return rem
        }
      )
      };
    }
    case 'toggleReminderRepeatDay':{
      return {
        ...data, 
        reminder: reminder.map(rem => {
            if (rem.id === action.id) 
              return Object.fromEntries(
                Object.entries(rem.repeat).map(
                  ([day, on]) => [day, (on => !on)(on)]
                )
              )
            else 
              return rem;
          }
        )
      };
    }
    case 'setReminderBeforeTime':{
      return {
        ...data, 
        reminder: reminder.map(rem => {
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
        reminder: reminder.map(rem => {
            if (rem.id === action.id)
              return {...rem, type: action.type};
            else 
              return rem;
          }
        )
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextid = 1;

const initialData = {
  settings: {theme: 'light', language: 'chinese', color: 'blue'},
  favorite: [
    'name',
  ],
  recentlySearched: [
    'name',
  ],
  reminder: [
    {
      id : 0,
      bus: 'Bus1',
      from: 'Here',
      to: 'There',
      type: 'on', //on, off (from bus)
      repeat: {
        0: false,
        1: false,
        2: false, 
        3: false, 
        4: false, 
        5: false, 
        6: false
      },
      hour: 18,
      minute: 30,
      remind: 10
    },
  ],
  treePercents: 30,
};