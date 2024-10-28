import send_service_infos from './add_service'

function init() {
    var SpotifyWebApi = require('spotify-web-api-node')
    var spotifyApi = new SpotifyWebApi({
        clientId: '6ca8b5e6ea6945ce9a12dcbf7ed30fc0',
        clientSecret: 'cff2feb9040b4320a8716ff6b0c11b10',
        redirectUri: `http://localhost:8081/applets/?service=4`
    })
    return spotifyApi
}

export function handle_spotify_login() {
    const spotifyApi = init()
    const authorizeURL = spotifyApi.createAuthorizeURL([
        'user-library-read',
        'playlist-modify-public',
        'playlist-modify-private'
    ], 'STATE')
    window.location.href = authorizeURL
}
// handle_spotify_login()
const Spotify = ({serviceId = 4}) => {
    const code = URLSearchParams(window.location.search).get('code')
    const spotifyApi = init()
    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        const {access_token, refresh_token} = data.body
        const userMail = sessionStorage.getItem("email")
        send_service_infos({
            "email": userMail,
            "service_id": serviceId,
            "identifiant": 0,
            "access_token": access_token,
            "refresh_token": refresh_token
        })
        spotifyApi.setAccessToken(access_token)
        spotifyApi.setRefreshToken(refresh_token)
    })
    .catch(error => {
        console.error('Error getting access token:', error)
    })
}

export default Spotify
