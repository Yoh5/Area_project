import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Button from '../components/Button'
import MyText from '../components/MyText'
import MyInput from '../components/MyInput'
import { API_KEY } from "../services/api"

const Token = ({navigation, route}) => {
    const [token, setToken] = useState('')
    const [error, setError] = useState(false)
    const {email} = route.params ?? ""

    const checkToken = () => {
      fetch(`${API_KEY}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          the_token: token,
        }),
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        setError(false)
        if (res.status === 200)
          navigation.navigate('login')
        if (res.status === 201)
          setError('Invalid token')
      })
      .catch(error => {
        setError("Erreur: check the server")
      })
    }

    return (
      <View style={styles.tokenPage}>
        <MyInput
          setValue={setToken}
          placeholder='Enter token'
        />
        { error && <MyText
          style={styles.error_message}
          value={error}
        /> }
        <Button
          onPress={checkToken}
          value={"Send"}
          style={styles.sendTokenButton}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    tokenPage: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#fff',
    },
    sendTokenButton: {
      paddingHorizontal: 50,
      marginTop: 30,
      borderRadius: 20,
    },
    error_message: {
      textAlign: 'center',
      color: 'red',
      marginVertical: 10,
    },
})

export default Token
