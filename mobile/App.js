import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Loading from './pages/Loading'
import Welcome from './pages/Welcome'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Token from './pages/Token'

import Home from './pages/Interface/Home'
import Applets from './pages/Interface/Applets'
import MyAreas from './pages/Interface/MyAreas'

const App = () => {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="/" component={Loading} />
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="login" component={LogIn} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="token" component={Token} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="applets" component={Applets} />
        <Stack.Screen name="areas" component={MyAreas} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
