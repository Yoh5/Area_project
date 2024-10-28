import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'

import Interface from './Interface'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import MyText from '../../components/MyText'
import Area from '../../components/AreaBox'
import serviceInfos from "../../services/serviceInfos"
import { API_KEY } from "../../services/api"

const AppletPage = ({navigation, route}) => {
  const serviceId = route.params?.serviceId
  const userMail = route.params?.userMail
  const [areas, setAreas] = useState([])
  const [filterAreas, setFilterAreas] = useState([])
  const [title, setTitle] = useState('Applets')
  const [connexionBox, setConnexionBox] = useState(false)
  const [alreadyLogged, setAlreadyLogged] = useState(false)

  useEffect(() => {
    fetch(`${API_KEY}/act_react/${serviceId ?? ""}`, {
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
      if (Array.isArray(res))
        setAreas(res)
    })
    .catch(error => {
      console.error('Erreur lors de la requête API:', error.message)
    })
  }, [serviceId, userMail])

  const AreaBox = (infos) => {
    const {id, serv_act_id, serv_react_id, clic} = infos
    const secondId = (serviceId == serv_act_id) ? serv_react_id : serv_act_id
    return (
      clic ?
        <Pressable
          key={id}
          style={styles.areaLabel}
          htmlFor={`enabled${id}`}>
          <Area 
            userMail={userMail}
            {...infos}
          />
        </Pressable>

      : alreadyLogged ?
        <Pressable
          href={`/applets/?service=${secondId}`}>
          <Area
            userMail={userMail}
            hidden {...infos}
          />
        </Pressable>
      :
        <Area
          userMail={userMail}
          hidden {...infos}
        />
    )
  }

  const Page = () => {
    let serviceName
    let authBox
    function getConnected() {
      fetch(`${API_KEY}/account/isco`, {
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
        if (res.status == 400) {
          console.error("User doesn't exist")
          navigation.navigate('login', {userMail: userMail})
        }
        setAlreadyLogged(res.status === 200)
      })
      .catch(error => {
        console.error("Erreur: ", error)
      })
    }
    if (serviceId) {
      serviceName = serviceInfos[serviceId].name
      authBox = serviceInfos[serviceId].AuthView
      setTitle(serviceName)
      getConnected()
    }
    return (
      <View style={styles.myPage}>
        <MyText
          style={styles.title}
          value={title}
        />
        <SearchBar
          originalList={areas}
          setFilterList={setFilterAreas}
          check={'descr'}
          placeholder="Search feature"
          style={styles.searchInput}
        />
        { serviceId && (alreadyLogged ?
          <MyText
            style={styles.connectedMessage}
            value={`Compte ${serviceName} deja connecte.`}
          /> :
          <Button
            style={styles.connectButton}
            onPress={() => setConnexionBox(true)}
            textStyle={[styles.buttonText, styles.subscribeText]}
            value={`Se connecter a ${serviceName}`}
          />
        ) }
        <View style={styles.boxContainer}>
          { filterAreas.map(({id, ...value}) => (
            <AreaBox
              key={id}
              id={id}
              {...value}
            />
          )) }
        </View>
      </View>
    )
  }

  const ConnectWebView = () => {
    const { AuthView:ServiceAuthView } = serviceInfos[serviceId]
    return (
      <View style={styles.connexionView}>
        <ServiceAuthView
          userMail={userMail}
          navigation={navigation}
        />
      </View>
    )
  }

  return (
    <Interface
      navigation={navigation}
      actualPage={"applets"}
      userMail={userMail}
    >
      <View style={styles.appletPage}>
        { connexionBox ?
          <ConnectWebView/> :
          <Page/>
        }
      </View>
    </Interface>
  )
}

const styles = StyleSheet.create({
  appletPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  myPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#505DD0',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 2,
  },
  connectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#505DD0',
    borderRadius: 10,
    marginVertical: 10,
  },
  subscribeText: {
    color: 'white',
    textAlign: 'center',
  },
  connectedMessage: {
    color: "green",
    marginBottom: 10,
    textAlign: 'center',
  },
  connexionView: {
    width: '100%',
    height: 800,
    overflow: 'hidden',
    backgroundColor: 'red',
  }
})

export default AppletPage
