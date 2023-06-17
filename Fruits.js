import React, {useState, useEffect, createContext, useContext, useReducer} from 'react';
import { View, Text, Button, Switch,ScrollView ,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import { useData, useDataDispatch, DataProvider } from './DataContext.js'; 
import Checkbox from './CheckBox.js';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Fruit = () => {
    const screenHeight = Dimensions.get('window').height;
    
    const screenWidth = Dimensions.get('window').width;
    
    const {showFruit, newColor} = useData();
    const dispatch = useDataDispatch();
    const [expand, setExpand] = useState(false);

    // onPress = {() => dispatch({type: 'hideFruit'}})

    const handleExpandPress = () => {
        setExpand(!expand);
    };
    

    return(
        <View style={{top:0,position:"absolute",width:screenWidth,height:screenHeight}}>
            <Text>{showFruit ? "There's the fruit": 'Where is my fruit???'}</Text>
            {(expand)&&
            <TouchableOpacity style={[styles.congrat,{backgroundColor:newColor,width:screenWidth,height:screenHeight,zIndex:1}]}  onPress={() => {setExpand(!expand),dispatch({type: 'hideFruit'}), console.log(newColor)}}>
            </TouchableOpacity>}
            
            {(showFruit)&&
            <TouchableOpacity style={{position:"absolute",right:screenWidth/2,zIndex:10}} onPress={() => {setExpand(!expand);}}>
                <MaterialCommunityIcons style={styles.fruit} name="fruit-cherries" size={40} color="red"/>
            </TouchableOpacity>}
            <Text>{expand?'What\'s this?':'Where\'s the block'}</Text>
        </View>
        
    )

};

const styles = StyleSheet.create({
    fruit:{
      position:"absolute",
      width:40,
      height:40,
      top:300,
    },
    congrat:{
        opacity: 0.9,
        position:"absolute",
        top:0,
    }
  });
export default Fruit;