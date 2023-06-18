import React, {useState} from 'react';

import {
    SafeAreaView, 
    StyleSheet,
    ScrollView,
    TouchableOpacity, 
    TextInput, 
    View, 
    Text,
    Button,
    Switch
} from 'react-native';

import ReminderCard from './ReminderCard';

import {useData} from './DataContext.js'

const ReminderList = () => {
    const {reminder} = useData();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {reminder.map(rem => <ReminderCard {...rem}/>)}
            </ScrollView>
        </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
    container :{
        marginTop:30
    },
});

export default ReminderList;