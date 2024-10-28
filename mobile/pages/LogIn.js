import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import MyInput from '../components/MyInput'
import MyText from '../components/MyText'
import Button from '../components/Button'
import { API_KEY } from "../services/api"

const LogInPage = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const checkConnection = () => {
    fetch(`${API_KEY}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        mdp: password,
      }),
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      if (res.status === 200)
        navigation.navigate('home', {userMail: email})
      if (res.status === 201 || res.status === 400)
        alert(`${res.message}, ${res.status}`)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  return (
    <View style={styles.loginPage}>
      <MyText
        style={styles.title}
        value={"Login"}
      />
      <MyInput
        label={"Email Address"}
        setValue={setEmail}
        value={email}
      />
      <MyInput
        label={"Password"}
        setValue={setPassword}
        secureTextEntry={true}
        value={password}
      />
      <MyText
        style={styles.forgetpass}
        value={"Forgotten password ?"}
      />
      <Button
        value={"Login here"}
        style={styles.submitButton}
        onPress={checkConnection}
      />
      <MyText
        style={styles.signLabel}
        value={"Or sign in with"}
      />
      {/* <Button
        icon={{ name:"google", size:21, color:"#4285F4", marginRight:10}}
        value={"Continue with Google"}
        style={styles.buttonGoogleBox}
        textStyle={styles.buttonGoogleText}
      /> */}
      <Button
        value={"Or Register here"}
        style={styles.submitButton}
        onPress={() => navigation.navigate('signup')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#505DD0',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  forgetpass: {
    color: '#505DD0',
    fontSize: 12,
    textAlign: 'center',
  },
  
  signLabel: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonGoogleBox: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  buttonGoogleText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
  submitButton: {
    width: 200,
  },
})

export default LogInPage
