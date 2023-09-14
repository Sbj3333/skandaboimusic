import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import { useState } from 'react'

const Popularplaylist = ({item}) => {
    const navigation = useNavigation();
    const [playlists, setPlaylists] = useState([]);
    const getFeaturedPlaylists = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try{
            const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            // playlists = data;
            console.log(JSON.stringify(data.playlists.items[0].name, null, 3));
            console.log(JSON.stringify(data.playlists.items[0].images[0].url))
            // console.log(data.playlists);
            setPlaylists(data.playlists.items);
            // console.log(playlists.item?.images[0]?.url);
            // console.log('eof');
            
            return data;
        }   catch{
            console.log("error getting featured playlists");
        }
    };

    useEffect(() => {
        getFeaturedPlaylists();
    }, []);
  return (
    <View style={styles.playlistcontainer}>
    <Pressable onPress={() => navigation.navigate('Playlist', {item: item})}>
        
        
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