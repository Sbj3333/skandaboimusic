import React from 'react'
import { Image, Text, View } from 'react-native'

const Song = () => {
  return (
    <View>
        <Image source={require('../assets/music2.jpeg')} style={styles.songphoto}/>
        <Text style={styles.songname}>Song name</Text>
        <Image source={require('../assets/heartopen.png')} style={styles.heart}/>
        <Image source={require('../assets/options_icon.png')} style={styles.option}/>
    </View>
  )
}

export default Song