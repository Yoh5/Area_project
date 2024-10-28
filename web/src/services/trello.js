import send_service_infos from './add_service'

export function handle_trello_login() {
  const YOUR_CLIENT_ID = 'aadcc429540b201ab9b49e8865e62087';
  window.location.href = `https://trello.com/1/authorize?expiration=never&name=MyApp&scope=read,write&response_type=token&key=${YOUR_CLIENT_ID}&return_url=http://localhost:8081/applets/?service=5`
}

const Trello = ({serviceId = 5}) => {
  const accessToken = new URLSearchParams(window.location.hash).get('#token')
  if (accessToken) {
    fetch(`https://api.trello.com/1/members/me?key=aadcc429540b201ab9b49e8865e62087&token=${accessToken}`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      const userMail = sessionStorage.getItem("email")
      send_service_infos({
          "email": userMail,
          "service_id": serviceId,
          "identifiant": res.id,
          "access_token": accessToken,
          "refresh_token": ""
      })
    })
  }
}

export default Trello
