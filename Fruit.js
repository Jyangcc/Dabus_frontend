import React, {useState, useEffect, createContext, useContext, useReducer} from 'react';
import { View, Text, Button, Switch,ScrollView } from 'react-native';

import { useData, useDataDispatch, DataProvider } from './DataContext.js'; 
import Checkbox from './CheckBox.js';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Fruit = () => {
    const {showFruit} = useData();
    const dispatch = useDataDispatch();
    const [expand, setExpand] = useState(false);

    // onPress = {() => dispatch({type: 'hideFruit'}})

    const handleExpandPress = () => {
        setExpand(!expand);
    };

   

    return(
        <View>
            <TouchableHighlightComponent style={styles.congrat}  onPress={handleExpandPress} disabled={expanded}>
            </TouchableHighlightComponent>

            <TouchableHighlightComponent onPress={handleExpandPress}  disabled={showFruit}>
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

