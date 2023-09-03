import Home from "./Home";
import Search from "./Search";
import Library from "./Library";
import Profile from "./Profile";
import Login from './Login';
import Songplayer from './Songplayer';
import Playlist from "./Playlist";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Image source={require('../assets/home_icon.png')}/>
                        ) : (
                            <Image source={require('../assets/home_icon.png')}/>
                        )

                }}
            />
            <Tab.Screen 
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Image source={require('../assets/search_icon.png')}/>
                        ) : (
                            <Image source={require('../assets/search_icon.png')}/>
                        )

                }}
            />
            <Tab.Screen 
                name="Library"
                component={Library}
                options={{
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Image source={require('../assets/music_icon.png')}/>
                        ) : (
                            <Image source={require('../assets/music_icon.png')}/>
                        )

                }}
            />
            <Tab.Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Image source={require('../assets/profile_icon.png')}/>
                        ) : (
                            <Image source={require('../assets/profile_icon.png')}/>
                        )

                }}
            />
        </Tab.Navigator>
    )
}


const Stack = createNativeStackNavigator();
function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Main" component={BottomTabs}/>
                <Stack.Screen name="Songplayer" component={Songplayer}/>
                <Stack.Screen name="Playlist" component={Playlist}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation