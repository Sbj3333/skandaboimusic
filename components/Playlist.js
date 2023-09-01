import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Song from './Song'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Playlist = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Playlist Name</Text>
          <Image style={styles.playpause} source={require('../assets/pausesong.png')}/>
        </View>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
          <Song/>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#1d1c1d',
    flex: 1,
    gap: 1,
  },

  header:{
    backgroundColor:'#1d1c1d',
    height:'12%',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center'
  },

  text:{
    color:'white',
    fontSize: 38,
    fontWeight: 'bold'
  },

  playpause:{
    height:'60%',
    width: '25%',
    objectFit:'contain',
    // backgroundColor:'blue'
  },

  scrollview:{
    gap: 2
  }

  
  
})

export default Playlist