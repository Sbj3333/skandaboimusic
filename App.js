import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Login from './components/Login';
import { screenheight, screenwidth } from './components/Login'
import Song from './components/Song';
import Songplayer from './components/Songplayer';
import Playlist from './components/Playlist';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.statusbar} /> */}
      <StatusBar barStyle='dark-content'/>
      {/* <Login/> */}
      <Home/>
      {/* <Songplayer/> */}
      {/* <Playlist/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#946a6a',
    height: screenheight,
    width: screenwidth
  },
  statusbar:{
    height: '5%',
    backgroundColor: 'white'
  }
});
