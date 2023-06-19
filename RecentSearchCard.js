import React, { useEffect } from 'react';
import {SafeAreaView,TouchableOpacity, StyleSheet, TextInput,Text, View, TouchableWithoutFeedback} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useState  } from 'react'; 
import {useData, useDataDispatch} from './DataContext.js'



const RecentSearchCard = ({name, navigation}) => {
  const {favorite} = useData();
  const dispatch = useDataDispatch();
  const [isFav, setIsFav] = useState(favorite.includes(name));

  const {settings: {theme, language, color}, colors} = useData();
  const mode_color = (theme === 'dark') ? '#fff' : '#252525';
  const mode_bg_color = (theme === 'dark') ? '#252525' : '#f2f2f2';
  let locationfromgetgeo;

  const  get_geo = async(loca) => {
    const fetch = require("node-fetch");
    const url = 'https://dabus.onrender.com/geoLocation?name=' + loca;

    // const response = fetch(url, {})
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     locationfromgetgeo = data;
    //     return data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const resp = await fetch(url);
    const d = await resp.json();
    // console.log(data);
    return d.data;
  };
  useEffect(() => {
    // get_geo('清華大學')
    //   .then((d) => {
    //     console.log(d, "work")
    //   });
    // const ll = new_routes();
    // console.log(ll,'h-g-wrgwgwg')

  })
  
  const set_lon = () => {
    get_geo(name)
      .then((d) => {
        console.log(d.lon, "get lon")
        return d.lon;
      }).catch((err) => {
        console.log('can not get lon');
      });;
    // let d = get_geo(name);
    // return d.data.lon;
  }
  const set_lat = () => {
    get_geo(name)
      .then((d) => {
        console.log(d.lat, "get lat")
        return d.lat;
      }).catch((err) => {
        console.log('can not get lat');
      });;
    // console.log(d);
    // return d.data.lat;
  }
  

  const new_routes = async(loca) => {
    const fetch = require("node-fetch");
    get_geo(name)
      .then(async (d) => {
        console.log(d.lat, "get lat")
        const url = 'https://dabus.onrender.com/search?dest=' + d.lat + "," + d.lon+ "&depa=" + "24.795846,120.992087";
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data,'get bus data ');
        return data;
      }).catch((err) => {
          console.log('qwq');
        });
    // const url = 'https://dabus.onrender.com/search?dest=' + set_lat() + "," + set_lon() + "&depa=" + "24.795846,120.992087";

    // const resp = await fetch(url);
    // const data = await resp.json();
    // console.log(data,'hi');
    // console.log(url)
    
    // return data;

    // fetch(url, {}).then((responce) => {
    //   return responce.json();
    // }).then((data) => {
    //   console.log(data);
    //   return data;
    // }).catch((err) => {
    //   console.log('qwq');
    // })
    
  }

  const fetchDestLocation = (locationName) => {
    return fetch(
        'https://dabus.onrender.com/geoLocation?name=' + locationName
    )
    .then(responce => responce.json())
    .then(data => {
        const destLatitude = data.data.lat;
        const destLongitude = data.data.lon;

        return {
            destLatitude: destLatitude,
            destLongitude: destLongitude
        }
    })
}

const fetchRecommandRoutes = (destLatitude, destLongitude) => {
    return fetch(
        'https://dabus.onrender.com/search?dest=' + destLatitude + "," + destLongitude + "&depa=" + "24.795846,120.992087"
    )
    .then(responce => responce.json())
    .then(data => {
        const recommandRoutes = data.data;

        return {
            recommandRoutes: recommandRoutes,
        }
    })
}

const newRoute = async (locationName) => {
    const destLocation = await fetchDestLocation(locationName);
    const recommandRoutes = await fetchRecommandRoutes(destLocation['destLatitude'], destLocation['destLongitude'])
    return recommandRoutes['recommandRoutes']
}

  
// navigation.navigate('BusDtail')

  return (
    <View>
      <View style={styles.container}>
        {/* <Text>{RouteCards('新竹火車站')}</Text> */}
        
        
        <TouchableOpacity onPress={async ()=> {
          console.log("start ")
          
          dispatch({
            type: 'setRouteData',
            present_location: '清華大學',
            destination_location: name,
            p_lon: 120.992087,   // 現在位置經度
            p_lat: 24.795846,   // 現在位置緯度
            d_lon: set_lon(),   // 目的地位置經度
            d_lat: set_lat(),   // 目的地位置緯度
            buses_routes: ['new_routes().data[1].Stops'], // 可能的公車路線
            busdata : new_routes().data,
          });
          console.log("Done ")

          navigation.navigate('BusDtail') 
          }}>
 
          <Text style = {[styles.busstop,{color:mode_color}]}>{name}</Text>

        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={async() => {
            await dispatch({
              type: isFav ? 'removeFavorite' : 'addFavorite',
              name : name
            });
            setIsFav(!isFav);
            dispatch({
              type: 'todb'
            })
          }}
          style = {styles.roundButton}>
          {
            isFav 
            ? <FontAwesome name="star" size={24} color="yellow"/> 
            : <Feather name="star" size={24} color={mode_color}/>
          }
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    marginBottom:0,
    paddingBottom:20,
    // backgroundColor: "#DDD",
    alignItems: "center",
    flexDirection: "row",
  },
  roundButton: {
    marginLeft:330,
    position : "absolute",
  },

  busstop:{
    marginLeft:30,
    fontSize:25,
    
    // backgroundColor: '#DDD',
    paddingTop:0,
  }
});

export default RecentSearchCard;