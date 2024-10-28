import React from 'react'
import './styles.css'

const Input = ({label, labelStyle, type = "text", name, inputstyle, ...props}) => (
  <div className="inputBox">
    { label && <label
      htmlFor={name}
      className={`labelStyle ${labelStyle}`}
    > {label} </label> }
    <input
      type={type}
      id={name}
      name={name}
      className={`inputStyle ${inputstyle}`}
      {...props}
    />
  </div>
)

export default Input
