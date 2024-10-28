import React from 'react'
import './styles.css'

const Button = ({buttonStyle, children, href, ...props}) => {
  let button = (
    <button
      className={`button ${buttonStyle}`}
      {...props}
    > {children} </button>
  )
  return ( (href) ? <a href={href} alt=""> {button} </a> : button )
}

export default Button
