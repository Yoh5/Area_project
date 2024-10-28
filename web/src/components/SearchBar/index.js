import React, {useEffect, useState} from 'react'
import './styles.css'

const SearchBar = ({ originalList, setFilter, check='name', ...props }) => {

  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    setFilter(
      originalList.filter(props => {
        const tmp = props[check].toLowerCase()
        return tmp.includes(searchText.toLowerCase())
      })
    )
  }, [originalList, setFilter, searchText, check])

  return (
    <div className="inputBox">
      <input
        placeholder="Search"
        type="search"
        className="inputBar"
        value={searchText}
        onChange={event => setSearchText(event.target.value) }
        {...props}
      />
    </div>
  )
}

export default SearchBar
