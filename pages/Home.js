import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={styles.blueBg}>
        <Text>REAct</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    blueBg: {
        flex: 1,
        backgroundColor: '#00ccf9'
    },
    
})