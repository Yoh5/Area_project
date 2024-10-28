import React from 'react'
import { Text } from 'react-native'

const MyText = ({value, ...props}) => {
  return (
    <Text {...props}>
      { value }
    </Text>
  )
}

export default MyText
