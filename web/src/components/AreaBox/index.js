import React, { useState } from 'react'
import './styles.css'
import serviceInfos from "../../services/serviceInfos"
import { useSearchParams } from "react-router-dom"

const AreaBox = ({id, descr, enable=false, clic=false,
  serv_act_id, serv_react_id, hidden}) => {

  const [url] = useSearchParams()
  const serviceId = url.get('service') ?? 0
  const userMail = sessionStorage.getItem("email")
  const [checked, setChecked] = useState(enable)

  const ServiceImage1 = serviceInfos[serv_act_id].Image
  const ServiceImage2 = serviceInfos[serv_react_id].Image
  const { boxColor, iconColor } = serviceInfos[serviceId]

  function handle_subscribe_area() {
    fetch(`https://deciding-oyster-probably.ngrok-free.app/area/modify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userMail,
        act_react_id: id,
        enable: !enable
      })
    })
    .then(res => {
      console.log("AREA", res.status)
      setChecked(checked => !checked)
    })
    .catch(error => {
      console.log("Erreur AREA: ", error)
    })
  }

  return (
    <div
      className="areaBox"
      style={{ backgroundColor: boxColor }}
    >
      <div className="areaTitleBox">
        <div className="areaTitleIcons">
          <a href={`/applets/?service=${serv_act_id}`}>
            <ServiceImage1 className={"icon"}/>
          </a>
          <a href={`/applets/?service=${serv_react_id}`}>
            <ServiceImage2 className={"icon"}/>
          </a>
        </div>
        { !hidden && clic &&
          <input
            type={"checkbox"}
            id={`enabled${id}`}
            onChange={handle_subscribe_area}
            checked={checked}
          />
        }
      </div>
      <p
        className="areaDescription"
        style={{ color: iconColor }}
      >{descr}</p>
    </div>
  )
}

export default AreaBox
