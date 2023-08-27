import React from 'react'
import { Text, Image, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import { Button } from 'react-native'
import { Alert } from 'react-native'

const Login = () => {
    const handlePress = () => {
        Alert.alert('Button Pressed', 'You pressed the button!');
      };
    return (
    
        
    <View style={styles.container}>
        <Image source={require('../assets/music.jpeg')} style={styles.image}/>
        <Text style={styles.text}>Welcome !</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <Text style={styles.buttontext}>Login With Google</Text>
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