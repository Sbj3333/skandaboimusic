//component which contains all the songs of the playlist

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const ActualPlaylist = () => {
  const navigation = useNavigation();
  const [actualplaylists, setActualPlaylists] = useState([]);
  // const renderItem = ({})
  const route = useRoute();
  const href = route.params;
  console.log(href);


  const getplaylist = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try{
        const response = await fetch(`${href}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
          }
        });
        const data = await response.json();
        setActualPlaylists(data.tracks.items);
        // console.log(data.name);
        // console.log(data.images[0].url);
        // console.log(JSON.stringify(data.tracks.items[0].track.album.artists.name[0]));
        // console.log(JSON.stringify(data.tracks.items[0], null, 2));
        console.log(JSON.stringify(data.tracks.items[1].track.name, null, 2));
        console.log(JSON.stringify(data.tracks.items[1].track.artists[0].name, null, 2)); //artist name
        console.log(JSON.stringify(data.tracks.items[1].track.album.images[0].url, null, 2)); //image


        return data;
      } catch {
        console.log("error getting the songs from your playlist")
      }
  }

  useEffect(() => {
    getplaylist();
  }, []);

  const renderItem = ({item}) =>{
    return(
      <Pressable>
        <View style={styles.songcontainer}>
            {item.track.album.images[0]?.url ?(
              <Image source={{uri: item.track.album.images[0].url}} style={styles.songphoto}/>
            ):(
              <Image source={require('../assets/music.jpeg')} style={styles.songphoto}/>

            )}
            <View style={styles.songnamecontainer}>
              <Text numberOfLines={1} style={styles.songname}>{item.track.name}</Text>
              <Text numberOfLines={1} style={styles.artistname}>{item.track.artists[0].name}</Text>
            </View>
            <Image source={require('../assets/heartopen.png')} style={styles.heart}/>
            {/* <Image source={require('../assets/options_icon.png')} style={styles.option}/> */}
            <SimpleLineIcons name="options-vertical" size={24} color="white" style={styles.option} />
        </View>
      </Pressable>
    )
  }
  
  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={24} color="white"/>
          </Pressable>
          <Text style={styles.text}>Playlist name</Text>
          <Pressable 
            // onPress={playTrack}
          >
            <Image style={styles.playpause} source={require('../assets/pausesong.png')}/>
          </Pressable>
        </View>
        
        <FlatList 
          data = {actualplaylists}
          renderItem={renderItem}
          numColumns = {1}
          />
        
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  songcontainer:{
    backgroundColor: 'black',
    height: 65,
    padding: 6,
    flexDirection: 'row'

  },
  songphoto: {
    height: '100%',
    width: '17%',
    objectFit: 'contain',
    marginLeft: 8
    // backgroundColor: 'green',
  },

  songnamecontainer:{
    // backgroundColor: 'blue',
    width: '52%',
    justifyContent: 'center',
    marginLeft: 8
  },

  songname: {
    color: 'white',
    fontSize: 15,
    // fontWeight: 'bold'
  },

  artistname: {
    color: '#bdbdbd',
    fontSize: 10,
    // fontWeight: 'bold'
  },

  heart:{
    height: '40%',
    width: '10%',
    objectFit: 'contain',
    marginTop: 13,
    marginLeft: 7
    // backgroundColor: 'plum'
  },

  option: {
    height: '50%',
    width: '12%',
    objectFit: 'contain',
    marginTop: 10,
    marginLeft: 10,
    // backgroundColor: 'gray'
  },
  
  container:{
    
    backgroundColor: 'black',
    flex: 1,
    gap: 1,
  },

  header:{
    // backgroundColor:'red',
    width: '100%',
    height:'12%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },

  text:{
    color:'white',
    fontSize: 38,
    fontWeight: 'bold'
  },

  playpause:{
    height:'60%',
    width: '25%',
    objectFit:'contain',
    // backgroundColor:'blue'
  },

  scrollview:{
    gap: 2
  },
})

export default ActualPlaylist