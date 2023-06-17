import React, {useState} from 'react';

import {SafeAreaView, StyleSheet,TouchableOpacity, TextInput, View, Text,Button,Switch} from 'react-native';


const BusDetailCard = () => {

    return (
        <View style = {styles.container}>
          <Text style={styles.text}>This is a card</Text>
          <Text>This is another card</Text>
        </View>
    );
  };
  
const styles = StyleSheet.create({

container: {
    marginTop :20,
    height: 100, 
    alignItems: 'center',
    justifyContent: 'center',
},

text: {
    fontSize: 20,
    color: '999',
    textTransform: 'uppercase',
    fontWeight: '700',
},

});

export default BusDetailCard;