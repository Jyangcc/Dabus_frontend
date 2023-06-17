import React, {useState} from 'react';
import {SafeAreaView, StyleSheet,TouchableOpacity, TextInput, View, Text,Button,Switch} from 'react-native';

// import Animated from 'react-native-reanimated';

import BusDetailCard from './BusDetailCard';

const BusDetailContainer = () => {
    
    return (
      <View >
        
        {/* <Animated.ScrollView pagingEnabled style={styles.container}>
          <BusDetailCard title={'PAGE 1 '} index={0} />
          <BusDetailCard title={'PAGE 2'} index={1} />
        </Animated.ScrollView> */}
        
        <BusDetailCard/>


      </View>
    );
  };
  
const styles = StyleSheet.create({
  
  container: {
    flex: 0,
    backgroundColor: '#fff',
  },
});

export default BusDetailContainer;




