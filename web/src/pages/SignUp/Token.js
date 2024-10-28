import React, {useState} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./styles.css"

import Authentification from "../Authentification"
import Input from "../../components/Input"
import Button from "../../components/Button"

const TokenPage = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [token, setToken] = useState("")

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userMail = searchParams.get('mail')

  const tokenHandler = async () => {
    setErrorMessage("")
    fetch("https://deciding-oyster-probably.ngrok-free.app/verify", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userMail,
        the_token: token
      }),
    })
    .then(res => {
      if (res.status === 201)
        setErrorMessage("Invalid Token")
      else
        navigate('/login')
    })
    .catch(error => {
      console.error("Erreur lors de la requête API:", error.message)
    })
  }

  function handleTokenChange(event) {
    const { value } = event.target
    setToken(value)
  }

  return (
    <Authentification title={"Authentification"}>
      <div className={"tokenPage"}>
        <Input
          placeholder={"Enter token"}
          name={"tokenInput"}
          inputstyle={"verificationToken"}
          onChange={handleTokenChange}
          value={token}
          maxLength={16}
        />
        <p className={"errorMessage"}>
          {errorMessage}
        </p>
        <Button
          className={"checkButton"}
          onClick={tokenHandler}
          type={"submit"}
          name={"sendToken"}
          inputstyle={"submitButton"}
          value={"Verify"}
        > Check </Button>
        <a href="signup" className={"backToRegister"}>
          <p>Back to register</p>
        </a>
      </div>
    </Authentification>
  )
}

export default TokenPage
