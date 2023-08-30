import React from 'react'
import { Text, View } from 'react-native'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Songplayer = () => {
  return (
    <SafeAreaView style={styles.main}>
        <View style={styles.firstcontainer}>
          <Image source={require('../assets/backbutton.png')} style={styles.backbutton}/>
          <View style={styles.textcontainer}>
            <Text style={styles.constant}>Playing songs from your library</Text>
            <Text style={styles.library}>Liked songs</Text>
          </View>
          <Image style={styles.options} source={require('../assets/options_icon.png')}/>
        </View>
        <Image source={require('../assets/music2.jpeg')}/>
        <View style={styles.songnameandliked}>
          <Text style={styles.songname}>Song</Text>
          <Image style={styles.liked} source={require('../assets/heartopen.png')}/>
        </View>
        <View style={styles.songprogress}>

        </View>
        <View style={styles.songcontrol}>
          <Image source={require('../assets/shuffle.png')} style={styles.shuffle}/>
          <Image source={require('../assets/previoussong.png')} style={styles.prevnext}/>
          <Image source={require('../assets/pausesong.png')} style={styles.playpause}/>
          <Image source={require('../assets/nextsong.png')} style={styles.prevnext}/>
          <Image source={require('../assets/repeat.png')} style={styles.repeat}/>
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  main:{
    flex: 1
  },

  firstcontainer:{
    flexDirection: 'row',
    backgroundColor:'green',
    height:'10%',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 30
  },

  backbutton:{
    height:'55%', 
    width: '10%',
    objectFit:'contain',
    // backgroundColor: 'black'
  },

  textcontainer: {
    // backgroundColor: 'blue',
    height: '60%',
    gap: 5,
    marginTop: 10,
    alignItems: 'center'
  },

  options:{
    // backgroundColor: 'black',
    height: '50%',
    width: '10%',
    objectFit: 'contain'
  },

  constant:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },

  library:{
    color: 'white',
    fontSize: 10
  }




})
export default Songplayer