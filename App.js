import React, {useState, useEffect, createContext, useContext, useReducer} from 'react';
import { View, Text, Button,StyleSheet, Switch,ScrollView,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Header} from 'react-native-elements';

import TextInputDestination from './Text_Input.js';
import Setting_Page from './Setting_Page.js';
import BusDetailContainer from './BusDetailContainer.js';
import RecentSearchList from './RecentSearchList.js';
import { useData, useDataDispatch, DataProvider } from './DataContext.js'; 
import ReminderList from './ReminderList.js';
import FavoriteList from './FavoriteList.js';
import Checkbox from './CheckBox.js';
import Weather from './Weather.js';
import Fruit from './Fruits.js';
import { Feather } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Deep_stack = createNativeStackNavigator();

function ProviderRoot(){
  const {settings: {color}} = useData();
  const headerOptions_Root = ({ route, navigation }) => ({
    headerStyle: {
      headerHeight: 104,
      backgroundColor :color,
    },
    headerTitleStyle: {
      alignSelf: "start", 
      fontSize: 16, 
      backgroundColor: color
    },
    headerRight: () => (
      <Ionicons 
        name="settings-sharp" 
        size={24} 
        color="#FFF"
        onPress={() => navigation.navigate("Setting")}
      />
    ),
    headerLeft: () => (
      <View style = {[styles.container,{marginLeft:10}]}>
        <MaterialCommunityIcons name="bus" size={40} color="#FFF" />
        <Text style = {{fontSize: 24,fontWeight: "bold",color: "#FFF"}}> Dabus</Text>
      </View>
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
  return(
    <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName = 'Root'>
        <Stack.Screen name="Setting" component={Setting_Page} options={headerOptions_Setting}  /> 

        <Stack.Screen name="Root" component={Root} options={headerOptions_Root} /> 
    </Stack.Navigator> 
  );
}

function Root(){
  const {settings: {color}} = useData();
  
  return(
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle:{
          backgroundColor: color,
          height:100,
        },
        tabBarItemStyle:{
          margin:5,
          border:30 
        }
      }} 
      initialRouteName="Main"
      tabBarActiveTintColor = "#FF9"
      tabBarInactiveTintColo = "#F99"
      >
        <Tab.Screen name="Favorite" component={FavoriteScreen}
        options={{ 
          tabBarIcon:() => <Feather name="star" size={40} color="white" />
        }} 
        />

        <Tab.Screen 
          name="Main"
          component={MainFlow} 
          options={{
            tabBarIcon: () => 
            <Ionicons name="home-outline" size={40} color="white" />
          }}
        />

        <Tab.Screen 
          name="Reminder" 
          component={ReminderScreen}  
          options={{ 
            tabBarIcon:() => <Ionicons name="notifications-outline" size={40} color="white"  />
          }} 
        />
    </Tab.Navigator> 
  );
}

function MainFlow({navigation}){
  const {settings:{language}} = useData();
  const homeName = language === 'chinese' ? '首頁' : 'Home';
  return(
    <Stack.Navigator initialRouteName = {homeName} screenOptions={{ headerShown: false}}>
        <Stack.Screen name = {homeName} component={Home} 
         tabBarIcon = {<Ionicons name="home-outline" size={24} color="black" />} />
        <Stack.Screen name = "Search" component={Search}/>
        <Stack.Screen name = "BusDtail" component={BusDetail}/>

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 0,
    backgroundColor: '#fff',
  },
  treePercentscss :{
    fontSize:50, 
    alignItems: 'center', 
    justifyContent: 'center',
    position : 'absolute',
    top:400,

  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginBottom:0,
  },

});

function Home({navigation}){
  const {settings:{color}} = useData();
  const {treePercents} = useData();
  const dispatch = useDataDispatch();

  return(
    <View>
      {/* <Header
        ViewComponent={test}
        backgroundColor={color}
        leftComponent={<View style = {[styles.container,{marginLeft:10}]}>
        <MaterialCommunityIcons name="bus" size={36} color="#FFF" />
        <Text style = {{fontSize: 20,fontWeight: "bold",color: "#FFF"}}> Dabus</Text>
      </View>}
        rightComponent={<Ionicons 
          name="settings-sharp" 
          size={24} 
          color="#FFF"
          onPress={() => navigation.navigate("Setting")}
        />}
      />    */}
      <View style={{ zIndex:2, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />

        <Text onPress={() =>dispatch({
          type :'addTreePercents',
          treePercents :30
      })}
      style = {styles.treePercentscss}> {treePercents} %</Text>


      </View>
      <Weather style={{zIndex:2,}} />
      <Button style={{zIndex:2,}} title="Click me to add 30 tree" 
      onPress={() =>dispatch({
          type :'addTreePercents',
          treePercents :30
      })}/>
    

      <Text style={{zIndex:2,}} >color {color}</Text>
      
      <Fruit style={{zIndex:0,}}  />      
    </View>
  )
}

function Search({navigation}){
  const busStops = {123: false, 345: false, 567: false};
  return(
    <View>
      <ScrollView style={{height: 300}} keyboardShouldPersistTaps = 'always'>

        <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TextInputDestination busStops={busStops}/>

        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Go to BusDtail" onPress={() => navigation.navigate('BusDtail')} />
        </View>
        <RecentSearchList/>

      </ScrollView>
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

function ReminderScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Reminder Screen</Text>

      <ReminderList/>
      

    </View>
  );
}

function FavoriteScreen({navigation}){
  return(
    <View style={{ flex: 1, alignItems: 'center',  }}>
      <Text>Favorite Screen</Text>
      
      <FavoriteList/>
    </View>
  );
}
  
function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProviderRoot">
          <Stack.Screen name="ProviderRoot" component={ProviderRoot} options={{headerShown: false}}/> 
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
} 

export default App;