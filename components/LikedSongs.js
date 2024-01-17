// import AsyncStorage from '@react-native-async-storage/async-storage'
// import React from 'react'
// import { View } from 'react-native'




// const getlikedsongs = async() =>{
//   const accessToken = await AsyncStorage.getItem("token");
//   try{
//     const response = await fetch("https://api.spotify.com/v1/me/tracks", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,

//       }
//     });
//     const data = await response.json();
//   }catch(err){
//     console.log(err.message);

//   }
// }


// const LikedSongs = () => {

//   const renderItem = ({item}) =>{
    

//     return(
//       <View>
//         <Pressable onPress={play}>
//           <View style={styles.songcontainer}>
//               {item.track.album.images[0]?.url ?(
//                 <Image source={{uri: item.track.album.images[0].url}} style={styles.songphoto}/>
//               ):(
//                 <Image source={require('../assets/music.jpeg')} style={styles.songphoto}/>

//               )}
//               <View style={styles.songnamecontainer}>
//                 <Text numberOfLines={1} style={styles.songname}>{item.track.name}</Text>
//                 <Text numberOfLines={1} style={styles.artistname}>{item.track.artists[0].name}</Text>
//               </View>
//               {/* <Image source={require('../assets/heartopen.png')} style={styles.heart}/> */}
//               {/* <Image source={require('../assets/options_icon.png')} style={styles.option}/> */}
//               {/* <AntDesign name="hearto" size={22} color="white" style={styles.heart} /> */}
//               <AntDesign name="heart" size={22} color="red" style={styles.heart} />
              
//               <SimpleLineIcons name="options-vertical" size={24} color="white" style={styles.option} onPress={options(true)}/>
//           </View>
//         </Pressable>


        
//         <BottomModal
//         visible={CPmodalVisible}
//         swipeDirection={["up", "down"]}
//         swipeThreshold={200}>
//         <ModalContent style = {{height: '20%', width: '100%', backgroundColor: 'black'}}>
//           <Entypo name="minus" size={24} color="gray" />
//           <View style={styles.cpimagecontainer}>
//             <Image 
//               source={{uri: item.track.album.images[0].url}}
//               style={styles.cpimage}/>
//             <View style={styles.cptextcontainer}>
//                 <Text numberOfLines={1} style={styles.songname}>{item.track.name}</Text>
//                 <Text numberOfLines={1} style={styles.artistname}>{item.track.artists[0].name}</Text>
//             </View>
//           </View>

//           <View style={styles.optioncontainer}>
//             <View style={styles.addtoplaylist}>
//               <Pressable onPress={handleadd(true, songuri)}>
//                 <AntDesign name="plus" size={24} color="white" />
//                 <Text style={styles.addname}>Add to Playlist</Text>
//               </Pressable>
//             </View>

//             <View style={styles.removeplaylist}>
//               <Pressable onPress={handleremove(songuri)}>
//                 <Entypo name="minus" size={24} color="gray" />
//                 <Text style={styles.removename}>Remove from this playlist</Text>
//               </Pressable>
//             </View>
//           </View>
//         </ModalContent>
//         </BottomModal>
      
//       </View>


//     )
//   }
//   return (
//     <View>
      
//     </View>
//   )
// }

// export default LikedSongs
