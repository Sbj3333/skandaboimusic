import Home from "./Home";
import Search from "./Search";
import Library from "./Library";
import Profile from "./Profile";
import Login from './Login';
import Playlist from "./Playlist";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ActualPlaylist from "./ActualPlaylist";
import Modaltrial from "./Modaltrial";
import Selectplaylist from "./Selectplaylist"

const Tab = createBottomTabNavigator();

function BottomTabs(){
    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle:{
                backgroundColor:"rgba(0,0,0,0.85)",
                position: "absolute",
                bottom:0,
                // top: 0,
                left:0,
                right:0,
                shadowOpacity:4,
                shadowRadius:4,
                elevation:50,
                shadowOffset:{
                    width:0,
                    height:10
                },
                borderTopWidth:0 
            }
        }}>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Image source={require('../assets/home_icon.png')} style={styles.bottomtabimages}/>
                        ) : (
                            <Image source={require('../assets/home_icon.png')} style={styles.bottomtabimages}/>
                        )

                }}
            />
            <Tab.Screen 
                name="Search"
                component={Search}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Image source={require('../assets/search_icon.png')} style={styles.bottomtabimages}/>
                        ) : (
                            <Image source={require('../assets/search_icon.png')} style={styles.bottomtabimages}/>
                        )

                }}
            />
            <Tab.Screen 
                name="Library"
                component={Library}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Image source={require('../assets/music_icon.png')} style={styles.bottomtabimages}/>
                        ) : (
                            <Image source={require('../assets/music_icon.png')} style={styles.bottomtabimages}/>
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

                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                {/* <Stack.Screen name="modal" component={Modaltrial} options={{headerShown: false}}/> */}
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
                {/* <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/> */}
                <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
                <Stack.Screen name="Library" component={Library} options={{headerShown:false}}/>
                <Stack.Screen name="IndividualPlaylist" component={ActualPlaylist} options={{headerShown: false}}/>
                <Stack.Screen name="Selectplaylist" component={Selectplaylist} options={{headerShown: false}}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    bottomtabimages:{
        height: 30,
        width: 30,
        objectFit: 'contain'
    }
})
export default Navigation