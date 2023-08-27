import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import { getGreeting } from './utils'
import Recents from './Recents'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from './Navbar'
import LinearGradient from 'react-native-linear-gradient'



const Home = () => {
  const greeting = getGreeting();
  const gradient = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingcontainer}>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>
      {/* <ScrollView style={styles.scrollview}> */}
      <View style={styles.recentcontainer}>
        <View style={styles.recentrow}>
          <Recents/>
          <View style={styles.gap}/>
          <Recents/>
        </View>
        <View style={styles.recentrow}>
          <Recents/>
          <View style={styles.gap}/>
          <Recents/>
        </View>
        <View style={styles.recentrow}>
          <Recents/>
          <View style={styles.gap}/>
          <Recents/>
        </View>
      </View>
      {/* </ScrollView> */}
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <Navbar/>
      </LinearGradient>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#1d1c1d',
    flex: 1,
    gap: 10
  },
  greetingcontainer:{
    justifyContent: 'center',
    marginLeft: '5%',
    marginTop: '5%'
  },
  greeting:{
    backgroundColor: '#1d1c1d',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 35,
    fontWeight:'bold',
  },
  recentcontainer:{
    marginTop: '3%',
    justifyContent: 'space-around',
    height: '30%',
    // flex: 1,
    width: '100%',
    backgroundColor: '#1d1c1d',
    alignItems: 'center',
    gap: -30

  },
  recentrow:{
    flexDirection: 'row',
    flex: 1,
    marginTop: '0%',

  },
  gap: {
    width: '3%'
  },
  scrollview:{
    backgroundColor: 'red'
  }
})
export default Home