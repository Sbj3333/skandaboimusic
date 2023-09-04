import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Song from './Song'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Audio} from "expo-av";
import { Player } from './PlayerContext'
import {BottomModal} from 'react-native-modals'
import {ModalContent} from 'react-native-modals'
const Playlist = () => {

  const navigation = useNavigation();
  const [backgroundColor, setBackgroundColor] = useState("#0A2647");
  const [modalVisible, setModalVisible] = useState(false);
  // const [searchedTracks, setSearchedTracks] = useState([]);
  const [input, setInput] = useState("");
  const value = useRef(0);
  const [currentSound, setCurrentSound] = useState(null);

  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedTracks, setSavedTracks] = useState([]);
  const {currentTrack, setCurrentTrack} = useContext(Player);
  async function getSavedTracks(){
    const accessToken = await AsyncStorage.getItem("token");
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks?offset=0&limit=1000",
      {
        headers:{
          Authorization: `Bearer ${accessToken}`,

        },
        params: {
          limit: 500,
        },
      });
    
    if(!response.ok){
      throw new Error("failed to fetch the tracks");
    }
    const data = await response.json();
    setSavedTracks(data.items);
  }
  useEffect(() => {
    getSavedTracks();
  }, []);

  const playTrack = async () => {
    if (savedTracks.length > 0){
      setCurrentTrack(savedTracks[0]);
    }
    await play(savedTracks[0]);
  };

  const play = async (nextTrack) =>{
    console.log(nextTrack);
    const preview_url = nextTrack?.track?.preview_url;
    try{
      if(currentSound){
        await currentSound.stopAsync();
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
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
    } catch (err) {
        console.log(err.message);
    }
  }

  const onPlaybackStatusUpdate = async (status) => {
    console.log(status);
    if (status.isLoaded && status.isPlaying){
      const progress = status.positionMillis / status.durationMillis;
      console.log("progress", progress);
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
    const minutes = Math.floor(time / 60000);
    const secons = Math.floor((time % 60000)/1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  const handlePlayPause = async () => {
    if (currentSound){
      if(isPlaying){
        await currentSound.pauseAsync();
      }else{
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // useEffect(() => {
  //   if(savedTracks.length > 0){
  //     handleSearch(input)
  //   }
  // },[savedTracks])


  const extractColors = async () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    setBackgroundColor(randomColor);
  };

  const playNextTrack = async () =>{
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (value.current < savedTracks.length){
      const nextTrack = savedTracks[value.current];
      setCurrentTrack(nextTrack);
      extractColors();
      await play(nextTrack);
    } else{
      console.log("end of playlist");
    }
  };



  const playPreviousTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -= 1;
    if (value.current < savedTracks.length) {
      const nextTrack = savedTracks[value.current];
      setCurrentTrack(nextTrack);

      await play(nextTrack);
    } else {
      console.log("end of playlist");
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={24} color="white"/>
          </Pressable>
          <Text style={styles.text}>Playlist Name</Text>
          <Pressable onPress={playTrack}>
            <Image style={styles.playpause} source={require('../assets/pausesong.png')}/>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <FlatList data = {savedTracks} renderItem={({item}) => {
            <Song item = {item}/>
          }}/>
        </ScrollView>

          {currentTrack && (
            <Pressable style={{bottom:20}} onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.songcontainer}>
                <Image source={{uri: currentTrack?.track?.albums?.images[0].url}} style={styles.songcover}/>
                <Text style={styles.songname}>{currentTrack?.track?.name}</Text>
                <Text style={styles.artistname}>{currentTrack?.track?.artists[0].name}</Text>
                <Image source={require('../assets/heartopen.png')} style={styles.heart}/>
                <Image source={require('../assets/pause.png')} style={styles.pause} />
              </View>
            </Pressable>
          )}

          
        <BottomModal
          visible={modalVisible}
          onHardwareBackPress={() => setModalVisible(false)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}>
            <ModalContent style={{height: '100%', width: '100%', backgroundColor: '#1d1c1d'}}>
              <SafeAreaView>
                <View style={styles.firstcontainer}>
                  <Image source={require('../assets/backbutton.png')} style={styles.backbutton}/>
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
                  <View style={styles.songnamecontainer}>
                    <Text style={styles.songname}></Text>
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
                      <Image source={require('../assets/pausesong.png')} style={styles.playpause}/>
                    ) : (
                      <Pressable onPress={handlePlayPause}>
                        <Image source={require('../assets/playsong.png')} style={styles.playpause}/>
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

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#1d1c1d',
    flex: 1,
    gap: 1,
  },

  header:{
    backgroundColor:'#1d1c1d',
    height:'12%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },

  text:{
    color:'white',
    fontSize: 38,
    fontWeight: 'bold'
  },

  playpause:{
    height:'60%',
    width: '25%',
    objectFit:'contain',
    // backgroundColor:'blue'
  },

  scrollview:{
    gap: 2
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

  },
  main:{
    flex: 1,
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

  songnamecontainer:{
    // backgroundColor: 'red',
    width: '50%',

  },

  songname:{
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

  playpause: {
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
    height: '100%',
    backgroundColor: 'white'
  }

  
  
})

export default Playlist