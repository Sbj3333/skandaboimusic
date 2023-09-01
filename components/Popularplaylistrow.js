import React from 'react'
import { StyleSheet, View } from 'react-native'
import Popularplaylist from './Popularplaylist'

const Popularplaylistrow = () => {
  return (
    <View style={styles.popplyalistrow}>
        <Popularplaylist style={styles.item}/>
        <View style={styles.gap}/>
        <Popularplaylist style={styles.item}/>
    </View>
  )
}


const styles = StyleSheet.create({
    popplyalistrow:{
        height: 200,
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
        
    },

    gap:{
        width: '12%',
        // backgroundColor: 'blue'
    }
  
})
export default Popularplaylistrow