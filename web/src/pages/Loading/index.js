import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

import areaIcon from "../../assets/logo.png"
import titleIcon from "../../assets/title.png"

const LoadingPage = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate('/login')
  }, 3000)

  return (
    <div className={"loadingPage"}>
        <img src={areaIcon} className={"areaIcon"} alt={""}/>
        <img src={titleIcon} className={""} alt={""}/>
    </div>
  )
}

export default LoadingPage
