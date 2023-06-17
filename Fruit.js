import React, {useState, useEffect, createContext, useContext, useReducer} from 'react';
import { View, Text, Button, Switch,ScrollView ,StyleSheet} from 'react-native';
import { useData, useDataDispatch, DataProvider } from './DataContext.js'; 
import Checkbox from './CheckBox.js';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Fruit = () => {
    const {showFruit, newColor} = useData();
    const dispatch = useDataDispatch();
    const [expand, setExpand] = useState(false);

    // onPress = {() => dispatch({type: 'hideFruit'}})

    const handleExpandPress = () => {
        setExpand(!expand);
    };

    return(
        <View>
            <TouchableHighlightComponent style={[styles.congrat,{backgroundColor:newColor}]}  onPress={() => {setExpand(!expand),dispatch({type: 'hideFruit'})}} disabled={expanded}>
            </TouchableHighlightComponent>

            <TouchableHighlightComponent onPress={() => {setExpand(!expand);}} disabled={showFruit}>
                <MaterialCommunityIcons style={styles.fruit} name="fruit-cherries" size={40} color="red" disabled={showFruit}/>
            </TouchableHighlightComponent>
        </View>
        
    )

};

const styles = StyleSheet.create({
    fruit:{
      
      
    },
    congrat:{
        height:1000,
        width: 1000,
    }
  });
export default Fruit;

