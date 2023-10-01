import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import { useState } from 'react'

const Popularplaylist = ({item}) => {
    const navigation = useNavigation();
    const [playlists, setPlaylists] = useState([]);
    const handleplaylist = (href) => {
        navigation.navigate("IndividualPlaylist", href);
    }

    const checklink = (href) => {
        console.log(href);
    }
    
    const getFeaturedPlaylists = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try{
            const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists?limit=10", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            // playlists = data;
            // console.log(JSON.stringify(data.playlists.items[0].name, null, 3));
            // console.log(JSON.stringify(data.playlists.items[0].images[0].url))
            // console.log(data.playlists);
            setPlaylists(data.playlists.items);
            // console.log(data.playlists.items[0].href);
            // console.log('eof');
            
            
            return data;

        }   catch{
            console.log("error getting featured playlists");
        }
    };

    useEffect(() => {
        getFeaturedPlaylists();
    }, []);
    const renderItem = ({item, index}) =>{
        const isLastItem = index ===(playlists.length - 1 );
        // console.log(index)
        return(
            <Pressable style={[styles.playlistcontainer, isLastItem? {marginBottom: 100}: null]} onPress={() => handleplaylist(item.href)}>
                {/* <View style={styles.imagecontainer}> */}
                <Image style={styles.playlistimage} 
                    source={{uri: item.images[0].url}}
                />
                {/* </View> */}
                {/* <View style={styles.textcontainer}>
                    <Text numberOfLines={1} style={styles.playlistname}>{item.name}</Text>
                </View> */}

            </Pressable>
        )
    }
  return (
    <View>
    <FlatList 
        data={playlists}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-around'}}/>
    </View>
    
  )
}

const styles = StyleSheet.create({
    playlistcontainer:{
        height: 132, 
        width: 132,
        flexDirection: 'column',
        backgroundColor: 'rgba(105, 103, 102, 0.3)',
        marginVertical: '5%',
        borderRadius: 10
        // alignItems: 'center',
    },

    playlistimage: {
        height: '100%', 
        width: '100%',
        objectFit: 'contain',
        borderRadius: 10,
        // borderBottomEndRadius: 10
        // backgroundColor: 'green'
    },

    playlistname:{
        marginLeft: '4%',
        marginTop: 2,
        color: 'white', 
        fontSize: 13,
        fontWeight:'bold'
    },
    imagecontainer:{
        height: '80%',
        width: '100%',
        // justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'red',
        objectFit: 'contain'
    },

    textcontainer:{
        height: '19%',
        // backgroundColor: 'green',
        justifyContent: 'center',
        // alignItems: 'center'

    },
    
})

export default Popularplaylist