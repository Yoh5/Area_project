import { WebView } from 'react-native-webview'

import send_service_infos from '../services/add_service'

const Trello = ({serviceId = 5, userMail, navigation}) => {

  const handle = (accessToken) => {
    fetch(`https://api.trello.com/1/members/me?key=aadcc429540b201ab9b49e8865e62087&token=${accessToken}`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log("user", navigation)
      send_service_infos({
        "email": userMail,
        "service_id": serviceId,
        "identifiant": res.id,
        "access_token": accessToken,
        "refresh_token": "",
      }, navigation)
    })
  }
  return (
    <WebView
      source={{ uri: 'https://trello.com/1/authorize?expiration=never&name=MyApp&scope=read,write&response_type=token&key=aadcc429540b201ab9b49e8865e62087&return_url=http://localhost:8081/applets/?service=5' }}
      onLoad={() => console.log('Page loaded')}
      onError={(error) => console.error('Error:', error)}
      onNavigationStateChange={(navState) => {
        const hashIndex = navState.url.indexOf('#token=')
        if (hashIndex !== -1) {
          const accessToken = navState.url.substring(hashIndex + 7)
          handle(accessToken)
        }
      }}
    />
  )
}

export default Trello
