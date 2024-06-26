import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'


const Minisong = () => {
  return (
    <Pressable>
      <View style={styles.songcontainer}>
        <Image source={{uri: currentTrack?.track?.albums?.images[0].url}} style={styles.songcover}/>
        <Text style={styles.songname}>Song name</Text>
        <Image source={require('../assets/heartopen.png')} style={styles.heart}/>
        <Image source={require('../assets/pause.png')} style={styles.pause} />
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  songcontainer:{
    // justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#388fd5',
    // alignItems: 'center',
    flex: 1,
    width: '95%',
    borderRadius: 10
  },

  songcover: {
    height: '90%',
    width: '13%',
    top: 2.5,
    objectFit: 'contain',
    borderRadius: 10,
    left: 2.5, 
    // backgroundColor: 'blue'
  },

  songname: {
    color:'white',
    fontSize: 17,
    marginTop: '2%',
    left: '30%'
  },

  heart:{
    height: '60%',
    width: '10%',
    objectFit: 'contain',
    top: '2.5%',
    marginLeft: '34%',
    // backgroundColor: 'red'
  },

  pause:{
    height: '65%',
    width: '10%',
    objectFit: 'contain',
    top: '2%',
    // backgroundColor: 'red',
    marginLeft: '4.5%',

  }

})
export default Minisong