import React from 'react'
import { Alert, FlatList, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { useRoute } from '@react-navigation/native'


const Library = () => {
  const navigation = useNavigation();
  const [userplaylists, setUserPlaylists] = useState([]);
  const route = useRoute();
  const songuri = route.params;
  const [addedsongs, setAddedsongs] = useState(false);


  const addsongs = async (playlistid, songuris) => {
    const access_token = await AsyncStorage.getItem("token");
    // const uris = Array.isArray(songuris) ? songuris : [songuris];
    console.log("uris", songuri)
    console.log("playlistid", playlistid)
    const id = playlistid.split("/").pop();
    console.log("id", id)
    try {
      const request = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json', // Specify the content type
        },

        body: JSON.stringify({
          uris: [songuri],
          position: 0,
        }),
      });
  
      // Handle the response if needed
      const response = await request.json();
      console.log("added to playlist", response);
    } catch (err) {
      console.log(err.message);
      console.log("answer is ", songuris);
      

    }
  };

  
  

  const handleplaylist = async (href2) => {
    console.log("playlist name is ", href2)
    await addsongs(href2, songuri);
    console.log("is it working")
    setAddedsongs(true);
    console.log("songs are", addedsongs);
    navigation.navigate("IndividualPlaylist", addedsongs);
    
  };
  

  const getplaylist = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();
      setUserPlaylists(data.items);
      // console.log(JSON.stringify(data.items));
      return data;
    } catch {
        console.log("error getting user playlists");
    }
  }

  useEffect(() => {
    getplaylist();
  }, []);

  const renderItem = ({item, index}) =>{
    const isLastItem = index === (userplaylists.length - 1); 
    
    return(
        <Pressable onPress={() => handleplaylist(item.href)}>
          <View style={[styles.playlistcontainer, isLastItem? {marginBottom: 150}: null]}>
              {item.images[0]?.url ? ( 
                
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
        <Text style={styles.text}>Select Playlist</Text>
        
        
      </View>
      <View style={styles.gap}></View>
      <FlatList 
        data={userplaylists} 
        renderItem={renderItem} 
        numColumns={1}/>

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
    alignItems: 'center',
    // marginLeft: 15,
    marginTop: 10,
    flexDirection: 'row'

  },

  text:{
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    width: '80%',
    // backgroundColor:'blue',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  
  gap: {
    height: 4
  },

  


  

  
})
export default Library