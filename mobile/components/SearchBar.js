import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const SearchBar = ({originalList, setFilterList, check, style, ...props}) => {

  useEffect(() => {
    setFilterList(originalList)
  }, [originalList])

  function handleChangeText(searchText) {
    setFilterList(
      originalList.filter(elem => {
        const tmp = elem[check].toLowerCase()
        searchText = searchText.toLowerCase()
        return tmp.includes(searchText)
      } )
    )
  }
  return (
    <TextInput
      type="search"
      style={[styles.searchInput, style]}
      onChangeText={handleChangeText}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  searchInput: {
    width: 330,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
})

export default SearchBar
