import React from 'react'
import { Image, Text, View } from 'react-native'
import Song from './Song'

const Playlist = () => {
  return (
    <View>
        <Text style={styles.text}>Playlist Name</Text>
        <Image style={styles.playpause} source={require('../assets/pausesong.png')}/>
        
        <Song/>
    </View>
  )
}

export default Playlist