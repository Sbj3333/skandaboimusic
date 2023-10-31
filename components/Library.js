import React from 'react'
import { Alert, FlatList, ScrollView, Text, View } from 'react-native'
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
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modals'
import { Button } from 'react-native'
import { TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'


const Library = () => {
  const navigation = useNavigation();
  const [userplaylists, setUserPlaylists] = useState([]);
  const [modalstate, setModalState] = useState(false);
  const [newplaylistname, setNewPlaylistName] = useState('');
  const [spotifyid, setSpotifyid] = useState('');
  const route = useRoute();
  const state = route.params.state;
  const songuri = route.params.songuri;


  const addsongs = async(playlistid) =>{
    const access_token = await AsyncStorage.getItem("token");
    try{
      const request = await fetch(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`,{
        method: 'POST',
        headers:{
          Authorization: `Bearer ${access_token}`,
        },
        body:{
          uris: songuri,
          position: 0,
        }
      })

      console.log("added to playlist");
    }catch(err){
      console.log(err.message);
    }
  }

  const handleplaylist = async (href, state, songuri) => {
    if (state) {
      // Add to that playlist function
      await addsongs(href);
      navigation.goBack();
    } else {
      navigation.navigate("IndividualPlaylist", href);
    }
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
      // console.log(JSON.stringify(data.items[3], null, 2));
      // console.log(JSON.stringify(data.items[3].name, null, 2));
      // console.log(JSON.stringify(data.items[3].images[0].url, null, 2))

      // console.log(data.items);
      // console.log(JSON.stringify(data.items[1].owner.display_name, null, 2));

      setUserPlaylists(data.items);
      return data;
    } catch {
      console.log("error getting user playlists");
    }
  }

  useEffect(() => {
    getplaylist();
  }, []);

  
  const handleCreatePlaylist = async() =>{
    try{
      CreatePlaylist();
      setModalState(false);
    } catch(err){
      console.log(err.message);
    }
  }

  const getprofile = async() =>{
    const access_token = await AsyncStorage.getItem("token");
    try{
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      setSpotifyid(data.id);

    }catch(err){
      console.log(err.message);
    }
  }
  
  useEffect(() => {
    getprofile();
  }, []);


  const CreatePlaylist = async() =>{
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await fetch(`https://api.spotify.com/v1/users/${spotifyid}/playlists`,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          
        },
        body: {
          name: `${newplaylistname}`,
          description: 'new playlist',
          public: 'false'
        }

    });

    Alert.alert('Message', `New playlist ${newplaylistname} Created`, [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      
    ]);
    }catch(err){
      console.log(err.message);
    }
  }


  const renderItem = ({item, index}) =>{
    const isLastItem = index === (userplaylists.length - 1); 
    // console.log(item.name);
    // console.log(item.images[0].url);
    
    return(
        <Pressable onPress={() => handleplaylist(item.href, state, songuri)}>
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
        <Text style={styles.text}>My Library</Text>
        <Pressable>
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
        
      </View>
      <View style={styles.gap}></View>
      <FlatList 
        data={userplaylists} 
        renderItem={renderItem} 
        numColumns={1}/>


      <Modal
        visible={modalstate}
        onHardwareBackPress={() => setModalState(false)}
        animationType="slide">
        <View style={styles.modalContent}>
          <Text>Enter the name of the new playlist</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            value={newplaylistname}
            onChangeText={(text) => {setNewPlaylistName(text)}}
          />
            <Button title="Create" onPress={handleCreatePlaylist} />
            <Button title="Cancel" onPress={()=> setModalState(!modalstate)} />
        </View>
      </Modal>
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

  bottomgap: {
    height: 150
  }
  
})
export default Library