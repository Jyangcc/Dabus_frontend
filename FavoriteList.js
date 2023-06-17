import React, {useState} from 'react';

import {SafeAreaView, StyleSheet,TouchableOpacity,ScrollView, TextInput, View, Text,Button,Switch} from 'react-native';
import FavoriteCard from './FavoriteCard';

import {useData} from './DataContext.js'


const FavoriteList = () => {
    const {favorite} = useData();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {favorite.map(rem => <FavoriteCard {...rem}/>)}
            </ScrollView>
        </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
    container :{
        justifyContent :'center',
        
    },
    scrollContainer : {
        // marginLeft :10,
        marginright:30,
        
    },

});

export default FavoriteList;