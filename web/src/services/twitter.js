import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import OAuthManager from 'react-native-oauth'

const TwitterApp = () => {
  const [refreshToken, setRefreshToken] = useState('')
  const manager = new OAuthManager('yourAppName')

  manager.configure({
    twitter: {
      consumer_key: 'YOUR_TWITTER_CLIENT_ID',
      consumer_secret: 'YOUR_TWITTER_CLIENT_SECRET',
    },
  })

  const handleTwitterLogin = () => {
    manager.authorize('twitter')
    .then(res => {
      setRefreshToken(res.response.credentials.refreshToken)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <View>
      <Button title="Login with Twitter" onPress={handleTwitterLogin} />
      <Text>Refresh Token: {refreshToken}</Text>
    </View>
  )
}

export default TwitterApp
