import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import Button from '../components/Button'

const WelcomePage = ({navigation}) => {
  return (
    <View style={styles.welcomePage}>
      <Image
        source={require('../assets/AREA1.png')}
        style={styles.image}
      />
      <Image
        source={require('../assets/business.png')}
        style={styles.image}
      />
      <Button
        value={"Commencez"}
        style={styles.startButton}
        onPress={() => navigation.navigate('login')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  welcomePage: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 18,
  },
  startButton: {
    borderRadius: 6,
    paddingHorizontal: 24,
    marginTop: 66,
  },
})

export default WelcomePage
