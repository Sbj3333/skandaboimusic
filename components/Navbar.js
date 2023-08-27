import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
const Navbar = () => {
  return (
    <View style={styles.navbarcontainer}>
        <Image source={require('../assets/home_icon.png')} style={styles.image}/>
        <Image source={require('../assets/search_icon.png')} style={styles.image}/>
        <Image source={require('../assets/music_icon.png')} style={styles.image}/>
        <Image source={require('../assets/profile_icon.png')} style={styles.image}/>
    </View>
  )
}


const styles = StyleSheet.create({
    navbarcontainer:{
        height: '10%',
        flexDirection: 'row'
    },
    image:{
        height: '10%',
        width: '20%',
        objectFit: 'contain'
    }
})
export default Navbar