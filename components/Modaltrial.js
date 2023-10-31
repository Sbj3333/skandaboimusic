// import React from 'react'
// import { BottomModal, ModalContent } from 'react-native-modals';
// import { View, Text, Image } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StyleSheet } from 'react-native';
// import { Pressable } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';


// const Modaltrial = () => {
//   const circleSize = 12;
//   return (
//     <BottomModal
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
//                   <Pressable onPress={shuffle}>
//                     <Entypo name="shuffle" size={24} color="white" />
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


//                   <Pressable onPress={loop}>
//                     <MaterialIcons name="repeat" size={28} color="white" />
//                     {/* <MaterialIcons name="repeat-one" size={28} color="white" /> */}
//                   </Pressable>
//                 </View>
                
//               </SafeAreaView>
//             </ModalContent>
//         </BottomModal>
        
//   )
// }

// const styles=StyleSheet.create({

//   firstcontainer:{
//     flexDirection: 'row',
//     backgroundColor:'black',
//     height:'10%',
//     justifyContent: 'center',
//     width: '100%',
//     alignItems: 'center',
//     gap: 30
//   },


//   textcontainer: {
//     height: '60%',
//     gap: 5,
//     marginTop: 10,
//     alignItems: 'center'
//   },


//   constant:{
//     color: 'white',
//     fontSize: 15,
//     fontWeight: 'bold'
//   },

//   library:{
//     color: 'white',
//     fontSize: 10
//   },

//   bannercontainer:{
//     height: '57%',
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // marginTop: '2%'
//   },

//   banner: {
//     height: '75%',
//     width: '90%',
//     objectFit: 'contain',
//     borderRadius: 20
//   },

//   songnameandliked:{
//     backgroundColor: 'black',
//     height: '9%',
//     width: '87%',
//     flexDirection: 'row',
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginLeft: '6%'
//     // gap: 15
//   },

//   modalsongnamecontainer:{
//     // backgroundColor: 'red',
//     width: '50%',

//   },

//   modalsongname:{
//     color: 'white',
//     fontSize: 30,
//     marginTop: '-3%',
//     // backgroundColor: 'blue'
//     // paddingLeft: 30
//   },

//   artist:{
//     color:'white',

//   },

//   liked:{
//     height: '50%',
//     width: '10%',
//     objectFit: 'contain',
//     // backgroundColor: 'red',
//   },

//   songprogress: {
//     height: '5%',
//     width: '87%',
//     backgroundColor: 'black',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginLeft: '6%',
//     marginTop: '5%'
//   },

//   progressbar:{
//     height: '10%',
//     backgroundColor: 'white',
//     marginTop: 5
//   },

//   progresscontainer:{
//     marginTop: 5,
//     flexDirection: 'row',
//     alignItems: 'center', 
//     justifyContent: 'space-between',
//     color:'white',
//   },

//   songcontrols:{
//     height: '10%',
//     width: '87%',
//     // backgroundColor: 'blue',
//     marginLeft: '6%',
//     marginTop: '8%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems:'center'
//   }



  


// })

// export default Modaltrial




// <View style={styles.songcontrol}>
//                   <Pressable>
//                     <Image source={require('../assets/shuffle.png')} style={styles.shuffle}/>
//                   </Pressable>



//                   <Pressable >
//                     <Image source={require('../assets/previoussong.png')} style={styles.prevnext}/>
//                   </Pressable>




//                   <Pressable > 
//                     <Image source={require('../assets/pausesong.png')} style={styles.secondplaypause}/>

//                     {/* {isPlaying ? (
//                       <Image source={require('../assets/pausesong.png')} style={styles.secondplaypause}/>
//                     ) : (
//                       <Pressable >
//                         <Image source={require('../assets/playsong.png')} style={styles.secondplaypause}/>
//                       </Pressable>
//                     )} */}
//                   </Pressable>



//                   <Pressable >
//                     <Image source={require('../assets/nextsong.png')} style={styles.prevnext}/>
//                   </Pressable>




//                   <Pressable>
//                     <Image source={require('../assets/repeat.png')} style={styles.repeat}/>
//                   </Pressable>
//                 </View>