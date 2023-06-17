import React, {useState} from 'react';

import {SafeAreaView, StyleSheet,TouchableOpacity, TextInput, View, Text,Button,Switch} from 'react-native';
import FavoriteCard from './FavoriteCard';


const FavoriteList = () => {
    return (
        <View>
            <FavoriteCard/>
            <FavoriteCard/>
            <FavoriteCard/>
            <FavoriteCard/>

        </View>
    );
  };
  
const styles = StyleSheet.create({

});

export default FavoriteList;