import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { getGreeting } from './utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import Minisong from './Minisong'
import Popularplaylist from './Popularplaylist'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'react-native'
import { BottomModal } from 'react-native-modals'
// import LinearGradient from 'react-native-linear-gradient'



const Home = () => {
  const greeting = getGreeting();
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState();
  const [recentlyplayed, setRecentlyPlayed] = useState();
  const [isModalVisible, setModalVisible] = useState(null);

  const toggleModal = () =>{
    setModalVisible(!isModalVisible);
  };

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    // console.log(accessToken)
    try{
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      // console.log(data);
      setUserProfile(data);
      return data;
    } catch{
      console.log("error");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    // console.log("access token is working fine", accessToken);
    try{
      const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=6",{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        
      });
      const data = await response.json();
      const tracks = data.items;
      // console.log(data);
      setRecentlyPlayed(tracks);

    } catch(err){
      // console.log("error from the unknown");
      console.log(err);
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
          backgroundColor: 'rgba(105, 103, 102, 0.3)',
          borderRadius: 10,
          // elevation: 3
        }}
      >
        <Image  
          style={{height: 55, width: 55, borderRadius: 10}}
          source={{ uri: item.track.album.images[0].url}}
        />
        <View
          style={{flex: 1, marginHorizontal: 8, justifyContent: 'center'}}
        >
          <Text 
            numberOfLines={2}
            style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}
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
          style={styles.recents}
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
        <Popularplaylist/>
        <View styles={styles.gap}/>
      </ScrollView>
      {/* <View style={styles.minisong}>
        <Minisong/>
      </View> */}
      <BottomModal isVisible={isModalVisible}>
        <Pressable>
          <View style={styles.songcontainer}>
            <Image //source={{uri: currentTrack?.track?.albums?.images[0].url}} 
            style={styles.songcover}/>
            <Text style={styles.songname}>Song name</Text>
            <Image source={require('../assets/heartopen.png')} style={styles.heart}/>
            <Image source={require('../assets/pause.png')} style={styles.pause} />
          </View>
        </Pressable>
      </BottomModal>
      {/* <View style={styles.navbar}>
        <Navbar />
      </View> */}
      

      
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    flex: 1,
    gap: 10
  },
  greetingcontainer:{
    justifyContent: 'center',
    marginLeft: '5%',
    marginTop: '5%'
  },
  greeting:{
    backgroundColor: 'black',
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
    backgroundColor: 'black',
    alignItems: 'center',
    gap: -10

  },
  recentrow:{
    flexDirection: 'row',
    flex: 1,

  },
  gap: {
    height: 150,
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
    backgroundColor: 'black',
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems:'center',
    bottom:'7%',

  },
  recents:{
    // backgroundColor:'red',
    height: 250
  },

  songcontainer:{
    // justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#388fd5',
    // alignItems: 'center',
    flex: 1,
    width: '95%',
    borderRadius: 10
  },

  songcover: {
    height: '90%',
    width: '13%',
    top: 2.5,
    objectFit: 'contain',
    borderRadius: 10,
    left: 2.5, 
    // backgroundColor: 'blue'
  },

  songname: {
    color:'white',
    fontSize: 17,
    marginTop: '2%',
    left: '30%'
  },

  heart:{
    height: '60%',
    width: '10%',
    objectFit: 'contain',
    top: '2.5%',
    marginLeft: '34%',
    // backgroundColor: 'red'
  },

  pause:{
    height: '65%',
    width: '10%',
    objectFit: 'contain',
    top: '2%',
    // backgroundColor: 'red',
    marginLeft: '4.5%',

  }
  
  
  
})
export default Home