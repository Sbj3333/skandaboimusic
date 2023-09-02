import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Navbar = ({navigation}) => {
  return (
    <View style={styles.navbarcontainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/home_icon.png')} style={styles.image}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('../assets/search_icon.png')} style={styles.image}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Library')}>
          <Image source={require('../assets/music_icon.png')} style={styles.image}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/profile_icon.png')} style={styles.image}/>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    navbarcontainer:{
        height: '5.5%',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#1d1c1d',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        flex: 1
    },
    image:{
        height: '70%',
        width: '20%',
        objectFit: 'contain'
    }
})
export default Navbar