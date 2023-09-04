import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Playlist from './Playlist'
import Miniplaylist from './Miniplaylist'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from 'react'


const Library = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);

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
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error retrieving playlists:", error);
      }
    };

    getPlaylists();
  }, []);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    console.log("hi");
    const accessToken = await AsyncStorage.getItem("token");
    console.log("accesssssed token", accessToken);
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (error) {
      console.log("error my friend", error.message);
    }
  };
  console.log(playlists);


  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>My Library</Text>
      </View>
      <View style={styles.gap}></View>
      <ScrollView contentContainerStyle={styles.scrollview}>
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
        <Miniplaylist/>
        <Miniplaylist/>
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