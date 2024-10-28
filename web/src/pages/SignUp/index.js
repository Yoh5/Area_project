import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"

import Authentification from "../Authentification"
import Input from "../../components/Input"

const SignUpPage = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pass: "",
    confpass: "",
    useTerms: "",
  })

  async function registerHandler(event) {
    event.preventDefault()
    try {
      if (formData.username === "" || formData.email === "" ||
        formData.pass === "" || formData.confpass === "") {
        setErrorMessage("Veuillez remplir toutes les cases")
        return false
      }
      if (formData.pass.length < 8) {
        setErrorMessage("Votre mot de passe doit contenir au moins 8 caracteres")
        return false
      }
      if (formData.pass !== formData.confpass) {
        setErrorMessage("Vos mots de passes sont differents")
        return false
      }
      formData.useTerms = document.getElementById("useTerms").checked
      if (!formData.useTerms) {
        setErrorMessage("Veuillez accepter les conditions d'utilisation")
        return false
      }
      const mailValid = String(formData.email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      if (!mailValid) {
        setErrorMessage("Veuillez entrer un mail valid")
        return false
      }
      setErrorMessage("")

      try {
        fetch("https://deciding-oyster-probably.ngrok-free.app/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            mdp: formData.pass
          }),
        })
        .then(res => {
          if (res.status === 200)
            navigate(`/token?mail=${formData.email}`)
          else if (res.status === 201)
            setErrorMessage("Le compte existe deja")
        })
        .catch(error => {
          setErrorMessage(`Erreur lors de la creation de compte: ${error.message}`)
        })
      }
      catch (error) {
        setErrorMessage(`Erreur lors de la requete`)
      }
    }
    catch (error) {
      console.error("Erreur lors de la requête API:", error.message)
      setErrorMessage("Requete non envoyer, reessayez")
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({...formData, [name]: value})
  }

  return (
    <Authentification title={"Registration"}>
      <form
        className={"signUpPage"}
        onSubmit={registerHandler}
      >
        <Input
          label="Username"
          name={"username"}
          inputstyle={"userName"}
          onChange={handleInputChange}
          value={formData.username}
          required
        />
        <Input
          label="Email"
          type="email"
          name={"email"}
          inputstyle={"mailInput"}
          onChange={handleInputChange}
          value={formData.email}
          required
        />
        <Input
          label="Password"
          type="password"
          name={"pass"}
          inputstyle={"passInput"}
          onChange={handleInputChange}
          value={formData.pass}
          required
        />
        <Input
          label={"Confrim password"}
          type={"password"}
          name={"confpass"}
          inputstyle={"passConfirmInput"}
          onChange={handleInputChange}
          value={formData.confpass}
          required
        />
        <div className={"inputBox checkbox"}>
          <input
            type={"checkbox"}
            id={"useTerms"}
            name={"useTerms"}
            className={"inputstyle useTermInput"}
            required
          />
          <label
            htmlFor={"useTerms"}
            className={"labelStyle useTermStyle"}
          >
            {"I accept the Terms of Use & Privacy Policy"}
          </label>
        </div>
        <p className={"errorMessage"}>
          {errorMessage}
        </p>
        <Input
          type={"submit"}
          name={"registerNow"}
          inputstyle={"registerNow"}
          onClick={registerHandler}
          value={"Register Now"}
        />
        <a href="login" className={"signInLink"}>
          <p>Already have an account ? Sign in</p>
        </a>
      </form>
    </Authentification>
  )
}

export default SignUpPage
