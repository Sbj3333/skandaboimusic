import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'

const Popularplaylist = ({item}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.playlistcontainer}>
        <Pressable onPress={() => navigation.navigate('Playlist', {item: item})}>
            <Image source={{uri: item.track.album.images[0].url}} style={styles.playlistimage}/>
            <Text numberOfLines={1} style={styles.playlistname}>{item?.track?.name}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    playlistcontainer:{
        height: 170, 
        width: '35%',
        flexDirection: 'column',
        backgroundColor: 'rgba(105, 103, 102, 0.5)',
        // alignItems: 'center',
    },

    playlistimage: {
        height: '80%', 
        width: '100%',
        objectFit: 'contain',
        backgroundColor: 'green'
    },

    playlistname:{
        marginLeft: '2%',
        color: 'white', 
        fontSize: 25
    }
})

export default Popularplaylist