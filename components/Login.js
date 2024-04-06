import React from 'react';
import {ResponseType, makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import { StyleSheet, View, Image, Text, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const authEndpoint = "https://accounts.spotify.com/authorize";
// const redirectUri = "skandaboimusic://auth"; // Use the Expo provided redirect URI
// const clientId = "80ba12ab960340ab83d812829acc8cac";
// const scopes = [
//   "user-read-email",
//   "user-library-read",
//   "user-read-recently-played",
//   "user-top-read",
//   "playlist-read-private",
//   "playlist-read-collaborative",
//   "playlist-modify-public"
// ];

const Login = () => {
  const navigation = useNavigation();

  console.log(makeRedirectUri({scheme: 'skandaboimusic', path:'auth'}));
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '80ba12ab960340ab83d812829acc8cac',
      scopes:[
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "playlist-modify-public",
        "streaming",
        // "user-read-playback-state",
        // "user-read-currently-playing",
        // "user-modify-playback-state",
      ],
      usePKCE: false,
      redirectUri: makeRedirectUri({scheme: 'skandaboimusic', path: 'auth'}),
      // redirectUri: 'http://localhost:19006/'
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      console.log(access_token);
      AsyncStorage.setItem("token", access_token);
      navigation.navigate("Main");

    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/music.jpeg')} style={styles.image} />
      <Text style={styles.text}>Welcome !</Text>
      <Pressable style={styles.buttonContainer} onPress={() => {promptAsync();}}>
        <Text style={styles.buttontext}>Login With Spotify</Text>
      </Pressable>
    </View>
  );
};

export default Login;




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