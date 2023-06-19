import React, {useState} from 'react';
import { createContext, useEffect, useContext, useReducer } from 'react';
import {SafeAreaView,ScrollView, StyleSheet, TextInput,TouchableOpacity,Text, View} from 'react-native';
import {useData, useDataDispatch} from './DataContext.js'
import SearchAnswer from './SearchAnswer.js';

const TextInputDestination = ({navigation}) => {
  const {settings: {color}} = useData();
  const busStops = {'123': false, '345': false, '567': false};


  const [text, setText] = useState('');

  const findDestination = () => {
    for(let i = 0; i < busStops.length; i++) {
      if(busStops[i] === {text}){
        console.log(busStops[i]);
      }
      console.log("ppp");
    }
    // if (busStops.find(text))
    //   console.log("ll")
      // addRecentSearch(text);
  }
  useEffect(() => {
    console.log("Search page")
  });
  
  const styles = StyleSheet.create({
    input: {
      backgroundColor: color, 
      width:344, 
      height:44, 
      margin: 20, 
      borderRadius: 10, 
      opacity: 0.6,
      justifyContent :'left',
      flexDirection:'row',
      alignItems: 'center',
    },
  });
  
  return (
    <SafeAreaView>
      {/* <ScrollView style={{height: 10}} keyboardShouldPersistTaps = {true}> */}
        <TextInput
          style={styles.input}
          onChangeText={setText}
          placeholder="Go To ..."
          keyboardType="default"
          autoFocus={true}
          blurOnSubmit={false}
          value={text}
          // onSubmitEditing={findDestination}
        />
          {1 ? <SearchAnswer navigation = {navigation} name = {text}/>: <Text style={{
            fontSize:25,
            marginLeft:30,
            paddingBottom:10,
            // backgroundColor: "#DDD",
            alignItems: "center",
            flexDirection: "row",
          }}>Can not find</Text>}
        {/* <SearchAnswer navigation = {navigation} name = {text}/> */}

      {/* </ScrollView> */}

        

    </SafeAreaView>
  );
};


export default TextInputDestination;