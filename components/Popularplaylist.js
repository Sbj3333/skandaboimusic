import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'

const Popularplaylist = () => {
  return (
    <View style={styles.playlistcontainer}>
        <Image source={require('../assets/music2.jpeg')} style={styles.playlistimage}/>
        <Text style={styles.playlistname}>Playlist</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    playlistcontainer:{
        height: 170, 
        width: '35%',
        flexDirection: 'column',
        backgroundColor: 'rgba(105, 103, 102, 0.5)',
        // alignItems: 'center',
    },

    playlistimage: {
        height: '80%', 
        width: '100%',
        objectFit: 'contain',
        backgroundColor: 'green'
    },

    playlistname:{
        marginLeft: '2%',
        color: 'white', 
        fontSize: 25
    }
})

export default Popularplaylist