import React, {useState,useRef} from 'react';
import {SafeAreaView,ScrollView, StyleSheet,TouchableOpacity,Dimensions, TextInput, View, Text,Button,Switch} from 'react-native';
import {Animated, PanResponder} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
const BusDetailCard = () => {

    return (
        // <View style = {styles.container}>
        //   <Text style={styles.text}>This is a card</Text>
        //   <Text>This is another card</Text>
        // </View>
        <View>
          <Text>bus card</Text>
          <Bus_card></Bus_card>
          <Text>bus card</Text>
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


const Bus_card = () => {
  const screenHeight = Dimensions.get('window').height;
  const maxCardHeight = 0.5 * screenHeight;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = 1 * screenWidth;
  const half_screenWidth = 0.5 * screenWidth;

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
        <View style={[Bus_card_styles.card, { width: cardWidth }]} >
          
          <AntDesign style={[Bus_card_styles.extend_icon,{left:half_screenWidth-25}]} name="down" size={50} color="white" />     
          <ScrollView>
            <View>
              
            </View>
            <View></View>
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
    backgroundColor: '#858484',
    justifyContent: 'center',
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 1100,
  },
  extend_icon: {
    position: 'absolute',
    top:10
  },
  text:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    zIndex:100,
},
});


const Bus_tile = (props) => {
  const [remind, setremind] = useState(false);

  const handleSetRemindPress = () => {
    setremind(!remind);
  };
  return(
    <TouchableOpacity onPress={handleSetRemindPress} style={Bus_tile_styles.container}>
      <Ionicons style={Bus_tile_styles.bus_icon} name="ios-bus" size={45} color="blue" />
      <View style={Bus_tile_styles.bus_and_del}>
        
        <View style={Bus_tile_styles.bus}>
          <Text style={Bus_tile_styles.text2}>{props.bus_name}
            <Text style={Bus_tile_styles.text1}>往 <Text style={Bus_tile_styles.text2}>{props.dest}</Text></Text>
          </Text> 
          <Text>
            <Text style={Bus_tile_styles.text4}> 將在 </Text> 
            <Text style={Bus_tile_styles.text3}>{props.arrive_time} </Text>
            <Text style={Bus_tile_styles.text4}>分鐘後抵達 </Text>
            <Text style={Bus_tile_styles.text5}>{props.depart_stop} </Text>            
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
    fontSize:22,
    color:"#0072B2",
  },
  text3:{
    marginLeft:0,
    marginRight:0,
    marginTop:5,
    marginBottom:0,
    fontSize:16,
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
    marginRight:5,
  }
});

export default BusDetailCard;