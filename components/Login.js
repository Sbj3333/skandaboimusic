import React, { useEffect } from 'react'
import { Text, Image, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import { Button } from 'react-native'
import { Alert } from 'react-native'
import * as AppAuth from "expo-app-auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
const Login = () => {

    const navigation = useNavigation();
    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("access token", accessToken);
            console.log("expiration date", expirationDate);

            if(accessToken && expirationDate){
                const currentTime = Date.now();
                if(currentTime < parseInt(expirationDate)){
                    navigation.replace("Main");
                }else{
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }
        }
        checkTokenValidity();
    },[])
    async function authenticate(){
        const config = {
            issuer: "https://accounts.spotify.com",
            clientId: "80ba12ab960340ab83d812829acc8cac",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public"
            ],
            redirectUrl: "exp://192.168.0.105:8081/--/spotify-auth-callback"
            
        }
        const result = await AppAuth.authAsync(config);
        console.log(result);
        if(result.accessToken){
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage.setItem("token", result.accessToken);
            AsyncStorage.setItem("expirationDate", expirationDate.toString());
            navigation.navigate("Main")
        }
    } 


    return ( 
    
        
    <View style={styles.container}>
        <Image source={require('../assets/music.jpeg')} style={styles.image}/>
        <Text style={styles.text}>Welcome !</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={authenticate}>
            <Text style={styles.buttontext}>Login With spotify</Text>
        </TouchableOpacity>
    </View>
  )
}
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        margin: 0,
        backgroundColor: '#040504',
        height: screenheight,
        width: screenwidth,
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
export {screenheight, screenwidth};