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
    // const {settings:{color}} = useData();
    const {settings: {theme, language, color}, colors} = useData();

    const dispatch = useDataDispatch();
    const handleSearchPress = () => {
      // TODO
    };
    const handleDelPress = async () => {
      await dispatch({
        type: 'removeFavorite',
        name : props.name
      })
      dispatch({
        type: 'todb'
      })
    };
    const sceenwidth = Dimensions.get('window').width;

    const Fav_styles = StyleSheet.create({
      card: {
        width: sceenwidth*0.9,
        opacity:0.7,
        margin: 8,
        paddingTop: 25,
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: color,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
      },
      to:{
        fontSize:18,
        color:"#000",
        marginBottom: 5,
      },
      dest:{
        fontSize:30,
        fontWeight: 600,
        color:color,
      },
      highLight:{
        fontSize:16,
        color:color,
        fontWeight: 600,
      },
      plainText:{
        fontSize:16,
        color:"#000",
        fontWeight: 400,
      },
    });
    
    return(
      <TouchableOpacity onPress={handleSearchPress} style={Fav_styles.card}>
          <View>
            <Text style={Fav_styles.to}>
            {
            language === 'english'? 'To ': '前往' 
            } <Text style={Fav_styles.dest}>{props.name}</Text></Text>
            <Text style={Fav_styles.highLight}>{/*TODO*/'藍線1'}
              <Text style={Fav_styles.plainText}> 
              {
            language === 'english'? ' will arrive ': '離抵達' 
            } </Text> 
              <Text style={Fav_styles.highLight}>{/*TODO*/'清華大學'}</Text>
              <Text style={Fav_styles.plainText}> 
              {
                language === 'english'? ' in ': '還剩' 
              }{/*TODO*/' 5 '}
              {
                language === 'english'? ' mins': '分鐘' 
              }</Text>
            </Text>

          </View>
          
          <TouchableOpacity 
            onPress={handleDelPress}  
            style={{right: 20, position: 'absolute'}} 
          >
            <MaterialCommunityIcons name="star-remove" size={40} color="#0005"/>
            <Text style={{fontSize:10} } >
            {
            language === 'english'? 'cancel': '取消最愛' 
            }</Text>
          </TouchableOpacity> 
      </TouchableOpacity>
    )
  }

export default FavoriteCard;