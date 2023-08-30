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
        <View style={styles.bannercontainer}>
          <Image source={require('../assets/music2.jpeg')} style={styles.banner}/>
        </View>
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
    flex: 1,
  },

  firstcontainer:{
    flexDirection: 'row',
    backgroundColor:'#1d1c1d',
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
  },

  textcontainer: {
    height: '60%',
    gap: 5,
    marginTop: 10,
    alignItems: 'center'
  },

  options:{
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
  },

  bannercontainer:{
    height: '60%',
    backgroundColor: '#1d1c1d',
    justifyContent: 'center',
    alignItems: 'center'
  },

  banner: {
    height: '70%',
    width: '90%',
    objectFit: 'contain',
    // borderRadius: 20
  },

  songnameandliked:{
    backgroundColor: 'green',
    height: '9%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: '10%'
  },

  songname:{
    color: 'white',
    fontSize: 30,
    marginTop: '-2%'


  },

  liked:{
    height: '40%',
    width: '10%',
    objectFit: 'contain',
    backgroundColor: 'red'
  }


})
export default Songplayer