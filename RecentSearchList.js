import React, {useState} from 'react';

import {SafeAreaView, StyleSheet,TouchableOpacity, TextInput, View, Text,Button,Switch} from 'react-native';
import RecentSearchCard from './RecentSearchCard';

const RecentSearchList = () => {

    return (
        <View>
          <RecentSearchCard/>
          <RecentSearchCard/>
          <RecentSearchCard/>
          <RecentSearchCard/>
          <RecentSearchCard/>
        </View>
    );
  };
  
const styles = StyleSheet.create({


});

export default RecentSearchList;