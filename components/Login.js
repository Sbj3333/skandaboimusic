import React, { useEffect } from 'react'
import { Button } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from 'react-native';



const Login = () => {

  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "localhost:19006"
  const clientId = "80ba12ab960340ab83d812829acc8cac";


  const scopes = [
    "user-read-email",
    "user-library-read",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public" // or "playlist-modify-private"
  ];


  const openurl = async () =>{
    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
    try{
        await Linking.openURL(loginUrl);
        console.log("login successful");

    }catch(err) {
        console.log(err)
    }
  }

    return ( 
      <View style={styles.container}>
          <Image source={require('../assets/music.jpeg')} style={styles.image}/>
          <Text style={styles.text}>Welcome !</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={openurl} >
              <Text style={styles.buttontext}>Login With spotify</Text>
          </TouchableOpacity>
      </View>
  )
}



const styles = StyleSheet.create({
    container:{
        margin: 0,
        backgroundColor: '#040504',
        overflow: 'hidden',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },

    image:{
        height: 250,
        width: 250, 
    },

    buttonContainer:{
        backgroundColor: '#0363ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
    },

    buttontext:{
        color:'white',
        fontSize: 18,
        fontWeight:'bold'
    },

    text:{
        marginLeft: 0,
        color:'#ffffff', 
        fontWeight: 'bold',
        fontSize: 30,
    }
    
})
export default Login




















