import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { CheckBox } from 'react-native-elements'

import MyText from '../components/MyText'
import MyInput from '../components/MyInput'
import Button from '../components/Button'
import { API_KEY } from "../services/api"

const SignUp = ({ navigation }) => {
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  })

  const handleRegister = () => {
    const {name, email, password, confirmPassword, isChecked} = formData
    setError(false);
    if (name === '')
      setError('Please enter your name');
    else if (email === '')
      setError('Please enter your email')
    else if (password === '')
      setError('Please enter your password')
    else if (confirmPassword === '')
      setError('Please confirm your password')
    else if (password !== confirmPassword)
      setError('Passwords do not match')
    else if (!isChecked)
      setError('You need to accept our Policy and Terms of Use')
    else
      checkConnection()
  }
  const checkConnection = () => {
    const {name, email, password} = formData
    fetch(`${API_KEY}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: name,
        mdp: password,
      }),
    })
    .then(res => {
      navigation.navigate('token', { email: email })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  return (
    <View style={styles.SignUpPage}>

      <MyText
        style={styles.registerTitle}
        value={"Registration"}
      />
      <MyInput
        label={"Username"}
        name={'name'}
        onChangeText={text => setFormData(
          {...formData, 'name': text}
        )}
      />
      <MyInput
        label={'Email Address'}
        name={'email'}
        onChangeText={text => setFormData(
          {...formData, 'email': text}
        )}
      />
      <MyInput
        label={'Password'}
        name={'password'}
        secureTextEntry
        onChangeText={text => setFormData(
          {...formData, 'password': text}
        )}
      />
      <MyInput
        label={'Confirm Password'}
        name={'confirmPassword'}
        secureTextEntry
        onChangeText={text => setFormData(
          {...formData, 'confirmPassword': text}
        )}
      />
      <CheckBox
        title={"I accept the Terms of Use & Privacy Policy"}
        checked={formData.isChecked}
        onPress={() => setFormData( {...formData,
          isChecked: !formData.isChecked}
        )}
      />
      { error && <MyText
        style={styles.error_message}
        value={error}
      /> }
      <Button
        onPress={handleRegister}
        value={"Register Now"}
        style={{ width: 350 }}
      />
      <Button
        onPress={() => navigation.navigate('login')}
        value={"Already have an account? Sign in"}
        style={{ backgroundColor: 'white' }}
        textStyle={{ color: '#505DD0' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  SignUpPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  registerTitle: {
    color: '#505DD0',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  error_message: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 10,
  },
})

export default SignUp
