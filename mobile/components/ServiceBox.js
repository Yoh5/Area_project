import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MyText from '../components/MyText'

const ServiceBox = ({ id, name, image, boxColor, iconColor, userMail, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => navigation.navigate('applets', {
        serviceId: id,
        userMail: userMail,
      }) }
    >
      <View style={[styles.iconContainer, {backgroundColor: boxColor}]}>
        <Icon
          name={image}
          size={70}
          style={[styles.icon, {color: iconColor}]}
        />
        <MyText
          style={{color: iconColor}}
          value={name}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 150,
    marginVertical: 5,
    marginHorizontal: 2,
    backgroundColor: 'white',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    borderRadius: 20,
    backgroundColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  icon: {
    height: 70,
  },
})

export default ServiceBox
