import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import { getGreeting } from './utils'
import Recents from './Recents'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from './Navbar'
import Minisong from './Minisong'
import Popularplaylist from './Popularplaylist'
import Popularplaylistrow from './Popularplaylistrow'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import LinearGradient from 'react-native-linear-gradient'



const Home = () => {
  const greeting = getGreeting();
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState();
  const [recentlyplayed, setRecentlyPlayed] = useState();

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (err){
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await axios({
        method: "GET",
        url: "https://api/spotify.com/v1/me/player/recently-played?limit=6",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tracks = response.data.items;
      setRecentlyPlayed(tracks);
    } catch {err} {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRecentlyPlayedSongs();
  }, []);
  const renderItem = ({item}) =>{
    return(
      <Pressable 
        style={{
          flex:1,
          flexDirection: "row",
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 8,
          backgroundColor: 'rgba(105, 103, 102, 0.5)',
          borderRadius: 4,
          elevation: 3
        }}
      >
        <Image  
          style={{height: 55, width: 55}}
          source={{ uri: item.track.album.images[0].url}}
        />
        <View
          style={{flex: 1, marginHorizontal: 8, justifyContent: 'center'}}
        >
          <Text 
            numberOfLines={2}
            style={{fontSize: 13, fontWeight: 'bold', color: 'white'}}
          >
            {item.track.name}
          </Text>
        </View>
      </Pressable>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingcontainer}>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>
      <ScrollView>
        <FlatList 
          data={recentlyplayed}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{justifyContent: "space-between"}}/>
        {/* <View style={styles.recentcontainer}>
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
        </View> */}
        {/* <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}> */}
        <View style={styles.popular}>
          <Text style={styles.populartext} >Popular playlists</Text>
        </View>
        {/* <View>
          <Popularplaylistrow/>
          <Popularplaylistrow/>
          <Popularplaylistrow/>
          <Popularplaylistrow/>
        </View> */}
        <FlatList data={recentlyplayed} showsVerticalScrollIndicator={false} renderItem={({item, index}) => (
          <Popularplaylist item={item} key={index}/>
        )}
        />
      </ScrollView>
      <View style={styles.minisong}>
        <Minisong/>
      </View>
      {/* <View style={styles.navbar}>
        <Navbar />
      </View> */}
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
    padding: 10,
    // justifyContent: 'center',
    height: 250,
    // flex: 1,
    backgroundColor: '#1d1c1d',
    alignItems: 'center',
    gap: -10

  },
  recentrow:{
    flexDirection: 'row',
    flex: 1,

  },
  gap: {
    width: '3%'
  },

  scrollview:{
    // backgroundColor: 'red', 
    height: 20,
    flex: 1
  },

  navbar:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  popular:{
    height: 65,
    backgroundColor: '#1d1c1d',
    marginTop: -15
  },
   
  populartext:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    fontWeight:'bold',
    marginLeft: '5%'
  },

  minisong:{
    position: 'absolute',
    height: '6%',
    width: '100%',
    backgroundColor: '#1d1c1d',
    justifyContent: 'center',
    alignItems:'center',
    bottom:'7%',

  },
  
  
  
})
export default Home