import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from "@expo/vector-icons"
import { Player } from './PlayerContext';
import { BottomModal, ModalContent, Modal } from 'react-native-modals';
import { Audio } from 'expo-av';
import { useRef } from 'react';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';




const LikedSongs = () => {
    const [likedsongs, setLikedSongs] = useState([]);
    const [selectedphotourl, setSelectedphotourl] = useState(null);
    const [selectedsongname, setSelectedsongname] = useState(null);
    const [selectedsongartist, setSelectedsongartist] = useState(null);
    const [selectedsongurl, setSelectedsongurl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const value = useRef(0);
    const [currentSound, setCurrentSound] = useState(null);
    const [songindex, setSongIndex] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [progress, setProgress] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loopstatus, setLoopStatus] = useState(false);
    const [shufflestatus, setShuffleStatus] = useState(false);
    const {currentTrack, setCurrentTrack} = useContext(Player)
    const [CPmodalVisible, setCPModalVisible] = useState(false);
    const navigation = useNavigation(); 

    const playTrack = async () => {
        console.log("trying to play", songindex);
        if (likedsongs.length >0){
          setCurrentTrack(likedsongs[0]);
        }
        await play(likedsongs[0]);
    }
    
    const play = async (nextTrack) =>{
        console.log(nextTrack);
        const songhref = nextTrack?.track?.href;
        const preview_url = nextTrack?.track.preview_url;
        console.log("href", songhref);
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
              isLooping: loopstatus,
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
          playNextTrack(shufflestatus);
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
    
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
    
      
    
    const playNextTrack = async (shufflestatus) => {
        if (currentSound){
          await currentSound.stopAsync();
          setCurrentSound(null);
        }
        if(shufflestatus){
          const SnextTrack = likedsongs[getRandomInt(0, likedsongs.length)];
          setCurrentTrack(SnextTrack);
          await play(SnextTrack);
        }
        else{
           value.current += 1;
          if (value.current < likedsongs.length){
            const nextTrack = likedsongs[value.current];
            console.log(nextTrack);
            setCurrentTrack(nextTrack);
            await play(nextTrack);
          }else{
            console.log("end of playlist");
          }
        }
       
    };
    
    const playPreviousTrack = async () => {
        if(currentSound){
          await currentSound.stopAsync();
          setCurrentSound(null);
        }
        value.current -=1;
        if(value.current < likedsongs.length){
          const nextTrack = likedsongs[value.current];
          setCurrentTrack(nextTrack);
          await play(nextTrack)
        }else{
          console.log("end of playlist");
        }
    };
    

  const handleadd = async(songuri) =>{
    navigation.navigate("Selectplaylist", songuri);
    console.log("song link is", songuri);
    // if(addedsongs){
    //   await getplaylist();
    // }
    // console.log("shit worked i guess")
    setCPModalVisible(false);
  }

  const handleremove = async(songuri) =>{
    await remove(href, songuri);
    setCPModalVisible(false)
    getplaylist();
    console.log("removed from playlist", songuri);
  }

  
  

  const remove = async (href, songuri) => {
    const access_token = await AsyncStorage.getItem("token");
    console.log("href", href)
    const id = href.split("/").pop();
    try {
      const request = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
          tracks: [
            {
              uri: songuri,
            },
          ],
        }),
      });
  
      // Handle the response if needed
      const response = await request.json();
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  

  const handleloop = async() =>{
    setLoopStatus(!loopstatus);
  }



    const getlikedsongs = async() =>{
        const accessToken = await AsyncStorage.getItem("token");
        try{
          const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
      
            }
          });
          const data = await response.json();
        //   console.log(JSON.stringify(data.items, null, 2));
          setLikedSongs(data.items);
          console.log(LikedSongs);
          return data;
        }catch(err){
          console.log(err.message);
      
        }
    }
    
    useEffect(() =>{
        getlikedsongs();
    }, []);
    

  const renderItem = ({item}) =>{
    const options = () =>{
        setCPModalVisible(!CPmodalVisible);
        // navigation.navigate("Library", state);
        setSelectedphotourl(item.track.album.images[0].url);
        setSelectedsongname(item.track.name);
        setSelectedsongartist(item.track.artists[0].name);
        setSelectedsongurl(item.track.uri);
        // console.log("selectedsongurl", JSON.stringify(item.track.uri, null, 2));
        // console.log(selectedphotourl);
        // console.log(selectedsongname);
        // console.log(selectedsongartist);
        // console.log(selectedsongurl);
    }

    return(
      <View>
        <Pressable onPress={play}>
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
              {/* <AntDesign name="hearto" size={22} color="white" style={styles.heart} /> */}
              <AntDesign name="heart" size={22} color="red" style={styles.heart} />
              
              <SimpleLineIcons name="options-vertical" size={24} color="white" style={styles.option} onPress={() => options(true)}/>
          </View>
        </Pressable>


        
        <BottomModal
        visible={CPmodalVisible}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}>
        <ModalContent style = {{height: '20%', width: '100%', backgroundColor: 'black'}}>
          <Entypo name="minus" size={24} color="gray" />
          <View style={styles.cpimagecontainer}>
            <Image 
              source={{uri: item.track.album.images[0].url}}
              style={styles.cpimage}/>
            <View style={styles.cptextcontainer}>
                <Text numberOfLines={1} style={styles.songname}>{item.track.name}</Text>
                <Text numberOfLines={1} style={styles.artistname}>{item.track.artists[0].name}</Text>
            </View>
          </View>

          <View style={styles.optioncontainer}>
            <View style={styles.addtoplaylist}>
              <Pressable onPress={handleadd(selectedsongurl)}>
                <AntDesign name="plus" size={24} color="white" />
                <Text style={styles.addname}>Add to Playlist</Text>
              </Pressable>
            </View>

            <View style={styles.removeplaylist}>
              <Pressable onPress={handleremove(selectedsongurl)}>
                <Entypo name="minus" size={24} color="gray" />
                <Text style={styles.removename}>Remove from this playlist</Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
        </BottomModal>
      
      </View>


    )
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={30} color="white" style={styles.pagebackbutton}/>
          </Pressable>
          <Text numberOfLines={1} style={styles.text}>Liked Songs</Text>
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
          data = {likedsongs}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

songcontainer:{
    // backgroundColor: 'red',
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
    marginTop: 12,
    marginLeft: 17
    // backgroundColor: 'plum'
  },

  option: {
    height: '50%',
    width: '12%',
    marginTop: 10,
    marginLeft: 13,
    // backgroundColor: 'gray'
  },

  cpimagecontainer:{
    height: '45%',
    // backgroundColor:'blue',
    flexDirection: 'row',
    alignItems: 'center',

  },

  cpmodal:{
    maxHeight: '30%',
    marginTop: 'auto'
  },

  cpimage:{
    height: '80%',
    aspectRatio: 1,
    marginLeft: '1.6%',
    borderRadius: 5
  },

  cptextcontainer:{
    // backgroundColor: 'red',
    marginLeft: '3%'
  },

  cpsongname: {
    color: 'white',
    fontSize: 18,
    // fontWeight: 'bold'
  },

  cpartistname: {
    color: '#bdbdbd',
    fontSize: 13,
    // fontWeight: 'bold'
  },

  xmark:{
    marginLeft: '65%',
    marginTop: '-23%'
  },

  optioncontainer: {
    // backgroundColor: 'red',
    marginTop: '6%',
    gap: 20
  },

  addtoplaylist:{
    flexDirection: 'row',
    alignItems:'center',
    // backgroundColor: 'blue',

  },

  addname:{
    marginLeft: '4%',
    color:'white',
    fontSize: 15
  },

  removeplaylist:{
    flexDirection: 'row',
    // backgroundColor: 'blue',
    alignItems: 'center',
    marginBottom:'5%'
  },

  removename:{
    marginLeft: '4%',
    color:'white',
    fontSize: 15
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

})

export default LikedSongs


