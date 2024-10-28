import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Interface from './Interface'
import SearchBar from '../../components/SearchBar'
import ServiceBox from "../../components/ServiceBox"
import MyText from '../../components/MyText'
import serviceInfos from "../../services/serviceInfos"
import { API_KEY } from "../../services/api"

const HomePage = ({navigation, route}) => {
  const userMail = route.params?.userMail
  const [services, setServices] = useState([])
  const [filterServices, setFilterServices] = useState([])

  useEffect(() => {
    fetch(`${API_KEY}/services`, {
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
      console.log("services", res)
    })
    .catch(error => {
      console.error('Erreur lors de la requête API:', error.message)
    })
  }, [])

  return (
    <Interface
      navigation={navigation}
      actualPage={"home"}
      userMail={userMail}
    >
      <View style={styles.homeBody}>
        <MyText
          style={styles.title}
          value={"My Services"}
        />
        <SearchBar
          originalList={services}
          setFilterList={setFilterServices}
          check={'name'}
          style={styles.searchInput}
          placeholder='Search service'
        />
        <View style={styles.buttonRow}>
          { filterServices.map(({id, name}) => {
            const serviceInfo = serviceInfos[id]
            if (serviceInfo && serviceInfo.name.toLowerCase() === name.toLowerCase())
              return <ServiceBox
                key={id}
                id={id}
                navigation={navigation}
                userMail={userMail}
                {...serviceInfos[id]}
              />
          }) }
        </View>
      </View>
    </Interface>
  )
}

const styles = StyleSheet.create({
  homeBody: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#505DD0',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 50,
  },
  searchInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginBottom: 30,
    width: 330,
    height: 40,
    marginLeft: 7,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
})

export default HomePage
