import React from 'react'
import { Text, View } from 'react-native'
import { Image } from 'react-native'

const Songplayer = () => {
  return (
    <View>
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
    </View>
  )
}

export default Songplayer