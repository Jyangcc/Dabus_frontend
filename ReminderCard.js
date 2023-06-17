import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView,TouchableOpacity, TouchableHighlight,Dimensions, } from 'react-native';
import { useState, useRef } from 'react';
import { Icon } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import { MaterialIcons } from '@expo/vector-icons'; 
import {useData, useDataDispatch} from './DataContext.js'

const Reminder = props => {
  
  const [expanded, setExpanded] = useState(false);
  const [del, setdel] = useState(false);

  const handleButtonPress = () => {
    setExpanded(!expanded);
  };

  const handleDelPress = () => {
    //del
  };

  const [Mon, setMon] = useState(false);
  const [Tue, setTue] = useState(false);
  const [Wed, setWed] = useState(false);
  const [Thr, setThr] = useState(false);
  const [Fri, setFri] = useState(false);
  const [Sat, setSat] = useState(false);
  const [Sun, setSun] = useState(false);
  const handleMonPress = () => {
    setMon(!Mon);
  };
  const handleTuePress = () => {
    setTue(!Tue);
  };
  const handleWedPress = () => {
    setWed(!Wed);
  };
  const handleThrPress = () => {
    setThr(!Thr);
  };
  const handleFriPress = () => {
    setFri(!Fri);
  };
  const handleSatPress = () => {
    setSat(!Sat);
  };
  const handleSunPress = () => {
    setSun(!Sun);
  };
  const Mon_btn_color = Mon? '#0072B2' : '#858484';
  const Tue_btn_color = Tue? '#0072B2' : '#858484';
  const Wed_btn_color = Wed? '#0072B2' : '#858484';
  const Thr_btn_color = Thr? '#0072B2' : '#858484';
  const Fri_btn_color = Fri? '#0072B2' : '#858484';
  const Sat_btn_color = Sat? '#0072B2' : '#858484';
  const Sun_btn_color = Sun? '#0072B2' : '#858484';

  const [selected, setSelected] = useState(true);
  
  const data = [
    {key:'1', value:'1'},
    {key:'2', value:'3'},
    {key:'3', value:'5'},
    {key:'4', value:'10'},
    {key:'5', value:'15'},
    {key:'6', value:'20'},
    {key:'7', value:'30'},
  ]

  const hour_data = [...Array(11).keys()];

  const minute_data = [...Array(60).keys()];

  const ampm_data = ['am', 'pm'];

  return (
    <TouchableOpacity
      style={Noti_styles.noti}
      underlayColor='#fff'
    >
      <Text style={Noti_styles.toptext1}>前往: {props.to}</Text>
      <View style={Noti_styles.bus_and_del}>
        <View>
          <Text style={Noti_styles.toptext2}>{props.bus}
            <Text style={Noti_styles.toptext4}> 離抵達 </Text> 
          {props.from}</Text>
          <Text style={Noti_styles.toptext3}>還剩 
          <Text style={Noti_styles.toptext5}> {props.arrive_time} </Text>
          分鐘</Text>
        </View>
        
        <TouchableOpacity onPress={/*TODO*/handleDelPress} style={Noti_styles.del} >
          <MaterialIcons style={Noti_styles.del_icon} name="alarm-off" size={45} color="black" />
          <Text style={Noti_styles.del_text}>取消提醒</Text>
        </TouchableOpacity>
            
      </View>

      {expanded && ( 
        <View style={Noti_styles.horizontalLine} />
      )}
      {!expanded && (
        <TouchableOpacity onPress={handleButtonPress} >
          <AntDesign style={Noti_styles.extend_icon} name="down" size={24} color="black" />
        </TouchableOpacity>
      )}
      {expanded && (
        <View style={Noti_styles.time}>
          <Text style={Noti_styles.toptext6}>在公車抵達前 </Text>
          <SelectList 
            style={Noti_styles.time_select}
            setSelected={(val) => setSelected(val)} 
            data={data} 
            save="value"
            search={false}
            placeholder={"Time"}
            maxHeight={150}
            dropdownShown={false}
            defaultOption={{ key:'1', value:'1' }}
            boxStyles={{width:70}}
            dropdownStyles={{width:70}}
          />
          <Text style={Noti_styles.toptext6}> 分鐘提醒</Text>
        </View>
      )}

      {expanded && ( 
        <View>
          <Text style={Noti_styles.rpt_alarm_text}>重複提醒：</Text>  
          <View style={Noti_styles.rpt_alarm_week}>
            <TouchableOpacity onPress={handleMonPress} style={[Noti_styles.rpt_alarm_btn, {backgroundColor:Mon_btn_color}]} ><Text style={Noti_styles.rpt_alarm_day}>一</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleTuePress} style={[Noti_styles.rpt_alarm_btn, {backgroundColor:Tue_btn_color}]} ><Text style={Noti_styles.rpt_alarm_day}>二</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleWedPress} style={[Noti_styles.rpt_alarm_btn, {backgroundColor:Wed_btn_color}]} ><Text style={Noti_styles.rpt_alarm_day}>三</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleThrPress} style={[Noti_styles.rpt_alarm_btn, {backgroundColor:Thr_btn_color}]} ><Text style={Noti_styles.rpt_alarm_day}>四</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleFriPress} style={[Noti_styles.rpt_alarm_btn, {backgroundColor:Fri_btn_color}]} ><Text style={Noti_styles.rpt_alarm_day}>五</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleSatPress} style={[Noti_styles.rpt_alarm_btn, {backgroundColor:Sat_btn_color}]} ><Text style={Noti_styles.rpt_alarm_day}>六</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleSunPress} style={[Noti_styles.rpt_alarm_btn, {backgroundColor:Sun_btn_color}]} ><Text style={Noti_styles.rpt_alarm_day}>日</Text></TouchableOpacity>
          </View>
          <View style={Noti_styles.repeat_time_select}>
            <SelectList 
              style={Noti_styles.hour_select}
              setSelected={(val) => setSelected(val)} 
              data={hour_data} 
              save="value"
              search={false}
              placeholder={"Time"}
              maxHeight={150}
              dropdownShown={false}
              defaultOption={{ key:'00', value:'00' }}
              boxStyles={{width:65}}
              dropdownStyles={{width:65}}
            />
            <Text style={Noti_styles.repeat_select_text}> : </Text>
            <SelectList 
              style={Noti_styles.minute_select}
              setSelected={(val) => setSelected(val)} 
              data={minute_data} 
              save="value"
              search={false} 
              placeholder={"Time"}
              maxHeight={150}
              dropdownShown={false}
              defaultOption={{ key:'00', value:'00' }}
              boxStyles={{width:65}}
              dropdownStyles={{width:65}}
            />
            <Text style={Noti_styles.repeat_select_text}></Text>
            <SelectList 
              style={Noti_styles.ampm_select}
              setSelected={(val) => setSelected(val)} 
              data={ampm_data} 
              save="value"
              search={false}
              placeholder={"Time"}
              maxHeight={150}
              dropdownShown={false}
              defaultOption={{ key:'am', value:'am' }}
              boxStyles={{width:62,margin:0,}}
              dropdownStyles={{width:65}}
            />
            <Text style={[Noti_styles.repeat_select_text, {color:"red"}]}>  提醒</Text>
          </View>
        </View>
      )}

      {expanded && (
      <TouchableOpacity zIndex={0} onPress={handleButtonPress} >
        <AntDesign style={Noti_styles.extend_icon} name="up" size={24} color="black" />
      </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const Noti_styles = StyleSheet.create({
  toptext1:{
    marginLeft:15,
    marginRight:50,
    marginBottom:10,
    marginTop:8,
    fontSize:12,
    color:"#858484",
  },
  toptext2:{
    marginLeft:0,
    marginRight:80,
    marginBottom:0,
    fontSize:22,
    color:"#0072B2",
  },
  toptext3:{
    marginLeft:15,
    marginRight:50,
    marginBottom:10,
    marginTop:10,
    fontSize:20,
    color:"#D53737",
  },
  toptext4:{
    marginLeft:0,
    marginRight:0,
    marginBottom:0,
    fontSize:18,
    color:"black",
  },
  toptext5:{
    marginLeft:15,
    marginRight:50,
    marginBottom:20,
    marginTop:20,
    fontSize:32,
    color:"#D53737",
  },
  toptext6:{
    fontSize:16,
    top:0,
    color:"black",
    position:'relative',
    justifyContent:'space-between',
  },
  horizontalLine: {
    borderBottomColor: "black",
    backgroundColor: "black",
    borderBottomWidth: 1,
    width: 315,
    color: "black",
    marginLeft:15,
    marginRight:15,
    marginBottom:20,
    justifyContent: 'center'
  },
  extend_icon: {
    color: "#858484",
    marginLeft:160,
    marginRight:150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  time_select:{
    justifyContent: 'center',
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute'
  },
  noti:{
    width: 345,
    justifyContent: 'center',
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#D9D9D9',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  time:{
    marginLeft:15,
    marginRight:50,
    marginBottom:20,
    flexDirection: 'row',
    alignItems: 'center',
    position:'relative',
    maxWidth: 200,
  },
  rpt_alarm_text:{
    marginLeft:15,
    marginRight:50,
    fontSize:16,
    color:"black",
  },
  rpt_alarm_btn:{
    marginLeft:0,
    marginRight:7,
    borderColor:'black',
    fontSize:16,
    color:"white",
    position:'relative',
    flexDirection:'row',
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rpt_alarm_week:{
    marginLeft:10,
    marginRight:50,
    flexDirection: 'row',
    justifyContent: 'row',
    paddingTop:10,
    paddingBottom:10,
  },
  rpt_alarm_day:{
    fontSize:22,
    color:"white",
  },
  repeat_time_select:{
    justifyContent: 'center',
    marginTop:20,
    marginBottom:15,
    marginLeft:15,
    marginRight:5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  },
  hour_select:{
    justifyContent: 'center',
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute'
  },
  minute_select:{
    justifyContent: 'center',
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute'
  },
  repeat_select_text:{
    fontSize:25,
    marginLeft:5,
    marginRight:5,
    position:"relative"
  },
  bus_and_del:{
    marginLeft:0,
    marginRight:15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  },
  del:{
    margin:0,
    alignItems: 'center',
    justifyContent: 'center',
    marginButton:20,
  },
  del_icon:{
    margin:0,
  },
  del_text:{
    margin:0,
  }
});

export default Reminder;