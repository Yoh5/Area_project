import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import MyText from '../components/MyText'

const Button = ({ style, textStyle, value, icon, ...props }) => {
  return (
    <Pressable
      style={[styles.buttonBox, style]}
      {...props}
    >
      { icon && <Icon {...icon} /> }
      <MyText
        style={[styles.buttonText, textStyle]}
        value={value}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    backgroundColor: '#505DD0',
    height: 42,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
})

export default Button
