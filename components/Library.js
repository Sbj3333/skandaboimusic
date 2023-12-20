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
import { BottomModal } from 'react-native-modals'


const Library = () => {
  const navigation = useNavigation();
  const [userplaylists, setUserPlaylists] = useState([]);
  const [modalstate, setModalState] = useState(false);
  const [newplaylistname, setNewPlaylistName] = useState('');
  const [spotifyid, setSpotifyid] = useState('');
  const route = useRoute();
  // const state = route.params.state;
  const songuri = route.params;
  // console.log(state);


  

  const handleplaylist = async (href) => {
    navigation.navigate("IndividualPlaylist", href);
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
      setModalState(true);
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
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          name: `${newplaylistname}`,
          description: 'new playlist',
          public: false, 
      }),


    });
    await getplaylist();
    const data = await response.json();
    console.log(data); 

    console.log("shit");
    Alert.alert('Message', `New playlist ${newplaylistname} Created`, [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      
    ]);

    console.log("shit worked");
    setModalState(false);
    }catch(err){
      console.log(err.message);
    }
  }


  const renderItem = ({item, index}) =>{
    const isLastItem = index === (userplaylists.length - 1); 
    // console.log(item.name);
    // console.log(item.images[0].url);
    
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
        <Text style={styles.text}>My Library</Text>
        <Pressable onPress={handleCreatePlaylist}>
          <AntDesign name="plus" size={34} style={styles.plus} color="white" />
        </Pressable>
        
      </View>
      <View style={styles.gap}></View>
      <FlatList 
        data={userplaylists} 
        renderItem={renderItem} 
        numColumns={1}/>


      <BottomModal
        visible={modalstate}
        onHardwareBackPress={() => setModalState(false)}
        animationType="slide"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modaltext}>Enter the name of the new playlist</Text>
          <TextInput
            style={styles.modaltextinput}
            value={newplaylistname}
            onChangeText={(text) => {setNewPlaylistName(text)}}
          />
            <Button title="Create" style={styles.createbutton} onPress={CreatePlaylist} />
            <Button title="Cancel" style={styles.cancelbutton} onPress={()=> setModalState(!modalstate)} />
        </View>
      </BottomModal>
      <Modal
        visible={modalstate}
        // animationType="slide"
        // transparent={true}
        onHardwareBackPress={() => setModalState(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Give your playlist a name</Text>
          <TextInput
            style={styles.textInput}
            value={newplaylistname}
            onChangeText={(text) => setNewPlaylistName(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setModalState(!modalstate)} />
            <Button title="Create" onPress={CreatePlaylist} />
          </View>
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

  plus:{
    marginTop: 7
  },

  
  
  gap: {
    height: 4
  },

  bottomgap: {
    height: 150
  },



  modalContainer: {
    height: '50%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: '#292929',
    padding: 20,
    // borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color:'white',
    fontSize: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

  
})
export default Library