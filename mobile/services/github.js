import axios from 'axios'
import { WebView } from 'react-native-webview'
import queryString from 'query-string'

import send_service_infos from '../services/add_service'

const GitHub = ({serviceId = 1, userMail, navigation}) => {

    const handle = (code) => {
        axios.post('https://deciding-oyster-probably.ngrok-free.app/github/auth', {code})
        .then(res => {
            get_more_service_infos(res.data)
        })
        .catch(error => {
            console.error('Error exchanging code for access token:', error.message)
        })
    }

    function get_more_service_infos({accessToken, refreshToken}) {
        axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(res => {
            send_service_infos({
                "email": userMail,
                "service_id": serviceId,
                "identifiant": res.data.login,
                "access_token": accessToken,
                "refresh_token": refreshToken,
            }, navigation)
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données utilisateur GitHub :', error.message)
        })
    }

    return (
        <WebView
            source={{ uri: 'https://github.com/login/oauth/authorize?client_id=Iv1.075b70f0387bf950&scope=user' }}
            onLoad={() => console.log('Page loaded')}
            onError={(error) => console.error('Error:', error)}
            onNavigationStateChange={(navState) => {
                const code = queryString.parseUrl(navState.url).query.code
                if (code) handle(code)
            }}
        />
    )
}

export default GitHub
