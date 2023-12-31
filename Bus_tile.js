import React, {useState,useRef} from 'react';
import {SafeAreaView,ScrollView, StyleSheet,TouchableOpacity,Dimensions, TextInput, View, Text,Button,Switch} from 'react-native';
import {Animated, PanResponder} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import {Ionicons} from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { useData, useDataDispatch } from './DataContext.js';

const Bus_tile = (props) => {
    const [remind, setremind] = useState(false);
    const dispatch = useDataDispatch();
    const {settings: {theme, language, color}, colors} = useData();
    const {present_location, destination_location ,p_lon ,p_lat,d_lon,d_lat,buses_routes,busdata} = useData();
    
    const handleSetRemindPress = () => {
      dispatch({
        type: 'addReminder',
        reminder:{
          id : 4,
          bus: 'Bus1',
          from: '清華大學',
          to: destination_location,
          repeat: [
            {day: 0, on: false},
            {day: 1, on: false},
            {day: 2, on: false},
            {day: 3, on: false},
            {day: 4, on: false},
            {day: 5, on: false},
            {day: 6, on: false},
          ],
          hour: 0,
          minute: 0,
          remind: 10
        }
      })
      dispatch({
        type: 'todb'
      })
      setremind(!remind);
    };
    console.log(busdata,'data')
    return(
      <TouchableOpacity style={Bus_tile_styles.container}>
        <MaterialCommunityIcons style={Bus_tile_styles.bus_icon} name="bus-stop" size={60} color={color} />

        <View style={Bus_tile_styles.bus_and_del}>
          
          <View style={Bus_tile_styles.bus}>
            <Text style={Bus_tile_styles.text2 }>
              {present_location}{/*Todo*/}
              <Text style={Bus_tile_styles.text1}>
                {
                  language === 'english'? ' To ': '往' 
                }
                <Text style={Bus_tile_styles.text2}>
                {destination_location}{/*Todo*/}
                </Text>

              </Text>
            </Text> 
            <Text>
              <Text style={Bus_tile_styles.text4}>{
                language === 'english'? ' arrive in ': '將在' 
              }
                </Text> 
              <Text style={Bus_tile_styles.text3}>
                {busdata} {/*Todo*/}
                </Text>
              <Text style={Bus_tile_styles.text4}>
              {
                language === 'english'? ' mins': '分鐘後抵達' 
              }
               </Text>
              <Text style={Bus_tile_styles.text5}>
                {props.depart_stop} {/*Todo*/}
                </Text>            
            </Text>
          </View>
          
          <TouchableOpacity onPress={handleSetRemindPress} style={Bus_tile_styles.del} >
            <MaterialIcons style={Bus_tile_styles.icon} name="alarm" size={45} color={remind?"black":"gray"} />
          </TouchableOpacity>

        </View>   
        
      </TouchableOpacity>
    );
  };
  
  const Bus_tile_styles =  StyleSheet.create({
    bus_tile:{
      zIndex:100,
    },
    container: {
      width: 345,
      justifyContent: 'center',
      marginRight:20,
      marginLeft:20,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#D9D9D9',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      flexDirection:"row"
  
    },
    bus_and_del:{
      marginLeft:0,
      marginRight:10,
      marginBottom:10,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position:'relative'
    },
    text1:{
      marginLeft:0,
      marginRight:10,
      marginBottom:10,
      fontSize:18,
      color:"#000000",
    },
    text2:{
      marginLeft:0,
      marginRight:10,
      marginBottom:10,
      fontSize:16,
      color:"#0072B2",
    },
    text3:{
      marginLeft:0,
      marginRight:0,
      marginTop:5,
      marginBottom:0,
      fontSize:10,
      color:"#0072B2",
    },
    text4:{
      marginLeft:0,
      marginRight:10,
      marginBottom:0,
      fontSize:16,
      color:"#000000",
    },
    text5:{
      marginLeft:10,
      marginRight:10,
      marginBottom:0,
      fontSize:16,
      color:"#0072B2",
    },
    text6:{
      marginLeft:10,
      marginRight:10,
      marginBottom:0,
      fontSize:16,
      color:"#000000",
    },
    del:{
      margin:0,
      alignItems: 'center',
      justifyContent: 'center',
      marginButton:20,
    },
    icon:{
      marginTop: 5,
    },
    del_text:{
  
    },
    bus:{
      marginLeft:0,
      marginRight:10,
    },
    bus_icon:{
      marginTop:5,
      marginLeft:-10,
    }
  });



  export default Bus_tile;