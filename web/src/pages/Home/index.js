import React, { useEffect, useState } from 'react'
import './styles.css'

import NavBar from "../../components/NavBar"
import SearchBar from "../../components/SearchBar"
import ServiceBox from "../../components/ServiceBox"
import serviceInfos from "../../services/serviceInfos"

const HomePage = () => {

  const [services, setServices] = useState([])
  const [filterServices, setFilterServices] = useState([])

  useEffect(() => {
    fetch('https://deciding-oyster-probably.ngrok-free.app/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      setServices(res)
      setFilterServices(res)
    })
    .catch(error => {
      console.log('Erreur lors de la requête API:', error.message)
    })
  }, [])

  return (
    <div className="homePage">
      <NavBar/>
      <div className="principalView">
        <h1>Start using our Services</h1>
        <SearchBar
          check={"name"}
          originalList={services}
          setFilter={setFilterServices}
        />
        <div className="box-container">
          { filterServices.map(({id, name}) => (
            serviceInfos[id].name === name &&
            <ServiceBox
              key={id}
              id={id}
              name={name}
              {...serviceInfos[id]}
            />
          )) }
        </div>
      </div>
    </div>
  )
}

export default HomePage
