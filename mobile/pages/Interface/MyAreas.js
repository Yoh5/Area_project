import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Interface from './Interface'
import AreaBox from '../../components/AreaBox'
import SearchBar from '../../components/SearchBar'
import MyText from '../../components/MyText'
import { API_KEY } from "../../services/api"

const MyAreas = ({ navigation, route }) => {
  const userMail = route.params?.userMail
  const [areas, setAreas] = useState([])
  const [filterAreas, setFilterAreas] = useState([])

  useEffect(() => {
    fetch(`${API_KEY}/area/is_enable`, {
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
    .then(elems => {
      elems.forEach(ifRegistered)
    })
    .catch(error => {
      console.error('Erreur lors de la requête API:', error.message)
    })
  }, [userMail])

  function ifRegistered({act_react_id:id}) {
    const tab = [
      {
        "id": 1,
        "serv_act_id": 1,
        "serv_react_id": 2,
        "descr": "Get an email notification on push"
      },
      {
        "id": 2,
        "serv_act_id": 1,
        "serv_react_id": 2,
        "descr": "Get an email notification on Pull request"
      },
      {
        "id": 3,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Create a new board on Trello when an repository is created on Github"
      },
      {
        "id": 4,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Delete the board on Trello when the repository is delete on Github"
      },
      {
        "id": 5,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Add a Trello Card in To Do List when an issue is created on Github"
      },
      {
        "id": 6,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Move a Trello Card to Doing List when an issue is edited on Github"
      },
      {
        "id": 7,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Move a Trello Card to Done List when an issue is closed on Github"
      },
      {
        "id": 8,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Add a Trello Card in To Do List when a new branch is created on Github"
      },
      {
        "id": 9,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Move a Trello Card to Doing List when a branch is edited on Github"
      },
      {
        "id": 10,
        "serv_act_id": 1,
        "serv_react_id": 5,
        "descr": "Move a Trello Card to Done List when a branch is closed on Github"
      },
      {
        "id": 11,
        "serv_act_id": 1,
        "serv_react_id": 2,
        "descr": "Get an email notification when the repository is created"
      },
      {
        "id": 12,
        "serv_act_id": 1,
        "serv_react_id": 2,
        "descr": "Get an email notification when a workflow is running"
      },
      {
        "id": 13,
        "serv_act_id": 1,
        "serv_react_id": 2,
        "descr": "Get an email notification when a repository is closed"
      },
      {
        "id": 14,
        "serv_act_id": 1,
        "serv_react_id": 2,
        "descr": "Get an email notification when a star is created on repository"
      },
      {
        "id": 15,
        "serv_act_id": 1,
        "serv_react_id": 2,
        "descr": "Get an email notification when a star is deleted on repository"
      },
      {
        "id": 16,
        "serv_act_id": 6,
        "serv_react_id": 2,
        "descr": "Get an email notification about Meteo of the day"
      },
      {
        "id": 17,
        "serv_act_id": 7,
        "serv_react_id": 2,
        "descr": "Get an email notification about News of the day"
      },
      {
        "id": 18,
        "serv_act_id": 8,
        "serv_react_id": 2,
        "descr": "Receive an email from Bible versey every day"
      },
      {
        "id": 19,
        "serv_act_id": 3,
        "serv_react_id": 2,
        "descr": "Receive a tech joke e-mail every day"
      },
      {
        "id": 20,
        "serv_act_id": 4,
        "serv_react_id": 2,
        "descr": "Receive information on a country around the world every day"
      }
    ]
    setAreas(areas => [...areas, tab[id]])
  }

  // function ifRegistered(elem) {
  //   console.log("elem", elem)
  //   fetch(`${API_KEY}/act_react/infos`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
//       "id": elem.id,
//       "email": userMail
//     })
//   })
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(res => {
  //     console.log("res1", res)
  //     setAreas(areas => [...areas, res])
  //   })
  //   .catch(error => {
  //     console.error('Erreur AREA', error.message)
  //   })
  // }

  return (
    <Interface
      navigation={navigation}
      actualPage={"areas"}
      userMail={userMail}
    >
      <View style={styles.areasPage}>
        <MyText
          style={styles.title}
          value={"Mes Areas"}
        />
        <SearchBar
          originalList={areas}
          setFilterList={setFilterAreas}
          check={'descr'}
          placeholder={"Search an area"}
          style={styles.searchInput}
        />
        <View style={styles.boxContainer}>
          { filterAreas.map(({id, ...value}) => (
            <AreaBox
              key={id}
              id={id}
              userMail={userMail}
              {...value}
              hidden
            />
          )) }
        </View>
      </View>
    </Interface>
  )
}

const styles = StyleSheet.create({
  areasPage: {
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
  },
  searchInput: {
    width: 330,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 2,
  },
})

export default MyAreas
