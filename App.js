import React, {useState, useEffect, createContext, useContext, useReducer} from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TextInputDestination from './Text_Input.js';
import Setting_Page from './Setting_Page.js';
import BusDetailContainer from './BusDetailContainer.js';

import RecentSearchList from './RecentSearchList.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Deep_stack = createNativeStackNavigator();

function Root(){
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        <Tab.Screen name="Notification" component={NotificationScreen} />

        <Tab.Screen name="Main" component={MainFlow} />

        <Tab.Screen name="Favorite" component={FavoriteScreen}/>
    </Tab.Navigator> 
  );
}

function MainFlow({navigation}){
  const {settings, setSettings} = useSettings();
  return(
    <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name = {settings.language === 'chinese' ? "首頁" : 'Home'} component={Home} />
        <Stack.Screen name = "Search" component={Search}/>
        <Stack.Screen name = "BusDtail" component={BusDetail}/>

    </Stack.Navigator>
  )
}

function Home({navigation}){
  const {settings, setSettings} = useSettings();
  return(
    <View>
      {/* <View  style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: settings.theme === 'dark' ? '#222' : '#FFF'}}>
        <Text>this is Home</Text>
      </View> */}
      
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
      </View>
      
    </View>
  )
}

function Search({navigation}){
  const busStops = {123: false, 345: false, 567: false};
  return(
    <View>

      <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextInputDestination busStops={busStops}/>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Go to BusDtail" onPress={() => navigation.navigate('BusDtail')} />
      </View>
      <RecentSearchList/>

    </View>
  )
}

function BusDetail({navigation}) {
  return (
    <View style={{ justifyContent: 'center' }}>
      
      <BusDetailContainer/>
          
    </View>

  );
}

function NotificationScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notification Screen</Text>
      <Button
        title="Go to Notification... again"
        onPress={() => navigation.push('Notification')}
      />
      <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />

    </View>
  );
}

function FavoriteScreen({navigation}){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Favorite Screen</Text>
      <Button
        title="Go to Favorite... again"
        onPress={() => navigation.push('Favorite')}
      />
      <Button title="Go to Main" onPress={() => navigation.navigate('Main')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}


const headerOptions_Root = ({ route, navigation }) => ({
  headerTintColor: "black",
  headerTitleStyle: { alignSelf: "center", fontSize: 16 },
  
  headerRight: () => (
    <Button 
      title="Setting "
      onPress={() => navigation.navigate("Setting")}
    />
  ),
  headerLeft: () => (
    <Text></Text>
  ),
});

const headerOptions_Setting = ({ route, navigation }) => ({
  headerTintColor: "black",
  headerTitleStyle: { alignSelf: "center", fontSize: 16 },
  
  headerRight: () => (
    <Button 
      title="Back " 
      onPress={() => navigation.goBack()}
      // onPress={() => console.log(navigation)}
    />
  ),
  headerLeft: () => (
    <Text></Text>
  ), 
});

// const initialSettings = {theme: 'light', language: 'chinese', color: 'blue'};
// const Settings = createContext(initialSettings);
// export function useSettings() {
//   return useContext(Settings);
// }


function App() {
  const [settings, setSettings] = useState(initialSettings);
  
  return (
    <Settings.Provider value={{settings, setSettings}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root">

          <Stack.Screen name="Setting" component={Setting_Page} options={headerOptions_Setting}  /> 

          <Stack.Screen name="Root" component={Root} options={headerOptions_Root} /> 

        </Stack.Navigator>
      </NavigationContainer>
    </Settings.Provider>
    // The name must be unique
  );
} 

export default App;