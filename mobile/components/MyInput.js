import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import MyText from '../components/MyText'

const MyInput = ({ label, setValue, style, ...props }) => {

  function handleTextChange(text) {
    setValue(text)
  }
  return (
    <View style={styles.inputBox}>
      { label && <MyText
          style={styles.label}
          value={label}
        />
      }
      <TextInput
        style={[styles.inputBar, style]}
        onChangeText={handleTextChange}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    width: 350,
    marginBottom: 15,
  },
  inputBar: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    width: '100%',
    height: 40,
  },
  label: {
    color: '#505DD0',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: 'bold',
  },
})

export default MyInput
