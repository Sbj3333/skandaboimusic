import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Login from './components/Login';
import { screenheight, screenwidth } from './components/Login'
import Song from './components/Song';
import Songplayer from './components/Songplayer';
import Playlist from './components/Playlist';
import Search from './components/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './components/Profile';
import Library from './components/Library';
import Miniplaylist from './components/Miniplaylist';
import Navigation from './components/StackNavigator';
import { PlayerContext } from './PlayerContext'
import { ModalPortal} from 'react-native-modals'

export default function App() {
  return (
    <>
      <PlayerContext>
        <Navigation/>
        <ModalPortal/>
      </PlayerContext>
    </>
  );
}


