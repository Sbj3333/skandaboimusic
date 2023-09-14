import React from 'react'
import { Text, View } from 'react-native'

const Profile = () => {

  const [userProfile, setUserProfile] = useState(null);

  const getProfile = async () => {
    // console.log("hi");
    const accessToken = await AsyncStorage.getItem("token");
    // console.log("accesssssed token", accessToken);
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (error) {
      console.log("error my friend", error.message);
    }
  };


  useEffect(() => {
    getProfile();
  }, []);
  const renderItem = ({item}) =>{
    return(
        <Pressable style={}>
            <Image style={} source={{uri: item[0].images[0].url}}/>
            <View>
                <Text numberOfLines={2} style={styles.playlistname}>{item.name}</Text>
            </View>

        </Pressable>
    )
}

  return (
    <View>
        <Text>hello</Text>
    </View>
  )
}

export default Profile