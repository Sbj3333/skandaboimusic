import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'

const Miniplaylist = ({name}) => {

    const imageMapping = {
        'Liked songs': require('../assets/music2.jpeg'),
        'Local files': require('../assets/music2.jpeg')
    };
  return (
    <View style={styles.container}>
        <Image source={imageMapping[name]} style={styles.playlistbanner}/>
        <Text style={styles.text}>{name}</Text>
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