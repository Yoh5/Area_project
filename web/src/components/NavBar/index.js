import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import './styles.css'

import areaIcon from "../../assets/logo.png"
import titleIcon from "../../assets/title.png"

export default function NavBar () {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem("connected") === 'false') {
      sessionStorage.setItem("connected", false)
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="navBar">

      <a href={"/home"} alt={""}>
        <div className='titleBox'>
          <img src={areaIcon} className={"areaIcon"} alt={""}/>
          <img src={titleIcon} className={"titleIcon"} alt={""}/>
        </div>
      </a>

      <nav>
        <ul>
          <a href="/home" className='textLink home' alt=""><li>Home</li></a>
          <a href="/applets" className='textLink applet' alt=""><li>My Applets</li></a>
          <a href="/areas" className='textLink service' alt=""><li>My Areas</li></a>
          <a href={"/profil"} title={"profil"} alt="" className='picture'>
            <li>
              { sessionStorage.getItem("picture") ?
                <img src={sessionStorage.getItem("picture")} alt="img" /> :
                <img src="favicon.ico" alt="img" />
              }
            </li>
          </a>
        </ul>
      </nav>

    </div>
  )
}
