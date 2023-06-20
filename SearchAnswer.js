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

import RecentSearchCard from './RecentSearchCard';

import {useData, useDataDispatch} from './DataContext.js'


// const dispatch = useDataDispatch();

// addRecentsearch
const SearchAnswer = ({navigation,name}) => {
    const {reminder} = useData();
    const dispatch = useDataDispatch();
    return (
        // <SafeAreaView style={styles.container}>
             <RecentSearchCard 
            //  onpress={
            //     dispatch({
            //         type: 'addRecentsearch',
            //         recentlySearched:name
            //       })
            // } 
            name= {name} navigation = {navigation}/>
        // </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
    container :{
        justifyContent :'center',
        // alignContent :'center',
        // marginRight:10,
        
    },
    scrollContainer : {
        // marginLeft :10,
        marginright:10,
        
    },

});

export default SearchAnswer;