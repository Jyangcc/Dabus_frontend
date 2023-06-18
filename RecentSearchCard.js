import React from 'react';
import {SafeAreaView,TouchableOpacity, StyleSheet, TextInput,Text, View, TouchableWithoutFeedback} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useState  } from 'react'; 
import {useData, useDataDispatch} from './DataContext.js'



const RecentSearchCard = props => {
  const {favorite} = useData();
  const dispatch = useDataDispatch();

  const [isFav, setIsFav] = useState(favorite.includes(props.name));
// navigation.navigate('BusDtail')
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> {console.log("Go to ", props.name)}}>

          <Text style = {styles.busstop}>{props.name}</Text>

        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => {
            dispatch({
              type: isFav ? 'removeFavorite' : 'addFavorite',
              name : props.name
            });
            setIsFav(!isFav);
          }}
          style = {styles.roundButton}>
          {
            isFav 
            ? <FontAwesome name="star" size={24} color="yellow"/> 
            : <Feather name="star" size={24} color="black"/>
          }
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    marginBottom:0,
    paddingBottom:20,
    // backgroundColor: "#DDD",
    alignItems: "center",
    flexDirection: "row",
  },
  roundButton: {
    marginLeft:330,
    position : "absolute",
  },

  busstop:{
    marginLeft:30,
    fontSize:25,
    // backgroundColor: '#DDD',
    paddingTop:0,
  }
});

export default RecentSearchCard;