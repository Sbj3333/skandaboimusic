import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import { Image } from "react-native";


const Tab = createBottomTabNavigator()


function BottomTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen
             name="Home" 
             component={Home} 
             options={{ 
                tabBarLabel: "Home", 
                headerShown: false, 
                tabBarLabelStyle:{color: 'white'},
                        tabBarIcon: ({focused}) =>
                focused ? (
                    <Entypo name="home" size={24} color={"black"}/>

                ) : (
                    <AntDesign name="home" size={24} color={"black"}/>
                )
                }}
            />

            {/* <Tab.Screen
             name="Home" 
             component={Home} 
             options={{ 
                tabBarLabel: "Home", 
                headerShown: false, 
                tabBarLabelStyle:{color: 'white'},
                        tabBarIcon: ({focused}) =>
                focused ? (
                    <Image source={}
                ) : (
                    
                )
                }}
            /> */}
        </Tab.Navigator>
    )
}