import React from 'react'
import './styles.css'

const ServiceBox = ({id, name, Image, boxColor, iconColor}) => {
  return (
    <a href={`/applets/?service=${id}`} alt="">
      <div
        className="serviceBox"
        style={{ backgroundColor: boxColor }}
      >
        <Image
          className={"icon"}
          size={130}
          style={{color: iconColor}}
        />
        <h3 style={{color: iconColor}}>
          {name}
        </h3>
      </div>
    </a>
  )
}

export default ServiceBox
