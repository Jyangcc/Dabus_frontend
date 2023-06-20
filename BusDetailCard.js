import React, {useState,useRef} from 'react';
import {SafeAreaView,ScrollView, StyleSheet,TouchableOpacity,Dimensions, TextInput, View, Text,Button,Switch} from 'react-native';
import {Animated, PanResponder} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import {Ionicons} from '@expo/vector-icons/Ionicons';
import { useData, useDataDispatch } from './DataContext.js'

import Bus_tile from './Bus_tile.js';
const BusDetailCard = () => {

    return (
        <View >
          <Bus_card></Bus_card>
          {/* <Bus_tile></Bus_tile> */}
        </View>

    );
  };
  

const Bus_card = (props) => {
  const screenHeight = Dimensions.get('window').height;
  const maxCardHeight = 0.5 * screenHeight;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = 1 * screenWidth;
  const half_screenWidth = 0.5 * screenWidth;
  const stopsData = [
    {
      name: '火車站',
      arriveTime: 2400,
    },
    {
      name: '東門市場',
      arriveTime: 2460,
    },
    {
      name: '親仁里',
      arriveTime: 2520,
    },
    {
      name: '東門國小',
      arriveTime: 2580,
    },
    {
      name: '公園',
      arriveTime: 2700,
    },
    {
      name: '火車站',
      arriveTime: 2400,
    },
    {
      name: '東門市場',
      arriveTime: 2460,
    },
    {
      name: '親仁里',
      arriveTime: 2520,
    },
    {
      name: '東門國小',
      arriveTime: 2580,
    },
    {
      name: '公園',
      arriveTime: 2700,
    },
    {
      name: '火車站',
      arriveTime: 2400,
    },
    {
      name: '東門市場',
      arriveTime: 2460,
    },
    {
      name: '親仁里',
      arriveTime: 2520,
    },
    {
      name: '東門國小',
      arriveTime: 2580,
    },
    {
      name: '公園',
      arriveTime: 2700,
    },
  ];


  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  const translateY = pan.y.interpolate({
    inputRange: [-maxCardHeight, 0],
    outputRange: [-maxCardHeight, 0],
    extrapolate: 'clamp',
  });

  const renderRow = ({ item }) => (
    <View style={bus_stop_styles.row}>
      <Text style={bus_stop_styles.cell}>{item.name}</Text>
      <Text style={bus_stop_styles.cell}>{item.arriveTime}</Text>
    </View>
  );

  return (
    <View style={Bus_card_styles.container}>
      <Animated.View
        style={[
          {
            transform: [{ translateX: 0 }, { translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Bus_tile></Bus_tile>
        <View style={[Bus_card_styles.card, { width: cardWidth }]} >

          <AntDesign style={[Bus_card_styles.extend_icon, { left: half_screenWidth - 25 }]} name="down" size={50} color="white" />
          <ScrollView>
            <View style={bus_stop_styles.container}>
              <View style={bus_stop_styles.header}>
                <Text style={bus_stop_styles.headerText}>Stop Name</Text>
                <Text style={bus_stop_styles.headerText}>Arrival Time</Text>
              </View>
              {/* <FlatList
                data={stopsData}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
              /> */}
              <ScrollView>
                {stopsData.map((stop, index) => (
                  <View key={index} style={bus_stop_styles.row}>
                    <Text style={bus_stop_styles.cell}>{stop.name}</Text>
                    <Text style={bus_stop_styles.cell}>{stop.arriveTime/60}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
};

const Bus_card_styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'absolute',
  },

  card: {
    height: 700,
    width: 1000,
    backgroundColor: '#AAA',//858484
    justifyContent: 'center',
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 10,//1100
  },
  extend_icon: {
    position: 'absolute',
    top: 10
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bus_card: {
    zIndex: 1,
  }
});

const bus_stop_styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#fff',
    marginLeft: 50,
    marginRight: 30,
    marginTop: 70,
    position: 'relative'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginRight: 30,
    position: 'relative'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    position: 'relative'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    position: 'relative'
  },
  cell: {
    flex: 1,
    fontSize: 24,
    marginTop: 15,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  Noti_style: {

    textAlign: 'center',
    paddingTop: 100,
  },
  buttonContainer: {
    flexDirection: 'row', // Place buttons in a row
    justifyContent: 'flex-end',
  },
  buttontext: {
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 20,
  },
  buttontext1: {
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 10,
    fontSize: 15,
  },
  buttontext2: {
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 5,
    fontSize: 25,
  },
  buttontext3: {
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 20,
    fontSize: 25,
    color: "red",
  },
  showedArea: {
    padding: 10,
  },
  hiddenArea: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    padding: 10,
  },
});


export default BusDetailCard;
