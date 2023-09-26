import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import Playlist from './Playlist'
import Miniplaylist from './Miniplaylist'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'


const Library = () => {
  const navigation = useNavigation();
  const [userplaylists, setUserPlaylists] = useState([]);

  const handleplaylist = (href) => {
    navigation.navigate("IndividualPlaylist", href);
}

  const getplaylist = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();
      // console.log(JSON.stringify(data.items[3], null, 2));
      // console.log(JSON.stringify(data.items[3].name, null, 2));
      // console.log(JSON.stringify(data.items[3].images[0].url, null, 2))

      console.log(data.items);
      console.log(JSON.stringify(data.items[1].owner.display_name, null, 2));

      setUserPlaylists(data.items);
      return data;
    } catch {
      console.log("error getting user playlists");
    }
  }

  useEffect(() => {
    getplaylist();
  }, []);

  const renderItem = ({item}) =>{
    // console.log(item.name);
    // console.log(item.images[0].url);
    return(
        <Pressable onPress={() => handleplaylist(item.href)}>
          <View style={styles.playlistcontainer}>
              {item.images[0]?.url ? ( // Check if the images array exists and has at least one element
                
                <Image
                  style={styles.playlistimage}
                  source={{ uri: item.images[0].url }}
                />
                
              ) : (
                <Image
                  style={styles.playlistimage}
                  source={require('../assets/music.jpeg')}/> 

              )}
              <View style={styles.playlistnamecontainer}>
                  <Text numberOfLines={1} style={styles.playlistname}>{item.name}</Text>
                  <Text numberOfLines={1} style={styles.ownername}>{item.owner.display_name}</Text>
              </View>
          </View>
          <View style={styles.gap}></View>
        </Pressable>
    )
}
  
  // console.log(playlists);
  

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>My Library</Text>
        
      </View>
      <View style={styles.gap}></View>
      {/* <ScrollView> */}
        {/* liked songs 
        local files */}
        {/* <Pressable onPress={handleliked}>
          <Miniplaylist name="Liked songs"/>
          <View style={styles.container}>
            <Image source={imageMapping[name]} style={styles.playlistbanner}/>
            <Text style={styles.text}>{name}</Text>
          </View>
        </Pressable> */}


        {/* <Pressable onPress={handlelocal}>
          <Miniplaylist name="Local Files"/>
          <View style={styles.container}>
            <Image source={imageMapping[name]} style={styles.playlistbanner}/>
            <Text style={styles.text}>{name}</Text>
          </View>
        </Pressable> */}


        <FlatList 
          data={userplaylists} 
          renderItem={renderItem} 
          numColumns={1}/>
        
        <View style={styles.bottomgap}/>

      {/* </ScrollView> */}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  playlistcontainer: {
    // backgroundColor: 'red', 
    height: 75,
    padding: 6,
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },

  playlistimage:{
    height: '100%',
    width: '19%', 
    objectFit: 'contain',
    marginLeft: 6,
    // backgroundColor: 'green'
  },

  

  playlistnamecontainer:{
    height: '70%',
    width: '74%',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    marginLeft: 10,
    

  },

  playlistname: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },

  ownername:{
    color: '#bdbdbd',
    fontSize: 12,
    fontWeight: 'bold'
  },

  
  container: {
    backgroundColor: 'black',
  },

  head:{
    height: 70,
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 10

  },

  text:{
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold'
  },

  
  
  gap: {
    height: 4
  },
  
})
export default Library