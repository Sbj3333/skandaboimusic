import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Playlist from './Playlist'
import Miniplaylist from './Miniplaylist'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Library = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>My Library</Text>
      </View>
      <View style={styles.gap}></View>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>
        <Miniplaylist/>

      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1c1d',
  },

  head:{
    height: 70,
    justifyContent: 'center',
    marginLeft: 15

  },

  text:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },

  scrollview: {
    backgroundColor: 'blue'
  },
  
  gap: {
    height: 15
  }
})
export default Library