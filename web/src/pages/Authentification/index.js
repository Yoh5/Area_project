import React from "react"
import "./styles.css"

import areaIcon from "../../assets/logo.png"
import titleIcon from "../../assets/title.png"

export default function Authentification ({title, children}) {
  return (
    <div className={"registerPage"}>
      <div className={"header"}>
        <img src={areaIcon} className={"areaIcon"} alt={""}/>
        <img src={titleIcon} className={"titleIcon"} alt={""}/>
      </div>
      <div className={"inputPart"}>
        <h1>{title}</h1>
        { children }
      </div>
    </div>
  )
}
