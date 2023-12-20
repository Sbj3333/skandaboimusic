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
import { BottomModal, ModalContent, Modal } from 'react-native-modals';
import { useRef } from 'react';
import { Audio } from 'expo-av';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const ActualPlaylist = () => {
  const navigation = useNavigation();
  const [actualplaylists, setActualPlaylists] = useState([]);
  const [playlistname, setPlaylistName] = useState('');
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
  const [state, setState] = useState(false);

  const [selectedphotourl, setSelectedphotourl] = useState(null);
  const [selectedsongname, setSelectedsongname] = useState(null);
  const [selectedsongartist, setSelectedsongartist] = useState(null);
  const [selectedsongurl, setSelectedsongurl] = useState(null);
  // const renderItem = ({})
  const route = useRoute();
  const href = route.params;
  const addedsongs = route.params.addedsongs;

  console.log(route.params);
  // console.log(href);


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
        // console.log(JSON.stringify(data.tracks.items[1], null, 2));
        // console.log(JSON.stringify(data.tracks.items[1].track.artists[0].name, null, 2)); //artist name
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

  // const handlefirstimeclicks = async() =>{
  //   setFirstClick(true);
  //   if(firstclick){
  //     playTrack();
  //   }
  //   else{
  //     handlePlayPause();
  //   }
  // }


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
      const SnextTrack = actualplaylists[getRandomInt(0, actualplaylists.length)];
      setCurrentTrack(SnextTrack);
      await play(SnextTrack);
    }
    else{
       value.current += 1;
      if (value.current < actualplaylists.length){
        const nextTrack = actualplaylists[value.current];
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
    if(value.current < actualplaylists.length){
      const nextTrack = actualplaylists[value.current];
      setCurrentTrack(nextTrack);
      await play(nextTrack)
    }else{
      console.log("end of playlist");
    }
  };

  const pressed = async() =>{
    console.log("button is pressed");
  }

  



  const handleadd = async(songuri) =>{
    navigation.navigate("Selectplaylist", songuri);
    if(addedsongs){
      await getplaylist();
    }
  }

  const handleremove = async(songuri) =>{
    await remove(href, songuri);
    console.log("removed from playlist", songuri);
  }

  
  

  const remove = async (href, songuri) => {
    const access_token = await AsyncStorage.getItem("token");
    try {
      const request = await fetch(`https://api.spotify.com/v1/playlists/${href}/tracks`, {
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

  const renderItem = ({item}) =>{
    // const songuri = item.track.href;
    // console.log("this is the songuri", songuri);

    const options = () =>{
      setCPModalVisible(!CPmodalVisible);
      // navigation.navigate("Library", state);
      setSelectedphotourl(item.track.album.images[0].url);
      setSelectedsongname(item.track.name);
      setSelectedsongartist(item.track.artists[0].name);
      setSelectedsongurl(item.track.href);
      // console.log(selectedphotourl);
      // console.log(selectedsongname);
      // console.log(selectedsongartist);
      // console.log(selectedsongurl);
    }


    return(
      <View>
        <Pressable 
          // onPress={() => play(item)}
        >
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
              
              <SimpleLineIcons name="options-vertical" size={24} color="white" style={styles.option} onPress={options}/>
          </View>
        </Pressable>


        
      
      </View>


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
        //   onHardwareBackPress={() => setModalVisible(false)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}>
            <ModalContent style = {{height: '100%', width: '100%', backgroundColor: 'black', flex: 1, justifyContent: 'flex-end'}}>
            <SafeAreaView>
                <View style={styles.firstcontainer}>
                  <Pressable onPress={() => {setModalVisible(false)}}>
                    <AntDesign name="caretdown" size={24} color="white" style={{marginRight:5, marginBottom:5}}/>
                  </Pressable>

                  <View style={styles.textcontainer}>
                    <Text style={styles.constant}>Playing songs from your library</Text>
                    <Text style={styles.library}>Liked songs</Text>
                  </View>

                  <Entypo name="dots-three-vertical" size={24} color="white" style={{marginLeft:5}}/>
                </View>


                <View style={styles.bannercontainer}>
                  <Image 
                    source={{uri: currentTrack?.track?.album?.images[0].url}} 
                    // source={require('../assets/music.jpeg')}
                    style={styles.banner}/>
                </View>


                <View style={styles.songnameandliked}>
                  <View style={styles.modalsongnamecontainer}>
                    <Text style={styles.modalsongname}>KGF</Text>
                    <Text style={styles.artist}>Ravi Basrur</Text>
                  </View>
                  <AntDesign name="hearto" size={22} color="white" style={styles.heart} />
                  {/* <AntDesign name="heart" size={22} color="red" style={styles.heart} /> */}

                </View>


                <View style={styles.songprogress}>
                  <View style={[styles.progressbar, {width: `${progress*100}%`}]}/>
                  <View style={[
                    {
                      position: 'absolute', 
                      top: 3,
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize / 2,
                      backgroundColor: 'white'
                    },
                    {
                      left: `${progress*100}%`, 
                      marginLeft: -circleSize / 2,
                    }
                  ]}
                  />

                  <View 
                    style={styles.progresscontainer}>
                    <Text style={{color:'white'}}>{formatTime(currentTime)}</Text>
                    <Text style={{color:'white'}}>{formatTime(totalDuration)}</Text>
                  </View>
                </View>

                <View style={styles.songcontrols}>
                  <Pressable 
                    onPress={() =>{setShuffleStatus(true)}}
                  >
                    {shufflestatus? (
                      <Entypo name="shuffle" size={24} color="white" />
                    ):(
                      <Entypo name="shuffle" size={24} color="#154b9d" />
                    )}
                  </Pressable>


                  <Pressable onPress={playPreviousTrack}>
                    <AntDesign name="stepbackward" size={24} color="white" />
                  </Pressable>


                  <Pressable onPress={() => {handlePlayPause}}> 
                    {isPlaying ? (
                      // <Image source={require('../assets/pausesong.png')} style={styles.secondplaypause}/>
                      <AntDesign name="pausecircle" size={36} color="white" />

                    ) : (
                      <Pressable onPress={() => {handlePlayPause}}>
                        {/* <Image source={require('../assets/playsong.png')} style={styles.secondplaypause}/> */}
                        <AntDesign name="play" size={36} color="white" />

                      </Pressable>
                    )}
                  </Pressable>

                  {/* <Pressable>
                    <AntDesign name="pausecircle" size={36} color="white" />
                    <AntDesign name="play" size={36} color="white" />
                  </Pressable> */}


                  <Pressable onPress={playNextTrack}>
                    <AntDesign name="stepforward" size={24} color="white" />
                  </Pressable>


                  <Pressable 
                    onPress={handleloop}
                  >
                    {loopstatus ?(
                      <MaterialIcons name="repeat" size={28} color="white" />

                    ):(
                      <MaterialIcons name="repeat-one" size={28} color="#154b9d" />
                    )}

                  </Pressable>
                </View>
                
              </SafeAreaView>
            </ModalContent>
        </BottomModal>



        <BottomModal
        visible={CPmodalVisible}
        swipeDirection={["down"]}
        onBackdropPress={() => setCPModalVisible(false)}
        swipeThreshold={200}
        style={styles.cpmodal}
        onHardwareBackPress={() => setCPModalVisible(false)}>
          <ModalContent style = {{maxHeight:'100%', width: '100%', backgroundColor: "rgba(0,0,0,0.88)"}}>
            {/* <Entypo name="minus" size={34} color="gray" style={styles.shutter} /> */}
            <View style={styles.cpimagecontainer}>
              <Image 
                // source={{uri: item.track.album.images[0].url}}
                source={{uri: selectedphotourl}}
                style={styles.cpimage}/>
              <View style={styles.cptextcontainer}>
                  <Text numberOfLines={1} style={styles.cpsongname}>{selectedsongname}</Text>
                  <Text numberOfLines={1} style={styles.cpartistname}>{selectedsongartist}</Text>
                  {/* <Text>{selectedsongurl}</Text> */}
              </View>
            </View>

            <View style={styles.optioncontainer}>
              <View >
                <Pressable 
                  // onPress={handleadd(selectedsongurl)}
                  style={styles.addtoplaylist}
                >
                  <AntDesign name="plus" size={34} color="white" style={{marginLeft: '2%'}}/>
                  <Text style={styles.addname}>Add to Playlist</Text>
                </Pressable>
              </View>

              <View >
                <Pressable 
                  // onPress={handleremove(selectedsongurl)}
                  style={styles.removeplaylist}
                >
                  <Entypo name="minus" size={34} color="white" style={{marginLeft: '2%'}}/>
                  <Text style={styles.removename}>Remove from this playlist</Text>
                </Pressable>
              </View>
            </View>
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
    marginLeft: 20,
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
    backgroundColor:'black',
    height:'10%',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 30
  },


  textcontainer: {
    height: '60%',
    gap: 5,
    marginTop: 10,
    alignItems: 'center'
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
    height: '57%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '2%'
  },

  banner: {
    height: '75%',
    width: '90%',
    objectFit: 'contain',
    borderRadius: 20
  },

  songnameandliked:{
    backgroundColor: 'black',
    height: '9%',
    width: '87%',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginLeft: '6%'
    // gap: 15
  },

  modalsongnamecontainer:{
    // backgroundColor: 'red',
    width: '50%',

  },

  modalsongname:{
    color: 'white',
    fontSize: 30,
    marginTop: '-3%',
    // backgroundColor: 'blue'
    // paddingLeft: 30
  },

  artist:{
    color:'white',

  },

  liked:{
    height: '50%',
    width: '10%',
    objectFit: 'contain',
    // backgroundColor: 'red',
  },

  songprogress: {
    height: '5%',
    width: '87%',
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '6%',
    marginTop: '5%'
  },

  progressbar:{
    height: '10%',
    backgroundColor: 'white',
    marginTop: 5
  },

  progresscontainer:{
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    color:'white',
  },

  songcontrols:{
    height: '10%',
    width: '87%',
    // backgroundColor: 'blue',
    marginLeft: '6%',
    marginTop: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },

  cpimagecontainer:{
    height: '45%',
    // backgroundColor:'blue',
    flexDirection: 'row',
    alignItems: 'center',

  },

  cpmodal:{
    flex: 1,
    maxHeight: '25%',
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'blue',
    
    // marginBottom: 0,
    marginTop: '155%'
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

  shutter:{
    top: 0,
    justifyContent: 'center',
    marginTop: 0
  }






})

export default ActualPlaylist
// export { playTrack };
// export {play} 
// export {onPlaybackStatusUpdate}
// export {handlePlayPause}
// export {playNextTrack}
// export {playPreviousTrack}
// export {handleloop}
// export {options} 







// firstcontainer:{
//   flexDirection: 'row',
//   backgroundColor:'black',
//   height:'10%',
//   justifyContent: 'center',
//   width: '100%',
//   alignItems: 'center',
//   gap: 30
// },

// backbutton:{
//   height:'55%', 
//   width: '10%',
//   objectFit:'contain',
// },

// textcontainer: {
//   height: '60%',
//   gap: 5,
//   marginTop: 10,
//   alignItems: 'center'
// },

// options:{
//   height: '50%',
//   width: '10%',
//   objectFit: 'contain'
// },

// constant:{
//   color: 'white',
//   fontSize: 15,
//   fontWeight: 'bold'
// },

// library:{
//   color: 'white',
//   fontSize: 10
// },

// bannercontainer:{
//   height: '60%',
//   backgroundColor: 'black',
//   justifyContent: 'center',
//   alignItems: 'center'
// },

// banner: {
//   height: '70%',
//   width: '90%',
//   objectFit: 'contain',
//   // borderRadius: 20
// },

// songnameandliked:{
//   backgroundColor: 'black',
//   height: '9%',
//   width: '100%',
//   flexDirection: 'row',
//   justifyContent: 'space-around', 
//   alignItems: 'center', 
// },

// modalsongnamecontainer:{
//   // backgroundColor: 'red',
//   width: '50%',

// },

// modalsongname:{
//   color: 'white',
//   fontSize: 30,
//   marginTop: '-2%',
//   // paddingLeft: 30


// },

// liked:{
//   height: '50%',
//   width: '10%',
//   objectFit: 'contain',
//   // backgroundColor: 'red',
// },

// songprogress: {
//   height: '5%',
//   backgroundColor: 'black',
//   flexDirection: 'row',
//   justifyContent: 'space-between'
// },

// songcontrol: {
//   height: '18%',
//   backgroundColor: 'black',
//   flexDirection: 'row',
//   gap: 12,
//   justifyContent: 'center',
//   alignItems: 'center'

// },

// shuffle:{
//   height: '25%',
//   width: '10%',
//   objectFit: 'contain',
//   marginTop: '-15%'
// },

// prevnext:{
//   height: '30%',
//   width: '15%',
//   objectFit: 'contain',
//   marginTop: '-15%'

// },

// secondplaypause: {
//   height: '45%',
//   width: '20%',
//   objectFit: 'contain',
//   marginTop: '-15%'

// },

// repeat: {
//   height: '25%',
//   width: '10%',
//   objectFit: 'contain',
//   marginTop: '-15%'

// },

// progressbar:{
//   height: '20%',
//   backgroundColor: 'white'
// }


{/* <BottomModal
          visible={modalVisible}
          onHardwareBackPress={() => setModalVisible(false)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}>
            <ModalContent style = {{height: '100%', width: '100%', backgroundColor: 'black'}}>
            <SafeAreaView>
                <View style={styles.firstcontainer}>
                  <Image source={require('../assets/backbutton.png')} style={styles.backbutton} onPress={() => {setModalVisible(false)}}/>
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
                    <Text style={styles.starttime}>{formatTime(currentTime)}</Text>
                    <Text style={styles.endtime}>{formatTime(totalDuration)}</Text>
                  </View>
                </View>
                <View style={styles.songcontrol}>
                  <Pressable>
                    <Image source={require('../assets/shuffle.png')} style={styles.shuffle}/>
                  </Pressable>



                  <Pressable onPress={() => {playPreviousTrack}}>
                    <Image source={require('../assets/previoussong.png')} style={styles.prevnext}/>
                  </Pressable>




                  <Pressable onPress={() => {handlePlayPause}}> 
                    {isPlaying ? (
                      <Image source={require('../assets/pausesong.png')} style={styles.secondplaypause}/>
                    ) : (
                      <Pressable onPress={() => {handlePlayPause}}>
                        <Image source={require('../assets/playsong.png')} style={styles.secondplaypause}/>
                      </Pressable>
                    )}
                  </Pressable>



                  <Pressable onPress={() => {playNextTrack}}>
                    <Image source={require('../assets/nextsong.png')} style={styles.prevnext}/>
                  </Pressable>




                  <Pressable>
                    <Image source={require('../assets/repeat.png')} style={styles.repeat}/>
                  </Pressable>
                </View>
              </SafeAreaView>
            </ModalContent>
        </BottomModal> */}