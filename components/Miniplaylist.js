import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'

const Miniplaylist = () => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/music2.jpeg')} style={styles.playlistbanner}/>
        <Text style={styles.text}>Playlist Name</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1d1c1d',
        flexDirection: 'row',
        height: 80,
        padding: 10,
        gap: 3
    },

    playlistbanner:{
        height: '100%',
        width: '20%',
        objectFit: 'contain'
        
    },

    text: {
        color:'white',
        fontWeight: 'bold',
        width: '75%',
        fontSize: 25,
        top: 3
    }
})
export default Miniplaylist