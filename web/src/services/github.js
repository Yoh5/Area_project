import axios from 'axios'
import send_service_infos from './add_service'

export function handle_github_login() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=Iv1.075b70f0387bf950&scope=user`
}

const Github = ({serviceId = 1}) => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
        axios.post('https://deciding-oyster-probably.ngrok-free.app/github/auth', {code})
        .then(res => {
            res.data.serviceId = serviceId
            get_more_service_infos(res.data)
        })
        .catch(error => {
            console.error('Error exchanging code for access token:', error.message)
        })
    }
}

async function get_more_service_infos({serviceId, accessToken, refreshToken}) {
    axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then(res => {
        const userMail = sessionStorage.getItem("email")
        send_service_infos({
            "email": userMail,
            "service_id": serviceId,
            "identifiant": res.data.login,
            "access_token": accessToken,
            "refresh_token": refreshToken
        })
        console.log("ok1")
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données utilisateur GitHub :', error.message)
        console.log("ok2")
    })
}

export default Github
