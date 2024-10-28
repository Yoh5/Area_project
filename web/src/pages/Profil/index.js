import React, {useState, useEffect} from 'react'
import Button from '../../components/Button'
import { useNavigate } from "react-router-dom"
import './styles.css'

import NavBar from "../../components/NavBar"

export default function ProfilPage () {

  const navigate = useNavigate()
  const [connected, setConnected] = useState(sessionStorage.getItem("connected") === 'true')

  useEffect(() => {
    if (!connected) {
      sessionStorage.setItem("connected", false)
      navigate('/login')
    }
  }, [navigate, connected])

  const user = {
    name: sessionStorage.getItem('username'),
    picture: sessionStorage.getItem('picture'),
  }

  return (
    <div className="profilPage">
      <NavBar/>
      <div className="principalView">
        <img src={user.picture} alt={""}/>
        <div>
          <label>Nom: </label>
          <span>{user.name}</span>
        </div>
        <Button
          onClick={() => { setConnected(false) }}
          buttonStyle={"disconnectButton"}
        >
          <span className={"buttonText disconnectText"}>
            Se deconnecter
          </span>
        </Button>
      </div>
    </div>
  )
}
