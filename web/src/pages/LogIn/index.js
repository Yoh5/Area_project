import React, {useState} from 'react'
import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import axios from "axios"
import './styles.css'

import Authentification from "../Authentification"
import Input from '../../components/Input'
import Button from '../../components/Button'

const LoginPage = () => {
  sessionStorage.setItem('connected', false)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(false)
  const [formData, setFormData] = useState({
    userName: "", passWord: ""
  })
  // simple connexion
  async function connectHandler(event) {
    event.preventDefault()
    setErrorMessage(false)
    fetch('https://deciding-oyster-probably.ngrok-free.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.userName,
        mdp: formData.passWord
      }),
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      if (res.status === 200) {
        sessionStorage.setItem('connected', true)
        sessionStorage.setItem('username', formData.userName)
        sessionStorage.setItem('email', formData.userName)
        // sessionStorage.setItem('picture', res.data.picture)
        navigate("/home")
      }
      if (res.status === 201) {
        setErrorMessage("Identifiants incorrectes")
      }
    })
    .catch(error => {
      console.log('Erreur lors de la requête API:', error)
      setErrorMessage("La requete n'a pas aboutie")
    })
  }
  // input data getted
  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData({...formData, [name]: value})
  }
  // google connexion
  function handleGoogleLogin(googleInfos) {

    const signGoogleUp = (name, email) => {
      fetch("https://deciding-oyster-probably.ngrok-free.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: name,
          email: email,
          mdp: "google"
        }),
      })
    }
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleInfos.access_token}`, {
      headers: {
        Authorization: `Bearer ${googleInfos.access_token}`,
        Accept: 'application/json'
      }
    })
    .then(res => {
      const {name, email, picture} = res.data
      signGoogleUp(name, email)
      sessionStorage.setItem('connected', true)
      sessionStorage.setItem('username', name)
      sessionStorage.setItem('email', email)
      sessionStorage.setItem('picture', picture)
      navigate("/home")
    })
    .catch(err => {
      console.log(err)
    })
  }

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (error) => {
      setErrorMessage("Google login Failed")
      console.log('Login Failed:', error)
    }
  })

  return (
    <Authentification title={"Login"}>
      <div className={"logInPage"}>

        <form className={"loginForm"}>
          <Input
            label="Username"
            name={"userName"}
            inputstyle={"userInput"}
            labelStyle={"userLabel"}
            onChange={handleInputChange}
            value={formData.userName}
            autoFocus required
          />
          <Input
            label={"Password"}
            type={"password"}
            name={"passWord"}
            inputstyle={"passInput"}
            labelStyle={"passLabel"}
            onChange={handleInputChange}
            value={formData.passWord}
            required
          />
          <a href={"/forget"} alt={"Not implemented yet"}>
            <p className={"forgetPassword"}>
              Forgot password?
            </p>
          </a>
          <Button
            onClick={connectHandler}
            buttonStyle={"connectButton"}
          >
            <span
              className={"buttonText connectText"}
            > Login here </span>
          </Button>
        </form>

        <div className={"smallSignUpButton"}>
          <span className={"smallSignUpButtonText"}>
            Or sign in with
          </span>
        </div>

        { errorMessage && <p className={"errorMessage"}>
          {errorMessage}
        </p> }

        <Button
          onClick={() => { googleLogin() }}
          buttonStyle={"googleButton"}
        >
          <FcGoogle className={"googleIcon"} />
          <span className={"buttonText subscribeText"}>
            S'inscrire avec Google
          </span>
        </Button>

        <Button
          href={"signup"}
          buttonStyle={"registerButton"}
        >
          <span className={"buttonText connectText"}>
            Or register here
          </span>
        </Button>

      </div>
    </Authentification>
  )
}

export default LoginPage
