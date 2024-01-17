// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList } from 'react-native';
// import RNFS from 'react-native-fs';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Platform } from 'react-native';
// const isAndroid = Platform.OS === 'android';
// const isIOS = Platform.OS === 'ios';

// const AudioList = () => {
//   const [audioFiles, setAudioFiles] = useState([]);
//   const listAudioFiles = async () => {
//     try {
//       let downloadsPath = isAndroid
//         ? RNFS.DownloadDirectoryPath
//         : isIOS
//         ? RNFS.DocumentDirectoryPath
//         : '';

//       if (!downloadsPath) {
//         console.error('Unsupported platform.');
//         return;
//       }

//       const files = await RNFS.readdir(downloadsPath);

//       const audioFiles = files.filter(file => {
//         return file.endsWith('.mp3') || file.endsWith('.wav');
//       });

//       setAudioFiles(audioFiles);
//       console.log(audioFiles);
//     } catch (error) {
//       console.error('Error listing audio files:', error);
//     }
//   };

//   useEffect(() => {
//     listAudioFiles();
//   }, []);


//   const renderItem = ({item}) =>{

//     return(
//       <View>
//         <Pressable onPress={play}>
//             <View style={styles.songcontainer}>
//                 <Image source={require('../assets/music.jpeg')} style={styles.songphoto}/>
//                 <View style={styles.songnamecontainer}>
//                   <Text numberOfLines={1} style={styles.songname}>{item.track.name}</Text>
//                   <Text numberOfLines={1} style={styles.artistname}>{item.track.artists[0].name}</Text>
//                 </View>
//                 {/* <Image source={require('../assets/heartopen.png')} style={styles.heart}/> */}
//                 {/* <Image source={require('../assets/options_icon.png')} style={styles.option}/> */}
//                 {/* <AntDesign name="hearto" size={22} color="white" style={styles.heart} /> */}
//                 <AntDesign name="heart" size={22} color="red" style={styles.heart} />
                
//                 <SimpleLineIcons name="options-vertical" size={24} color="white" style={styles.option} onPress={options(true)}/>
//             </View>
//           </Pressable>
//       </View>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <Pressable onPress={() => navigation.goBack()}>
//             <Ionicons name='arrow-back' size={30} color="white" style={styles.pagebackbutton}/>
//           </Pressable>
//           <Text numberOfLines={1} style={styles.text}>Local Files</Text>
//           <Pressable 
//             onPress={playTrack}
//           >
//             {isPlaying ?(
//               <Image style={styles.playpause} source={require('../assets/pausesong.png')}/>

//             ):(
//               <Image style={styles.playpause} source={require('../assets/playsong.png')}/>
//             )}
//           </Pressable>
//         </View>
        
//         <FlatList 
//           data = {actualplaylists}
//           renderItem={renderItem}
//           numColumns = {1}
//           />
//         <View style={styles.container}/>
//         {currentTrack && (
//           <Pressable style={styles.minisong} 
//             onPress={() => setModalVisible(!modalVisible)}
//             >
//             <View style={styles.minisongcontainer}>
//               <Image 
//                 source={{uri: currentTrack?.track?.albums?.images[0].url}} 
//                 // source={require('../assets/music.jpeg')}
//                 style={styles.minisongcover}/>
//               <View style={styles.minitextcontainer}>
//                 <Text style={styles.minisongname}>
//                   {currentTrack?.track?.name}
//                   {/* Song name */}
//                 </Text>
//                 <Text style={styles.miniartistname}>
//                   {currentTrack?.track?.artists[0].name}
//                   {/* artist name */}
//                 </Text>
//               </View>
//               <Image source={require('../assets/heartopen.png')} style={styles.miniheart}/>
//               <Image source={require('../assets/pause.png')} style={styles.minipause} />
//             </View>
//           </Pressable>
//         )}

//         <BottomModal
//           visible={modalVisible}
//         //   onHardwareBackPress={() => setModalVisible(false)}
//           swipeDirection={["up", "down"]}
//           swipeThreshold={200}>
//             <ModalContent style = {{height: '100%', width: '100%', backgroundColor: 'black'}}>
//             <SafeAreaView>
//                 <View style={styles.firstcontainer}>
//                   <Pressable onPress={() => {setModalVisible(false)}}>
//                     <AntDesign name="caretdown" size={24} color="white" style={{marginRight:5, marginBottom:5}}/>
//                   </Pressable>

//                   <View style={styles.textcontainer}>
//                     <Text style={styles.constant}>Playing songs from your library</Text>
//                     <Text style={styles.library}>Liked songs</Text>
//                   </View>

//                   <Entypo name="dots-three-vertical" size={24} color="white" style={{marginLeft:5}}/>
//                 </View>


//                 <View style={styles.bannercontainer}>
//                   <Image 
//                     source={{uri: currentTrack?.track?.album?.images[0].url}} 
//                     // source={require('../assets/music.jpeg')}
//                     style={styles.banner}/>
//                 </View>


//                 <View style={styles.songnameandliked}>
//                   <View style={styles.modalsongnamecontainer}>
//                     <Text style={styles.modalsongname}>KGF</Text>
//                     <Text style={styles.artist}>Ravi Basrur</Text>
//                   </View>
//                   <AntDesign name="hearto" size={22} color="white" style={styles.heart} />
//                   {/* <AntDesign name="heart" size={22} color="red" style={styles.heart} /> */}

//                 </View>


//                 <View style={styles.songprogress}>
//                   <View style={[styles.progressbar, {width: `${progress*100}%`}]}/>
//                   <View style={[
//                     {
//                       position: 'absolute', 
//                       top: 3,
//                       width: circleSize,
//                       height: circleSize,
//                       borderRadius: circleSize / 2,
//                       backgroundColor: 'white'
//                     },
//                     {
//                       left: `${progress*100}%`, 
//                       marginLeft: -circleSize / 2,
//                     }
//                   ]}
//                   />

//                   <View 
//                     style={styles.progresscontainer}>
//                     <Text style={{color:'white'}}>{formatTime(currentTime)}</Text>
//                     <Text style={{color:'white'}}>{formatTime(totalDuration)}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.songcontrols}>
//                   <Pressable 
//                     onPress={handleshuffle}
//                   >
//                     {shufflestatus? (
//                       <Entypo name="shuffle" size={24} color="white" />
//                     ):(
//                       <Entypo name="shuffle" size={24} color="#154b9d" />
//                     )}
//                   </Pressable>


//                   <Pressable onPress={playPreviousTrack}>
//                     <AntDesign name="stepbackward" size={24} color="white" />
//                   </Pressable>


//                   <Pressable onPress={() => {handlePlayPause}}> 
//                     {isPlaying ? (
//                       // <Image source={require('../assets/pausesong.png')} style={styles.secondplaypause}/>
//                       <AntDesign name="pausecircle" size={36} color="white" />

//                     ) : (
//                       <Pressable onPress={() => {handlePlayPause}}>
//                         {/* <Image source={require('../assets/playsong.png')} style={styles.secondplaypause}/> */}
//                         <AntDesign name="play" size={36} color="white" />

//                       </Pressable>
//                     )}
//                   </Pressable>

//                   {/* <Pressable>
//                     <AntDesign name="pausecircle" size={36} color="white" />
//                     <AntDesign name="play" size={36} color="white" />
//                   </Pressable> */}


//                   <Pressable onPress={playNextTrack}>
//                     <AntDesign name="stepforward" size={24} color="white" />
//                   </Pressable>


//                   <Pressable 
//                     onPress={handleloop}
//                   >
//                     {loopstatus ?(
//                       <MaterialIcons name="repeat" size={28} color="white" />

//                     ):(
//                       <MaterialIcons name="repeat-one" size={28} color="#154b9d" />
//                     )}

//                   </Pressable>
//                 </View>
                
//               </SafeAreaView>
//             </ModalContent>
//         </BottomModal>
        
//     </SafeAreaView>
//   );
// };

// export default AudioList;
