import React from 'react'
import { Text, View } from 'react-native'
import Playlist from './Playlist'

const Library = () => {
  return (
    <View>
      <Text style={styles.text}>Your Library</Text>
      <Playlist/>
    </View>
  )
}

export default Library