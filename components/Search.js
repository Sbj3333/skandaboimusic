import React from 'react'
import { TextInput, View } from 'react-native'

const Search = () => {
  return (
    <View>
      <TextInput placeholder='Search' style={styles.searchbar}/>
      <View style={styles.songsuggestions}>
        
      </View>
    </View>
  )
}

export default Search