import { StyleSheet, ScrollView, TouchableOpacity, Image, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import MyText from '../../components/MyText'

const Interface = ({navigation, userMail = "username@", children, actualPage}) => {

  const options = [
    {
      label: 'Applets',
      icon: 'people-circle',
      link: 'applets',
    }, {
      label: 'Home',
      icon: 'home',
      link: 'home',
    }, {
      label: 'Area',
      icon: 'person-circle',
      link: 'areas',
    },
  ]

  const Header = () => {
    const n = userMail.indexOf('@')
    const username = userMail.slice(0, n)

    const UnknownIcon = () => {
      return (
        <View style={styles.personSide}>
          <Ionicons
            name="person-circle"
            style={styles.personIcon}
            size={34}
            onPress={() => navigation.navigate(
              'areas', {userMail: userMail})
            }
          />
          <MyText
            style={styles.personName}
            value={username}
          />
        </View>
      )
    }

    const GoogleImage = () => {
      return (
        <View style={styles.personSide}>
          <Image
            source={image}
            style={styles.profileImage}
            onPress={() => navigation.navigate(
              'profil', {userMail: userMail})
            }
          />
        </View>
      )
    }

    return (
      <View style={styles.header}>
        { true ?
          <UnknownIcon/> :
          <GoogleImage/>
        }
        <Ionicons
          name="log-out"
          style={styles.closeIcon}
          size={34}
          onPress={() => navigation.navigate(
            'login', {userMail: userMail})
          }
        />
      </View>
    )
  }

  const AOption = ({icon, label, link, style}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(link, {userMail: userMail})} >
        <View style={[styles.optionCase, style]}>
          <Ionicons
            name={icon}
            style={[{ color: 'white' }, actualPage == link ? styles.selected : {}]}
            size={actualPage == link ? 42 : 32}
          />
          <MyText
            value={label}
            style={{color: 'white'}}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.imageBackgroundView}>
      <Header/>
      <View style={styles.visualPart}>
        <ScrollView style={styles.scrollView}>
          { children }
        </ScrollView>
      </View>
      <View style={styles.optionsPart}>
        { options.map((value, id) => (
          <AOption key={id} {...value}/>
        )) }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#505DD0',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 55,
  },
  personSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  visualPart: {
    flex: 1,
    borderSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
  },

  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  imageBackground: {
    flex: 1,
  },
  imageBackgroundView: {
    backgroundColor: '#505DD0',
    flex: 1,
  },
  optionsPart: {
    backgroundColor: '#505DD0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 110,
    paddingBottom: 40,
  },
  closeIcon: {
    color: 'white',
  },
  personIcon: {
    color: 'white',
    marginRight: 10,
  },
  personName: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  optionCase: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  optionImage: {
    width: 40,
    height: 40,
  },
  selected: {
    backgroundColor: '#505DD0',
    padding: 10,
    marginBottom: 5,
    borderRadius: 30,
    overflow: 'hidden',
  }
})
  
export default Interface
