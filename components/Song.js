import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Song = () => {
  return (
    <View style={styles.songcontainer}>
        <Image source={require('../assets/music3.jpeg')} style={styles.songphoto}/>
        <View style={styles.songnamecontainer}>
          <Text style={styles.songname}>Song name</Text>
        </View>
        <Image source={require('../assets/heartopen.png')} style={styles.heart}/>
        <Image source={require('../assets/options_icon.png')} style={styles.option}/>
    </View>
  )
}

const styles=StyleSheet.create({
  songcontainer:{
    backgroundColor: '#292829',
    height: 50,
    padding: 6,
    flexDirection: 'row'

  },
  songphoto: {
    height: '100%',
    width: '17%',
    objectFit: 'contain',
    // backgroundColor: 'green',
  },

  songnamecontainer:{
    // backgroundColor: 'blue',
    width: '52%'
  },

  songname: {
    color: 'white',
    fontSize: 20
  },

  heart:{
    height: '90%',
    width: '15%',
    objectFit: 'contain',
    marginTop: 3
    // backgroundColor: 'plum'
  },

  option: {
    height: '70%',
    width: '15%',
    objectFit: 'contain',
    marginTop: 6

    // backgroundColor: 'gray'
  }






})

export default Song