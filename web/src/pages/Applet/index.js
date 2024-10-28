import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from "react-router-dom"
import './styles.css'

import NavBar from "../../components/NavBar"
import SearchBar from "../../components/SearchBar"
import Button from '../../components/Button'
import Box from "../../components/AreaBox"
import serviceInfos from "../../services/serviceInfos"

import Github from '../../services/github'
import Trello from '../../services/trello'

export default function AppletPage ({navigation}) {
  const [url] = useSearchParams()
  const serviceId = parseInt(url.get('service'))
  const userMail = sessionStorage.getItem("email")

  const [alreadyLogged, setAlreadyLogged] = useState(false)
  const [areas, setAreas] = useState([])
  const [filterAreas, setFilterAreas] = useState([])

  const get_connected = useCallback(() => {
    fetch(`https://deciding-oyster-probably.ngrok-free.app/account/isco`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": userMail,
        "service_id": serviceId
      })
    })
    .then(res => {
      if (res.status === 400) {
        console.log("User doesn't exist")
        navigation.navigate('/login')
      }
      setAlreadyLogged(res.status === 200)
    })
    .catch(error => {
      console.log("Erreur: ", error)
    })
  }, [navigation, serviceId, userMail])

  const get_areas = useCallback(() => {
    fetch(`https://deciding-oyster-probably.ngrok-free.app/act_react/${serviceId ? serviceId : ""}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": userMail
      })
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log("res", res)
      setAreas(res)
      setFilterAreas(res)
    })
    .catch(error => {
      console.log('Erreur lors de la requête API:', error.message)
    })
  }, [serviceId, userMail])

  useEffect(() => {
    if (serviceId)
      get_connected()
    get_areas()
  }, [serviceId, get_connected, get_areas])

  const IfConnected = () => {
    console.log("serviceId", serviceId)
    return ( alreadyLogged ?
      <p className={"connectedMessage"}>
        Compte {serviceName} deja connecte.
      </p>
      :
      <Button
        onClick={serviceInfos[serviceId].handle_connect}
        buttonStyle={"connectButton"}
      >
        <span className={"buttonText subscribeText"}>
          Se connecter a {serviceName}
        </span>
      </Button>
    )
  }

  const AreaBox = (props) => {
    const { id, clic } = props
    return ( clic ?
      <label
        key={id}
        className="areaLabel"
        htmlFor={`enabled${id}`}
      ><Box {...props} /></label>
      :
      <Box {...props} />
    )
  }

  let serviceName = "Applets"
  if (serviceId)
    serviceName = serviceInfos[serviceId].name

  return (
    <div className="appletPage">
      { serviceId === '1' && <Github/> }
      { serviceId === '5' && <Trello/> }
      <NavBar/>
      <div className="principalView">
        <h1>{ serviceName }</h1>
        <SearchBar
          check={"descr"}
          originalList={areas}
          setFilter={setFilterAreas}
        />
        { serviceId ? <IfConnected/> : null }

        <div className="box-container">
          { filterAreas.map(({id, ...infos}) => (
            <AreaBox
              key={id}
              id={id}
              {...infos}
            />
          )) }
        </div>
      </div>
    </div>
  )
}
