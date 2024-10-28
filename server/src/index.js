const express = require('express');
const axios = require('axios');
const base = require('../src/config/db');
const bodyParser = require('body-parser');
const validator = require('validator');
const pars = bodyParser.urlencoded({extended: false}); 
const dotenv = require('dotenv').config();
const port = process.env.SERVER_PORT;
const app = express();
const cors=require('cors');
app.use(cors());

// OAUTHHHHHHHHHHHHHHHH GOOOOOOOOOOOOOOOOOOOGLEEEEEEEE
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
// décommenter le client_id et le client_secret avant de tester

const REDIRECT_URI = 'https://deciding-oyster-probably.ngrok-free.app/auth/google/callback';

app.get('/auth/google', (req, res) => {
    console.log("venu")
    const redirectURL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile email&response_type=code`;
  
    res.redirect(redirectURL);
});

app.get('/auth/google/callback', async (req, res) => {
    try {
      const { code } = req.query;
  
      if (!code) {
        throw new Error('Code missing in the callback URL');
      }
  
      // Échangez le code d'autorisation contre un jeton d'accès
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      });
  
      const { access_token, id_token } = tokenResponse.data;
  
      // Utilisez l'ID token pour obtenir des informations sur l'utilisateur
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      const userInfo = userInfoResponse.data;
  
      // Utilisez les informations de l'utilisateur comme nécessaire
      console.log(userInfo);
    } catch (error) {
      console.error('Google authentication error:', error.message);
      res.redirect('/error'); // Redirigez vers une page d'erreur en cas d'échec d'authentification
    }
  });
// OAUTHHHHHHHHHHHHHHHH GOOOOOOOOOOOOOOOOOOOGLEEEEEEEE

// const auth = require('../src/middleware/auth');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'register.area00@gmail.com',
      pass: 'aowbcustdtcvtmaw'
    }
  });

  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'AREA API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['src/index.js', 'src/services/services.js'], // Spécifiez les fichiers contenant les commentaires Swagger
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

function isEmailValid(email) {
    return validator.isEmail(email);
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}
/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint de base
 *     description: Renvoie un message de salutation
 *     responses:
 *       200:
 *         description: Message de salutation
 */

app.get('/', (req, res) => {
    res.status(200).send("YES KADES\n");
})


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Creer un utilisateur 
 *     description: Creer un utilisateur et lui envoie un token par mail
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Données de l'utilisateur
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Email de l'utilisateur
 *             username:
 *               type: string
 *               description: Nom d'utilisateur de l'utilisateur
 *             mdp:
 *               type: string
 *               description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Creation du compte reussie
 *       400:
 *         description: Erreur lors de la creation du compte
 */

app.post('/register', function(req, res) {
    console.log(`le mail que je recois |${req.body.email}|`);
    console.log(req.body)
    if (isEmailValid(req.body.email)) {
        console.log(`${req.body.email} est une adresse e-mail valide.`);
        if (req.body.mdp == 'google') {
            console.log("1")
            base.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                    res.status(200).send({message: `Connexion de ${req.body.email} avec l'api google reussi.`, status: 200});
                } else {
                    const cmd = "INSERT INTO user(email, username, mdp, the_token, account_check) VALUES(?, ?, ?, ?, ?)";
                    base.query(cmd, [req.body.email, req.body.username, req.body.mdp, "pas besoin", true], (err, rows, fields) => {
                        if (!err) {
                            fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                method: 'POST',
                                body: JSON.stringify({ email: req.body.email, service_id: 2, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(`Utilisateur ${req.body.email} connecter pour le service gmail`);
                                fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                    method: 'POST',
                                    body: JSON.stringify({ email: req.body.email, service_id: 3, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(`Utilisateur ${req.body.email} connecter pour le service meteo`);
                                    fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                        method: 'POST',
                                        body: JSON.stringify({ email: req.body.email, service_id: 4, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(`Utilisateur ${req.body.email} connecter pour le service rss`);
                                                fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                            method: 'POST',
                                            body: JSON.stringify({ email: req.body.email, service_id: 6, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log(`Utilisateur ${req.body.email} connecter pour le service bible`);
                                            fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                                method: 'POST',
                                                body: JSON.stringify({ email: req.body.email, service_id: 7, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                console.log(`Utilisateur ${req.body.email} connecter pour le service blague`);
                                                fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                                    method: 'POST',
                                                    body: JSON.stringify({ email: req.body.email, service_id: 8, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    }
                                                })
                                                .then(response => response.json())
                                                .then(data => {
                                                    console.log(`Utilisateur ${req.body.email} connecter pour le service culture ge`);
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                            // envoyer une requete account/connect
                            res.status(200).send({message: `Inscription de ${req.body.email} avec l'api google reussi.`, status: 200});
                        }
                        else
                            res.status(400).send({message: `Probleme lors de l'inscription de ${req.body.email}.`, status: 400});
                    });
                }
            })
        } else {
            base.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, rows, fields) => {
            if (rows && rows.length > 0) {
                    console.log("3")
                    res.status(201).send({message: `Compte ${req.body.email} existant.`, status: 201});
            } else {
                console.log("4")
                const cmd = "INSERT INTO user(email, username, mdp, the_token, account_check) VALUES(?, ?, ?, ?, ?)";
                tok = generateRandomString(16);
                base.query(cmd, [req.body.email, req.body.username, req.body.mdp, tok, false], (err, rows, fields) => {
                    if (!err) {
                        console.log("5")
                        res.status(200).send({message: `Compte ${req.body.email} cree avec succes.`, status: 200});
                        let mailOptions = {
                            from: 'register.area00@gmail.com',
                            to: req.body.email,
                            subject: 'TOKEN FOR YOUR AREA PLATEFORM',
                            text: `Your token for your AREA Plateforme is: ${tok}`
                        };
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                            } else {
                                console.log('E-mail envoyé avec succès!', info.response);
                            }
                        });
                    } else
                        res.status(400).json({message: `Erreur lors de la creation du compte ${req.body.email} !!`, status: 400});
                });
            }
            })
        }
    } else {
        res.status(400).json({message: `${req.body.email} n'est pas une adresse e-mail valide.`});
        console.log(`${req.body.email} n'est pas une adresse e-mail valide.`);
    }
})

/**
 * @swagger
 * /verify:
 *   put:
 *     summary: Authentifier un utilisateur
 *     description: Verifie si le token envoyer par mail est correct
 *     parameters:
 *       - in: body
 *         name: verify
 *         description: Verification du token
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Email de l'utilisateur
 *             token:
 *               type: string
 *               description: Token de l'utilisateur
 *     responses:
 *       200:
 *         description: Authentification du compte reussie
 *       400:
 *         description: Incorrect email et/ou token
 */

app.put('/verify', function(req, res) {
    base.query('SELECT * FROM user WHERE email = ? AND the_token = ?',[req.body.email, req.body.the_token],(err, rows, fields) => {
        if (rows && rows.length > 0) {
            const cmd2 = "UPDATE user SET account_check = 1 WHERE email = ?";
            base.query(cmd2, [req.body.email], (err, rows, fields) => {
                if (!err) {
                    fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                        method: 'POST',
                        body: JSON.stringify({ email: req.body.email, service_id: 2, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(`Utilisateur ${req.body.email} connecter pour le service gmail`);
                        fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                            method: 'POST',
                            body: JSON.stringify({ email: req.body.email, service_id: 3, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(`Utilisateur ${req.body.email} connecter pour le service meteo`);
                            fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                method: 'POST',
                                body: JSON.stringify({ email: req.body.email, service_id: 4, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(`Utilisateur ${req.body.email} connecter pour le service rss`);
                                fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                    method: 'POST',
                                    body: JSON.stringify({ email: req.body.email, service_id: 6, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(`Utilisateur ${req.body.email} connecter pour le service bible`);
                                    fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                        method: 'POST',
                                        body: JSON.stringify({ email: req.body.email, service_id: 7, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(`Utilisateur ${req.body.email} connecter pour le service blague`);
                                        fetch(`https://deciding-oyster-probably.ngrok-free.app/account/connect`, {
                                            method: 'POST',
                                            body: JSON.stringify({ email: req.body.email, service_id: 8, identifiant: req.body.email, access_token: "", refresh_token: "" }),
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log(`Utilisateur ${req.body.email} connecter pour le service culture ge`);
                                        })
                                    })
                                })
                            })
                        })
                    })
                    // envoyer une requete account/connect
                    res.status(200).json({message : 'VALIDATE SUCCESFULLY', status: 200});
                } else
                    console.log(err);
            })
        } else {
            res.status(201).json({message: 'Incorrect email et/ou token', status: 201});
        }
    })
})

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Recuperer les users
 *     description: Renvoie une liste de tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs bien renvoyee
 */

app.get('/user', function(req, res) {
    const all = `SELECT id, email, username, mdp, the_token, account_check FROM user`;
    base.query(all, (err, rows, fields) => {
        res.status(200).json(rows);
    })
})

app.delete('/delete_user', function(req, res) {
    const all = `DELETE FROM user`;
    base.query(all, (err, rows, fields) => {
        res.status(200).json("Users supprimers");
    })
})

app.get('/about.json', function(req, res) {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const lastColonIndex = clientIP.lastIndexOf(":");
    const ad = clientIP.substring(lastColonIndex + 1);
    console.log('Adresse IP du client:', ad);
    const clientst = {
        host: clientIP
    };
    const server = {
        current_time: "",
        services : {}
    };
    rows = {
        client : clientst,
        services : server
    }
    //client = {}
    services = {}
    //rows.client.host = ""
    console.log("About")
    res.status(200).json((rows));
})

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Suppression d'utiliateur
 *     description: Supprime l'utilisateur dont l'id est passee en parametre
 *     parameters:
 *       - in: body
 *         name: delete
 *         description: Supprimer un user en fonction de id
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Email de l'utilisateur
 *     responses:
 *       200:
 *         description: Suppression du compte reussie
 *       400:
 *         description: Suppression du compte echouer
 */

app.delete('/delete', (req, res) => {
    base.query('DELETE FROM user WHERE id=?', [req.body.id], (err, rows, fields) =>{
        if (!err) {
            res.status(200).send(`DELETED user with id ${req.body.id} SUCCESSFUL`)
        } else {
            console.log(err);
        }
    })
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecter un utilisateur
 *     description: Connecte l'utilisateur dont le mail et le password sont passes en parametre
 *     parameters:
 *       - in: body
 *         name: post
 *         description: Connecte un user avec son mail et son password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Email de l'utilisateur
 *             mdp:
 *               type: string
 *               description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion du compte reussie
 *       400:
 *         description: Connexion du compte echouer
 */

app.post('/login', function(req, res) {
    console.log(req.body)
    base.query('SELECT * FROM user WHERE email = ? AND mdp = ? AND account_check = 1',[req.body.email, req.body.mdp], (err, rows, fields) => {
        if (rows && rows.length > 0) {
            //const tok = auth.generateToken(req);
            res.status(200).send({message: `Bienvenu ${req.body.email} !!`, status: 200});
        } else {
            res.status(201).send({message: 'Incorrect email et/ou mot de passe', status: 201});
        }
    })
})



const servicesManager = require('./services/services');
app.use('/services', servicesManager);

const act_ReactManager = require('./act_react/act_react');
app.use('/act_react', act_ReactManager);

const user_AreaManager = require('./user_area/user_area');
app.use('/area', user_AreaManager);

const accountManager = require('./accounts/accounts');
app.use('/account', accountManager);

const authRouter = require('./routes/github/github');
app.use('/github', authRouter);

//const todoRouter = require('./routes/todos/todos');
//app.use('/todo', todoRouter);
let meteo_nbr = 0, meteo_inc = 0;
async function meteoService()
{
    let i = 0;
    meteo_inc++;
    let tmp = {}
    // console.log(`i = ${i} j = ${j}`)
    const cmd = "SELECT * FROM user_area WHERE act_react_id = 16 AND enable = 1";
    base.query(cmd, (err, rows, fields) => {
        if (rows && rows.length > 0) {
            if (meteo_inc == 0) {
                meteo_nbr = rows.length;
                for (i = 0; i < rows.length; i++) {
                    base.query('SELECT * FROM user WHERE id = ?',[rows[i].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[i].email,
                                subject: 'METEO ABOUT TODAY',
                                text: `INFOS METEO`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            } else {
                if (rows.length > meteo_nbr) {
                    meteo_nbr = rows.length;
                    base.query('SELECT * FROM user WHERE id = ?',[rows[rows.length - 1].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[rows.length - 1].user_id,
                                subject: 'METEO ABOUT TODAY',
                                text: `INFOS METEO`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            }
        } else {
            console.log("Personne n'a activer le area meteo")
        }
    })
}

let news_nbr = 0, news_inc = 0;
async function NewsService()
{
    let i = 0;
    news_inc++;
    let tmp = {}
    const cmd = "SELECT * FROM user_area WHERE act_react_id = 17 AND enable = 1";
    base.query(cmd, (err, rows, fields) => {
        if (rows && rows.length > 0) {
            if (news_inc == 0) {
                news_nbr = rows.length;
                for (i = 0; i < rows.length; i++) {
                    base.query('SELECT * FROM user WHERE id = ?',[rows[i].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[i].email,
                                subject: 'NES ABOUT TODAY',
                                text: `INFOS NEWS`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            } else {
                if (rows.length > news_nbr) {
                    news_nbr = rows.length;
                    base.query('SELECT * FROM user WHERE id = ?',[rows[rows.length - 1].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[rows.length - 1].user_id,
                                subject: 'NEWS ABOUT TODAY',
                                text: `NEWS METEO`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            }
        } else {
            console.log("Personne n'a activer le area news")
        }
    })
}

let bible_nbr = 0, bible_inc = 0;
async function BibleService()
{
    let i = 0;
    bible_inc++;
    let tmp = {}
    const cmd = "SELECT * FROM user_area WHERE act_react_id = 18 AND enable = 1";
    base.query(cmd, (err, rows, fields) => {
        if (rows && rows.length > 0) {
            if (bible_inc == 0) {
                bible_nbr = rows.length;
                for (i = 0; i < rows.length; i++) {
                    base.query('SELECT * FROM user WHERE id = ?',[rows[i].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[i].email,
                                subject: 'VERSETS JOURNALIERS',
                                text: `VERSET DU JOUR`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            } else {
                if (rows.length > bible_nbr) {
                    bible_nbr = rows.length;
                    base.query('SELECT * FROM user WHERE id = ?',[rows[rows.length - 1].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[rows.length - 1].user_id,
                                subject: 'VERSETS JOURNALIERS',
                                text: `VERSET DU JOUR`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            }
        } else {
            console.log("Personne n'a activer le area bible")
        }
    })
}

let joke_nbr = 0, joke_inc = 0;
async function JokeService()
{
    let i = 0;
    joke_inc++;
    let tmp = {}
    const cmd = "SELECT * FROM user_area WHERE act_react_id = 19 AND enable = 1";
    base.query(cmd, (err, rows, fields) => {
        if (rows && rows.length > 0) {
            if (joke_inc == 0) {
                joke_nbr = rows.length;
                for (i = 0; i < rows.length; i++) {
                    base.query('SELECT * FROM user WHERE id = ?',[rows[i].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[i].email,
                                subject: 'BLAGUES JOURNALIERS',
                                text: `BLAGUE DU JOUR`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            } else {
                if (rows.length > joke_nbr) {
                    joke_nbr = rows.length;
                    base.query('SELECT * FROM user WHERE id = ?',[rows[rows.length - 1].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[rows.length - 1].user_id,
                                subject: 'BLAGUES JOURNALIERS',
                                text: `BLAGUE DU JOUR`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            }
        } else {
            console.log("Personne n'a activer le area joke")
        }
    })
}

let cul_nbr = 0, cul_inc = 0;
async function CulTureService()
{
    let i = 0;
    cul_inc++;
    let tmp = {}
    const cmd = "SELECT * FROM user_area WHERE act_react_id = 20 AND enable = 1";
    base.query(cmd, (err, rows, fields) => {
        if (rows && rows.length > 0) {
            if (cul_inc == 0) {
                cul_nbr = rows.length;
                for (i = 0; i < rows.length; i++) {
                    base.query('SELECT * FROM user WHERE id = ?',[rows[i].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[i].email,
                                subject: 'PAYS JOURNALIERS',
                                text: `PAys DU JOUR`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            } else {
                if (rows.length > cul_nbr) {
                    cul_nbr = rows.length;
                    base.query('SELECT * FROM user WHERE id = ?',[rows[rows.length - 1].user_id], (err, rows, fields) => {
                        if (rows && rows.length > 0) {
                            let mailOptions = {
                                from: 'register.area00@gmail.com',
                                to: rows[rows.length - 1].user_id,
                                subject: 'PAYS JOURNALIERS',
                                text: `PAys DU JOUR`
                            };
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
                                } else {
                                    console.log('E-mail envoyé avec succès!', info.response);
                                }
                            });
                        }
                    })
                }
            }
        } else {
            console.log("Personne n'a activer le area culture ge")
        }
    })
}

async function myFunction() {
    await meteoService();
    await NewsService();
    await BibleService();
    await JokeService();
    await CulTureService();
}

const intervalId = setInterval(myFunction, 5000);

const serv = app.listen(port, () => {
    console.log(`En attente de requete sur le port ${port} :)`)
})

serv.on('close', () => {
    clearInterval(intervalId);
    console.log('Serveur arrêté. Interval également arrêté.');
});