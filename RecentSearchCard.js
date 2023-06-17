import React from 'react';
import {SafeAreaView,TouchableOpacity, StyleSheet, TextInput,Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 



const RecentSearchCard = () => {

  const destination = [
    {name : 'first stop', favorite : true},
    {name : 'second stop', favorite : true},
    {name : 'third stop', favorite : false},
  ]

  return (
    <View >
      <View style={styles.container}>
        <Text style = {styles.busstop}>{destination[0].name}</Text>
        {/* <TouchableOpacity onPress={() =>console.log("Press a button")} 
          style = {styles.roundButtonOff}
        /> */}
        <Feather style = {styles.roundButtonOff} name="star" size={24} color="black" />

        {/* <FontAwesome style = {styles.roundButtonOff} name="star" size={24} color="yellow" /> */}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginBottom:20,
    backgroundColor: "#DDD",
    alignItems: "center",
    flexDirection: "row",
  },
  roundButtonOn: {
    marginLeft:330,
    position : "absolute",
  },
  roundButtonOff: {
    marginLeft:330,
    // width: 40,
    // height: 40,
    // borderRadius: 100,
    position : "absolute",
  },

  busstop:{
    marginLeft:20,
    fontSize:20,
    backgroundColor: '#198',
  }
});



export default RecentSearchCard;