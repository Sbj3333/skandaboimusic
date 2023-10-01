//component which contains all the songs of the playlist

import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Player } from './PlayerContext';
import { BottomModal, ModalContent } from 'react-native-modals';
import { useRef } from 'react';
import { Audio } from 'expo-av';


const ActualPlaylist = () => {
  const navigation = useNavigation();
  const [actualplaylists, setActualPlaylists] = useState([]);
  const [playlistname, setPlaylistName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const value = useRef(0);
  const [currentSound, setCurrentSound] = useState(null);
  const [songindex, setSongIndex] = useState(0);
  const [firstclick, setFirstClick] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const {currentTrack, setCurrentTrack} = useContext(Player)
  // const renderItem = ({})
  const route = useRoute();
  const href = route.params;
  console.log(href);


  const getplaylist = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try{
        const response = await fetch(`${href}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
          }
        });
        const data = await response.json();
        setActualPlaylists(data.tracks.items);
        setPlaylistName(data.name);
        // console.log(data.name);
        // console.log(data.images[0].url);
        // console.log(JSON.stringify(data.tracks.items[0].track.album.artists.name[0]));
        // console.log(JSON.stringify(data.tracks.items[0], null, 2));
        console.log(JSON.stringify(data.tracks.items[1], null, 2));
        // console.log(JSON.stringify(data.tracks.items[1].track.artists[0].name, null, 2)); //artist name
        <Image style={styles.playpause} source={require('../assets/pausesong.png')}/>
        // console.log(JSON.stringify(data.tracks.items[1].track.album.images[0].url, null, 2)); //image


        return data;
      } catch {
        console.log("error getting the songs from your playlist")
      }
  }

  useEffect(() => {
    getplaylist();
  }, []);

  const playTrack = async () => {
    console.log("trying to play", songindex);
    if (actualplaylists.length >0){
      setCurrentTrack(actualplaylists[0]);
    }
    await play(actualplaylists[0]);
  }

  const handlefirstimeclicks = async() =>{
    setFirstClick(true);
    if(firstclick){
      playTrack();
    }
    else{
      handlePlayPause();
    }
  }


  const play = async (nextTrack) =>{
    console.log(nextTrack);
    const preview_url = nextTrack?.track?.preview_url;
    console.log("preview_url", preview_url);
    try{
      if(currentSound){
        await currentSound.stopAsync();
      }
      await Audio.setAudioModeAsync({
        playInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
      });
      const {sound, status} = await Audio.Sound.createAsync(
        {
          uri: preview_url,
        },
        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlaybackStatusUpdate

      );
      onPlaybackStatusUpdate(status);
      setCurrentSound(sound);
      setIsPlaying(status.isLoaded);
      await sound.playAsync();
    } catch(err){
      console.log(err.message);
    }
  }

  const onPlaybackStatusUpdate = async (status) =>{
    console.log(status);
    if (status.isLoaded && status.isPlaying){
      const progress = status.positionMillis / status.durationMillis;
      console.log("progress" ,progress);
      setProgress(progress);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
    if(status.didJustFinish === true){
      setCurrentSound(null);
      playNextTrack();
    }
  };

  const circleSize = 12;
  const formatTime = (time) => {
    const minutes = Math.floor(time/ 60000);
    const seconds = Math.floor((time % 60000)/ 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = async() => {
    if(currentSound){
      if(isPlaying){
        await currentSound.pauseAsync();
      }else{
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = async () => {
    if (currentSound){
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (value.current < actualplaylists.length){
      const nextTrack = actualplaylists[value.current];
      setCurrentTrack(nextTrack);
      await play(nextTrack);
    }else{
      console.log("end of playlist")
    }
  };

  const playPreviousTrack = async () => {
    if(currentSound){
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -=1;
    if(value.current < actualplaylists.length){
      const nextTrack = actualplaylists[value.current];
      setCurrentTrack(nextTrack);
      await play(nextTrack)
    }else{
      console.log("end of playlist");
    }
  };

  const renderItem = ({item, index}) =>{
    

    return(
      <Pressable onPress={handlefirstimeclicks}>
        <View style={styles.songcontainer}>
            {item.track.album.images[0]?.url ?(
              <Image source={{uri: item.track.album.images[0].url}} style={styles.songphoto}/>
            ):(
              <Image source={require('../assets/music.jpeg')} style={styles.songphoto}/>

            )}
            <View style={styles.songnamecontainer}>
              <Text numberOfLines={1} style={styles.songname}>{item.track.name}</Text>
              <Text numberOfLines={1} style={styles.artistname}>{item.track.artists[0].name}</Text>
            </View>
            {/* <Image source={require('../assets/heartopen.png')} style={styles.heart}/> */}
            {/* <Image source={require('../assets/options_icon.png')} style={styles.option}/> */}
            <AntDesign name="hearto" size={22} color="white" style={styles.heart} />
            <SimpleLineIcons name="options-vertical" size={24} color="white" style={styles.option} />
        </View>
      </Pressable>
    )
  }
  
  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={30} color="white" style={styles.pagebackbutton}/>
          </Pressable>
          <Text numberOfLines={1} style={styles.text}>{playlistname}</Text>
          <Pressable 
            onPress={playTrack}
          >
            {isPlaying ?(
              <Image style={styles.playpause} source={require('../assets/pausesong.png')}/>

            ):(
              <Image style={styles.playpause} source={require('../assets/playsong.png')}/>
            )}
          </Pressable>
        </View>
        
        <FlatList 
          data = {actualplaylists}
          renderItem={renderItem}
          numColumns = {1}
          />
        <View style={styles.container}/>
        {currentTrack && (
          <Pressable style={styles.minisong} 
            onPress={() => setModalVisible(!modalVisible)}
            >
            <View style={styles.minisongcontainer}>
              <Image 
                source={{uri: currentTrack?.track?.albums?.images[0].url}} 
                // source={require('../assets/music.jpeg')}
                style={styles.minisongcover}/>
              <View style={styles.minitextcontainer}>
                <Text style={styles.minisongname}>
                  {currentTrack?.track?.name}
                  {/* Song name */}
                </Text>
                <Text style={styles.miniartistname}>
                  {currentTrack?.track?.artists[0].name}
                  {/* artist name */}
                </Text>
              </View>
              <Image source={require('../assets/heartopen.png')} style={styles.miniheart}/>
              <Image source={require('../assets/pause.png')} style={styles.minipause} />
            </View>
          </Pressable>
        )}

        <BottomModal
          visible={modalVisible}
          onHardwareBackPress={() => setModalVisible(false)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}>
            <ModalContent style = {{height: '100%', width: '100%', backgroundColor: '#1d1c1d'}}>
            <SafeAreaView>
                <View style={styles.firstcontainer}>
                  <Image source={require('../assets/backbutton.png')} style={styles.backbutton} onPress={setModalVisible(false)}/>
                  <View style={styles.textcontainer}>
                    <Text style={styles.constant}>Playing songs from your library</Text>
                    <Text style={styles.library}>Liked songs</Text>
                  </View>
                  <Image style={styles.options} source={require('../assets/options_icon.png')}/>
                </View>
                <View style={styles.bannercontainer}>
                  <Image source={{uri: currentTrack?.track?.album?.images[0].url}} style={styles.banner}/>
                </View>
                <View style={styles.songnameandliked}>
                  <View style={styles.modalsongnamecontainer}>
                    <Text style={styles.modalsongname}></Text>
                  </View>
                  <Image style={styles.liked} source={require('../assets/heartopen.png')}/>
                </View>
                <View style={styles.songprogress}>
                  <View style={[styles.progressbar, {width: `${progress * 100}%`}]}/>
                  <View style={[
                    {
                      position: 'absolute', 
                      top: -5,
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize / 2,
                      backgroundColor: 'white'
                    },
                    {
                      left: `${progress * 100}%`, 
                      marginLeft: -circleSize / 2,
                    }
                  ]}
                  />
                  <View 
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      alignItems: 'center', 
                      justifyContent: 'space-between'
                    }}>
                    <Text>{formatTime(currentTime)}</Text>
                    <Text>{formatTime(totalDuration)}</Text>
                  </View>
                </View>
                <View style={styles.songcontrol}>
                  <Pressable>
                    <Image source={require('../assets/shuffle.png')} style={styles.shuffle}/>
                  </Pressable>



                  <Pressable onPress={playPreviousTrack}>
                    <Image source={require('../assets/previoussong.png')} style={styles.prevnext}/>
                  </Pressable>




                  <Pressable onPress={handlePlayPause}> 
                    {isPlaying ? (
                      <Image source={require('../assets/pausesong.png')} style={styles.secondplaypause}/>
                    ) : (
                      <Pressable onPress={handlePlayPause}>
                        <Image source={require('../assets/playsong.png')} style={styles.secondplaypause}/>
                      </Pressable>
                    )}
                  </Pressable>



                  <Pressable onPress={playNextTrack}>
                    <Image source={require('../assets/nextsong.png')} style={styles.prevnext}/>
                  </Pressable>




                  <Pressable>
                    <Image source={require('../assets/repeat.png')} style={styles.repeat}/>
                  </Pressable>
                </View>
              </SafeAreaView>
            </ModalContent>
        </BottomModal>
        
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({

  

  songcontainer:{
    backgroundColor: 'black',
    height: 65,
    padding: 6,
    flexDirection: 'row'

  },
  songphoto: {
    height: '100%',
    width: '17%',
    objectFit: 'contain',
    marginLeft: 8
    // backgroundColor: 'green',
  },

  songnamecontainer:{
    // backgroundColor: 'blue',
    width: '52%',
    justifyContent: 'center',
    marginLeft: 5
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

  heart:{
    height: '40%',
    width: '10%',
    // objectFit: 'contain',
    marginTop: 10,
    marginLeft: 10
    // backgroundColor: 'plum'
  },

  option: {
    height: '50%',
    width: '12%',
    marginTop: 10,
    marginLeft: 24,
    // backgroundColor: 'gray'
  },
  
  container:{
    
    backgroundColor: 'black',
    flex: 1,
    gap: 1,
  },

  header:{
    // backgroundColor:'red',
    width: '100%',
    height:'12%',
    flexDirection: 'row',
    justifyContent:'centre',
    alignItems: 'center'
  },

  text:{
    color:'white',
    width: '60%',
    fontSize: 20,
    fontWeight: 'bold',
    // backgroundColor:'red',
    marginLeft: -30
  },

  playpause:{
    height:70,
    width: 50,
    objectFit:'contain',
    marginLeft:10,
    // backgroundColor:'blue'
  },

  gap:{
    height: 30
  },

  pagebackbutton:{
    marginLeft: '20%'
  },

  minisong:{
    bottom: 10,
    height: 50,
    width: '99%',
    marginLeft: '3.5%',
    // position: 'absolute'
  },

  minisongcontainer:{
    // justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#388fd5',
    // alignItems: 'center',
    flex: 1,
    width: '95%',
    borderRadius: 10
  },

  minitextcontainer:{
    // backgroundColor: 'blue',
    width: '52%',
    justifyContent: 'center',
    marginLeft: 7,
  },


  minisongcover: {
    height: '90%',
    width: '13%',
    top: 2.5,
    objectFit: 'contain',
    borderRadius: 10,
    left: 2.5, 
    // backgroundColor: 'red'
  },

  minisongname: {
    color:'white',
    fontSize: 17,
    // marginTop: '2%',
  },
  miniartistname:{
    color: 'white',

    fontSize: 10,
    
  },

  miniheart:{
    height: '60%',
    width: '10%',
    objectFit: 'contain',
    top: '3%',
    marginLeft: '1%',
    // backgroundColor: 'red'
  },

  minipause:{
    height: '60%',
    width: '10%',
    objectFit: 'contain',
    top: '3%',
    // backgroundColor: 'red',
    marginLeft: '5.5%',

  },


  firstcontainer:{
    flexDirection: 'row',
    backgroundColor:'#1d1c1d',
    height:'10%',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 30
  },

  backbutton:{
    height:'55%', 
    width: '10%',
    objectFit:'contain',
  },

  textcontainer: {
    height: '60%',
    gap: 5,
    marginTop: 10,
    alignItems: 'center'
  },

  options:{
    height: '50%',
    width: '10%',
    objectFit: 'contain'
  },

  constant:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },

  library:{
    color: 'white',
    fontSize: 10
  },

  bannercontainer:{
    height: '60%',
    backgroundColor: '#1d1c1d',
    justifyContent: 'center',
    alignItems: 'center'
  },

  banner: {
    height: '70%',
    width: '90%',
    objectFit: 'contain',
    // borderRadius: 20
  },

  songnameandliked:{
    backgroundColor: '#1d1c1d',
    height: '9%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center', 
  },

  modalsongnamecontainer:{
    // backgroundColor: 'red',
    width: '50%',

  },

  modalsongname:{
    color: 'white',
    fontSize: 30,
    marginTop: '-2%',
    // paddingLeft: 30


  },

  liked:{
    height: '50%',
    width: '10%',
    objectFit: 'contain',
    // backgroundColor: 'red',
  },

  songprogress: {
    height: '5%',
    backgroundColor: '#1d1c1d',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  songcontrol: {
    height: '18%',
    backgroundColor: '#1d1c1d',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center'

  },

  shuffle:{
    height: '25%',
    width: '10%',
    objectFit: 'contain',
    marginTop: '-15%'
  },

  prevnext:{
    height: '30%',
    width: '15%',
    objectFit: 'contain',
    marginTop: '-15%'

  },

  secondplaypause: {
    height: '45%',
    width: '20%',
    objectFit: 'contain',
    marginTop: '-15%'

  },

  repeat: {
    height: '25%',
    width: '10%',
    objectFit: 'contain',
    marginTop: '-15%'

  },

  progressbar:{
    height: '20%',
    backgroundColor: 'white'
  }
})

export default ActualPlaylist