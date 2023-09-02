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

export default function App() {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={Home}/>
    //     <Stack.Screen name="Search" component={Search}/>
    //     <Stack.Screen name="Library" component={Library}/>
    //     <Stack.Screen name="Profile" component={Profile}/>
    //     <Stack.Screen name="Songplayer" component={Songplayer}/>
    //     <Stack.Screen name="Playlist" component={Playlist}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Home/>
  );
}


