import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';


const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // console.log(query);

  const searchspotify = async(query) =>{
    const accessToken = await AsyncStorage.getItem("token");
    console.log(query)
    // setQuery(hello);
    
    try{
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      // console.log(query);
      const data = await response.json();
      const result = data.tracks.items;
      // console.log(JSON.stringify(result, null, 2));
      setSearchResults(result);
      // console.log(JSON.stringify(result, null, 2));

    } catch{
      console.log("error fetching songs");
    }
  }

  useEffect(() => {
    searchspotify();
  }, []);

  const renderItem = ({item}) =>{
    console.log("item", item);
    return(
      <View style={styles.songcontainer}>
        <Image source={{uri: item.album.images[0].url}} style ={styles.songimage}/>
        <View style= {styles.textcontainer}>
          <Text style={styles.songname}>{item.name}</Text>
          <Text style={styles.artistname}>{item.artists[0].name}</Text>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.ultimate}>
      <View style={styles.container}>
        <TextInput 
          placeholder='What do you want to listen to?' 
          placeholderTextColor="white"
          value={query}
          onChangeText={(text) => setQuery(text)}
          style={styles.searchbar}/>
        <Pressable>
          <AntDesign name="search1" size={24} color="white" 
            onPress={() => searchspotify(query)}  
            style={styles.searchbutton}
          />
        </Pressable>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        style={{backgroundColor:'black'}}
      />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  ultimate:{
    backgroundColor: 'black',
    // height: '100%'
  },

  container:{
    flexDirection: 'row',
    // backgroundColor:'red',
    marginTop: 20,
    alignItems: 'center'
  },

  searchbutton:{
    // marginTop: 10,
    marginLeft: 30
  },

  searchbar: {
    color:"white",
    // backgroundColor: 'green',
    height: 50,
    marginLeft: 20,
    fontSize: 20
  },
  songcontainer:{
    backgroundColor: 'black',
    height: 65,
    padding: 6,
    flexDirection: 'row'

  },
  songimage: {
    height: '100%',
    width: '17%',
    objectFit: 'contain',
    marginLeft: 8
    // backgroundColor: 'green',
  },

  textcontainer:{
    // backgroundColor: 'blue',
    width: '52%',
    justifyContent: 'center',
    marginLeft: 5,
    
  },

  songname: {
    color: 'white',
    fontSize: 15,
    // fontWeight: 'bold'
  },

  artistname: {
    color: '#bdbdbd',
    fontSize: 10,
    // fontWeight: 'bold'
  },
})

export default Search