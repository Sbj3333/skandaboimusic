import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
const Recents = () => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/music2.jpeg')} style={styles.image}/>
        <Text style={styles.text}>Song</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        height: '60%',
        width: '45%',
        backgroundColor: 'rgba(105, 103, 102, 0.5)',
        // flex: 1,
        flexDirection: 'row',
        objectFit: 'cover',
        borderRadius: 15,
    },

    image:{
        height: '100%',
        width:'35%',
        borderRadius: 15
        
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold',
      marginLeft: '4%',
      fontSize: 20,
      marginTop: '2%'

    },
})
export default Recents