import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

const Song = ({item}) => {
  return (
    <Pressable>
      <View style={styles.songcontainer}>
          <Image source={{uri: item?.track?.album?.images[0].url}} style={styles.songphoto}/>
          <View style={styles.songnamecontainer}>
            <Text style={styles.songname}>{item?.track?.name}</Text>
            <Text style={styles.artistname}>{item?.track?.artists[0].name}</Text>
          </View>
          <Image source={require('../assets/heartopen.png')} style={styles.heart}/>
          <Image source={require('../assets/options_icon.png')} style={styles.option}/>
      </View>
    </Pressable>
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