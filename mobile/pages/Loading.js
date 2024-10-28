import React, { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'

import MyText from '../components/MyText'

const Loading = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('welcome')
    }, 5000)
    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/areaa.png')}
          style={styles.icon}
        />
        <MyText
          style={styles.privacy}
          value={"En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité."}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505DD0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    width: 400,
    height: 400,
  },
  privacy : {
   textAlign: 'center',
   color: 'white',
   fontSize: 12,
   position: 'absolute',
   bottom: 0,
   left: 0,
   right: 0,
   marginBottom: 20,
  },
})

export default Loading
