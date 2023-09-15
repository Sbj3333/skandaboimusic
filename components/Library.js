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


const Library = () => {
  const [userplaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserPlaylists(response.data.items);
      } catch (error) {
        console.error("Error retrieving playlists:", error);
      }
    };

    getPlaylists();
  }, []);
  const renderItem = ({item}) =>{
    return(
        <Pressable style={styles.playlistcontainer}>
            <Image style={styles.playlistimage} source={{uri: item[0].images[0].url}}/>
            <View>
                <Text numberOfLines={2} style={styles.playlistname}>{item.name}</Text>
            </View>

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
      <ScrollView contentContainerStyle={styles.scrollview}>
        {/* liked songs 
        local files */}
        <Pressable>
          <Miniplaylist name="Liked songs"/>
        </Pressable>
        <Pressable>
          <Miniplaylist name="Local Files"/>
        </Pressable>
        <FlatList data={userplaylists} renderItem={renderItem} numColumns={1}/>



        {/* <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/> */}
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1c1d',
  },

  head:{
    height: 70,
    justifyContent: 'center',
    marginLeft: 15

  },

  text:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },

  scrollview: {
    backgroundColor: 'blue'
  },
  
  gap: {
    height: 15
  }
})
export default Library