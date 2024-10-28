import React, { useState } from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import serviceInfos from "../services/serviceInfos"

import MyText from '../components/MyText'
import { API_KEY } from '../services/api'

const AreaBox = (props) => {

  const {id, userMail, hidden, serv_act_id:actionId,
    serv_react_id:reactionId, descr, enable = false} = props

  const navigation = useNavigation()
  const [clicked, setClicked] = useState(enable)

  function handle_subscribe_area(areaId) {
    fetch(`${API_KEY}/area/modify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userMail,
        act_react_id: areaId,
        enable: !clicked,
      })
    })
    .then(res => {
      setClicked(!clicked)
    })
    .catch(error => {
      console.error("Erreur AREA: ", error)
    })
  }

  console.log("h", actionId, serviceInfos[actionId])

  return (
    <View style={styles.areaBox}>
      <View style={styles.areaTitleBox}>
        <View style={styles.areaTitleIcons}>
          <Icon
            name={serviceInfos[actionId].image || "search"}
            size={70}
            style={styles.icon}
            onPress={(() => navigation.navigate('applets', {
              serviceId: actionId,
              userMail: userMail,
            }) )}
          />
          <Icon
            name={serviceInfos[reactionId].image}
            size={70}
            style={styles.icon}
            onPress={(() => navigation.navigate('applets', {
              serviceId: reactionId,
              userMail: userMail,
            }) )}
          />
        </View>
        { !hidden && <Switch
          id={`enabled${id}`}
          value={clicked}
          onValueChange={() => handle_subscribe_area(id)}
          ios_backgroundColor={"#0005"}
          style={{transform: [{scaleX:.8}, {scaleY:.8}]}}
        /> }
      </View>
      <MyText
        style={styles.areaDescription}
        value={descr}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  areaBox: {
    display: 'flex',
    flexDirection: 'column',
    width: 180,
    minHeight: 100,
    margin: 10,
    borderRadius: 1,
    backgroundColor: 'white',
    color: 'black',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#505DD0',
  },
  areaTitleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 2,
    borderRadius: 1,
    backgroundColor: '#505DD0',
  },
  areaTitleIcons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    fontSize: 20,
    color: 'white',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  areaDescription: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    fontSize: 12,
    textAlign: 'center',
  },
})

export default AreaBox
