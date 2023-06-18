import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { useState } from 'react';
import { useData, useDataDispatch } from './DataContext.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FavoriteCard = props => {
    const {settings:{color}} = useData();
    const dispatch = useDataDispatch();
    const handleDelPress = () => {
      dispatch({
        type: 'removeFavorite',
        name : props.name
      })
    };
    const sceenwidth = Dimensions.get('window').width;

    const Fav_styles = StyleSheet.create({
      card: {
        width: sceenwidth*0.9,
        margin: 8,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: color,
        flexDirection: 'row',
        alignItems: 'center',
      },
      dest:{
        fontSize:18,
        color:"#000000",
      },
      text2:{
        fontSize:22,
        color:color,
      },
      highLight:{
        fontSize:16,
        color:color,
      },
      text4:{
        fontSize:16,
        color:"#000",
      },
    });
    
    return(
      <TouchableOpacity onPress={handleSearchPress} style={Fav_styles.card}>
          <View>
            <Text style={Fav_styles.dest}>前往: <Text style={Fav_styles.text2}>{props.name}</Text></Text>
            <Text style={Fav_styles.highLight}>{/*TODO*/'Bus1'}
              <Text style={Fav_styles.text4}> 離抵達 </Text> 
              <Text style={Fav_styles.highLight}>{/*TODO*/'Here'}</Text>
              <Text style={Fav_styles.text4}> 還剩 </Text>
              <Text style={Fav_styles.highLight}> {/*TODO*/'Minute'} </Text>
              <Text style={Fav_styles.text4}> 分鐘</Text>
            </Text>

          </View>
          
          <TouchableOpacity 
            onPress={handleDelPress}  
            style={{right: 20, position: 'absolute'}} 
          >
            <MaterialCommunityIcons name="star-remove" size={40} color="#0005"/>
            <Text style={{fontSize:10} } >取消最愛</Text>
          </TouchableOpacity> 
      </TouchableOpacity>
    )
  }

export default FavoriteCard;