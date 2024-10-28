const express = require('express');
const router = express.Router();
const base = require('../../config/db');
const axios = require('axios');
const moment = require('moment');

const nodemailer = require('nodemailer');
const { Console } = require('console');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'register.area00@gmail.com',
      pass: 'aowbcustdtcvtmaw'
    }
});

function updateCard(memberId, access_token, boardName, cardName, lst, desc) {
  console.log("update")
  let brd_id = 0;
  let lst_id = 0;
  let crd_id = 0;
  fetch(`https://api.trello.com/1/members/${memberId}/boards?key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`)
  .then(response => response.json())
  .then(data => {
    //console.log('Boards:', data);
    let j = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].name == boardName) {
            brd_id = data[i].id;
            console.log("board name", data[i].name)
            fetch(`https://api.trello.com/1/boards/${data[i].id}/lists?key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`)
            .then(response => response.json())
            .then(data => {
              lst_id = data[lst].id;
                fetch (`https://api.trello.com/1/boards/${brd_id}/cards?key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`)
                .then (response => response.json())
                .then(data => {
                  for (j = 0; j < data.length; j++) {
                    if (data[j].name == cardName) {
                      console.log("Jai retrouver l'id de la carte")
                      crd_id = data[j].id
                      fetch (`https://api.trello.com/1/cards/${crd_id}?desc=${desc}&idList=${lst_id}&idBoard=${brd_id}&key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`, {
                        method : 'PUT'
                      })
                      .then (response => response.json())
                      .then(data => {
                        console.log('Card bien update')
                      })
                    }
                  }
                })
            })
        }
    }
  });
}

async function createCard(memberId, access_token, boardName, cardName, desc) {
  console.log("in func create card");
  let boardExists = false;

  try {
      const response = await fetch(`https://api.trello.com/1/members/${memberId}/boards?key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`);
      const data = await response.json();
      console.log('Boards:', data);

      for (let i = 0; i < data.length; i++) {
          if (data[i].name == boardName) {
              boardExists = true;
              console.log("board name", data[i].name);

              const listsResponse = await fetch(`https://api.trello.com/1/boards/${data[i].id}/lists?key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`);
              const listsData = await listsResponse.json();

              console.log("liste name", listsData[0].name);

              const url = `https://api.trello.com/1/cards?name=${cardName}&desc=${desc}&idList=${listsData[0].id}&key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`;

              const createCardResponse = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });
          }
      }

      if (!boardExists) {
          await createBoard(memberId, access_token, boardName);
          await createCard(memberId, access_token, boardName, cardName, desc);
      }
  } catch (error) {
      console.error('Erreur lors de la création de la carte ou du board:', error);
  }
}

function deleteBoard(memberId, access_token, boardName) {
  fetch(`https://api.trello.com/1/members/${memberId}/boards?key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`)
  .then(response => response.json())
  .then(data => {
    //console.log('Boards:', data);
    let j = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == boardName) {
          console.log("board name", data[i].name)
          fetch(`https://api.trello.com/1/boards/${data[i].id}?key=aadcc429540b201ab9b49e8865e62087&token=${access_token}`, {
            method : 'DELETE'
          })
          .then(response => response.json())
          .then(data => {
              console.log(`Board ${boardName} supprimer avec succes`)
          })
      }
    }
  });
}

function createBoard(memberId, accessToken, boardName) {
  let j = 0;
  fetch(`https://api.trello.com/1/members/${memberId}/boards?fields=name&key=aadcc429540b201ab9b49e8865e62087&token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
          //console.log('Boards:', data);
          for (let i = 0; i < data.length; i++) {
            if (data[i].name == boardName)
              j = 1;
          }
          if (j == 0) {
            fetch(`https://api.trello.com/1/boards?name=${boardName}&key=aadcc429540b201ab9b49e8865e62087&token=${accessToken}`, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                console.log('Nouvelle board créée:', data);
            })
            .catch(error => {
                console.error('Erreur lors de la création de la board:', error);
            });
          }
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des boards du membre:', error);
      });
}

function sendEmail(receiver, subject, text, imagePath) {
  const lines = text.split('<br>');

  const formattedLines = lines.map(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const beforeColon = line.substring(0, colonIndex);
      const afterColon = line.substring(colonIndex + 1);

      const formattedBeforeColon = `<span style="text-decoration: underline; font-weight: bold;">${beforeColon}</span>`;
      const formattedAfterColon = `<span style="font-style: italic;">${afterColon}</span>`;

      return `${formattedBeforeColon}:${formattedAfterColon}`;
    }
    return line;
  });

  const formattedText = formattedLines.join('<br>');

    const mailOptions = {
    from: 'register.area00@gmail.com',
    to: receiver,
    subject: subject,
    html: `
    <div>
        <img src="cid:image" alt="Image" style="display: block; margin: 0 auto; width: 200px;" />
        <div style="margin-top: 20px;">
          <span style="font-size: 16px;">${formattedText}</span>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: 'image.jpg',
        path: imagePath,
        cid: 'image'
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
    } else {
      console.log('E-mail envoyé avec succès!', info.response);
    }
  });
}

router.post('/req', async function(req, res) {
    const sender = req.body.sender.login
    const githubEvent = req.headers['x-github-event'];
    console.log(`Sur le compte de l\'utilisateur ${req.body.sender.login}, il y a eu l\'event: ${req.headers['x-github-event']}, action ${req.body.action}\n`)
    base.query('SELECT * FROM accounts WHERE identifiant = ? AND service_id = 1',[sender], (err, rows, fields) => {
      if (rows && rows.length > 0) {
        const user_id = rows[0].user_id;
        console.log(`Il s'agit du user_id ${user_id}`);
        base.query('SELECT * FROM user_area WHERE user_id = ? AND enable = 1',[user_id], (err, rows, fields) => {
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].act_react_id == 1 && githubEvent == 'push') {
                base.query('SELECT * FROM user WHERE id = ?',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const zemail = rows[0].email;
                  sendEmail(zemail, `NOUVEAU PUSH SUR LE REPOSITORY ${req.body.repository.name}`, `Repository : ${req.body.repository.name}<br>Auteur du push : ${req.body.pusher.name}<br>Heure du push : ${moment(req.body.head_commit.timestamp).format('MMMM Do YYYY, h:mm:ss a')}<br>D\étails du commit : ${req.body.head_commit.message}`, './src/images/push.png');
                  console.log("Un push est survenu sur un repo et la reaction doit se produire");
                }
              })
            }
            if (rows[i].act_react_id == 2 && githubEvent == 'pull_request') {
              base.query('SELECT * FROM user WHERE id = ?',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const zemail = rows[0].email;
                  sendEmail(zemail, `PULL REQUEST SUR LE REPOSITORY ${req.body.repository.name}`, `Repository : ${req.body.repository.name}<br>Auteur de la pull request : ${req.body.sender.login}<br>Heure de la pull request : ${moment(req.body.pull_request.created_at).format('MMMM Do YYYY, h:mm:ss a')}<br>Titre de la pull request : ${req.body.pull_request.title}<br>Corps de la pull request : ${req.body.pull_request.body}`, './src/images/pull.png');
                  console.log("Une pull request est survenu sur un repo et la reaction doit se produire");
                }
              })
            }
            if (rows[i].act_react_id == 3 && githubEvent == 'repository' && req.body.action == 'created') {
              console.log("repo est cree")
              base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = 5',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const {identifiant, access_token} = rows[0];
                  console.log("Unboard doit etre cree")
                  createBoard(identifiant, access_token, req.body.repository.name);
                }
              })
            }
            if (rows[i].act_react_id == 4 && githubEvent == 'repository' && req.body.action == 'deleted') {
              base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = 5',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const {identifiant, access_token} = rows[0];
                  deleteBoard(identifiant, access_token, req.body.repository.name);
                }
              })
            }
            if (rows[i].act_react_id == 5 && githubEvent == 'issues' && req.body.action == 'opened') {
              console.log("Issue open")
              base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = 5',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  console.log("Une card doit etre cree")
                  const {identifiant, access_token} = rows[0];
                  createCard(identifiant, access_token, req.body.repository.name, req.body.issue.title, req.body.issue.body)
                }
              })
            }
            if (rows[i].act_react_id == 6 && githubEvent == 'issues' && req.body.action == 'edited') {
              base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = 5',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const {identifiant, access_token} = rows[0];
                  console.log("Une card doit etre editee")
                  updateCard(identifiant, access_token, req.body.repository.name, req.body.issue.title, 1, req.body.issue.body)
                }
              })
            }
            if (rows[i].act_react_id == 7 && githubEvent == 'issues' && req.body.action == 'closed') {
              base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = 5',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const {identifiant, access_token} = rows[0];
                  updateCard(identifiant, access_token, req.body.repository.name, req.body.issue.title, 2, req.body.issue.body)
                }
              })
            }
            if (rows[i].act_react_id == 8 && githubEvent == 'create' && ref_type === 'branch') {
              base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = 5',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const {identifiant, access_token} = rows[0];
                  createCard(identifiant, access_token, req.body.repository.name, req.body.ref, "")
                }
              })
            }
            //Il manque l'area 9 ici
            if (rows[i].act_react_id == 10 && githubEvent == 'delete' && ref_type === 'branch') {
              base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = 5',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const {identifiant, access_token} = rows[0];
                  updateCard(identifiant, access_token, req.body.repository.name, req.body.ref, 2, "")
                }
              })
            }
            if (rows[i].act_react_id == 11 && githubEvent == 'repository' && req.body.action == 'created') {
              base.query('SELECT * FROM user WHERE id = ?',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const zemail = rows[0].email;
                  sendEmail("kadesboy@gmail.com", `CREATION D\'UN NOUVEAU REPOSITORY`, `Nom du nouveau repository : ${req.body.repository.name}<br>Cr\é\é par : ${req.body.sender.login}<br>Heure de création : ${moment(req.body.created_at).format('MMMM Do YYYY, h:mm:ss a')}`, './src/images/repo_cr.png');
                  console.log("Une pull request est survenu sur un repo et la reaction doit se produire");
                }
              })
            }
            if (rows[i].act_react_id == 12 && githubEvent == 'workflow_run') {
              base.query('SELECT * FROM user WHERE id = ?',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const zemail = rows[0].email;
                  sendEmail("kadesboy@gmail.com", `UN WORKFLOW EST EN TRAIN DE RUN SUR LE REPOSITORY ${req.body.repository.name}`, `Exécution de workflow sur le repository : ${req.body.repository.name}<br>Exécutée par : ${req.body.sender.login}<br>Heure d\'exécution : ${moment(req.body.created_at).format('MMMM Do YYYY, h:mm:ss a')}<br>Détails du workflow : ${req.body.workflow_run.workflow}`, './src/images/workflow.png');
                  console.log("Une pull request est survenu sur un repo et la reaction doit se produire");
                }
              })
            }
            if (rows[i].act_react_id == 13 && githubEvent == 'repository' && req.body.action == 'deleted') {
              const deletionTime = new Date();
              base.query('SELECT * FROM user WHERE id = ?',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const zemail = rows[0].email;
                  sendEmail("kadesboy@gmail.com", `SUPPRESSION D\'UN REPOSITORY`, `Nom du nouveau repository : ${req.body.repository.name}<br>Supprim\é par : ${req.body.sender.login}<br>Heure de suppression : ${deletionTime}`, './src/images/repo_clo.png');
                  console.log("Un repo est supprimer et la reaction doit se produire");
                }
              })
            }
            if (rows[i].act_react_id == 14 && githubEvent == 'watch' && req.body.action == 'started') {
              const deletionTime = new Date();
              base.query('SELECT * FROM user WHERE id = ?',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const zemail = rows[0].email;
                  sendEmail("kadesboy@gmail.com", `ETOILE CREE SUR UN REPOSITORY`, `Nom du nouveau repository : ${req.body.repository.name}<br>Cr\é\é par : ${req.body.sender.login}<br>Heure de cr\éation : ${deletionTime}`, './src/images/star_cr.png');
                  console.log("Une etoile ajoutee sur un repo et la reaction doit se produire");
                }
              })
            }
            if (rows[i].act_react_id == 15 && githubEvent == 'watch' && req.body.action == 'unstarred') {
              const deletionTime = new Date();
              base.query('SELECT * FROM user WHERE id = ?',[user_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                  const zemail = rows[0].email;
                  sendEmail("kadesboy@gmail.com", `ETOILE RETIREE D\'UN REPOSITORY`, `Nom du nouveau repository : ${req.body.repository.name}<br>Cr\é\é par : ${req.body.sender.login}<br>Heure de cr\éation : ${deletionTime}`, './src/images/star_del.png');
                  console.log("Une etoile retiree d'un repo et la reaction doit se produire");
                }
              })
            }
          }
        })
      } else {
          res.status(400).send({message: 'Cet identifiants n\'est pas enregistrer dans la base pour github', status: 400});
      }
  })
})

router.post('/auth', async (req, res) => {
  const { code } = req.body;
  const clientId = 'Iv1.075b70f0387bf950';
  const clientSecret = '2a443fc3ca35146d57d3cac85451bcbf0fbb2666';

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const accessToken = await response.data.split("&")[0].split("=")[1];
    const refreshToken = await response.data.split("&")[2].split("=")[1];
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error('Error exchanging code for access token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;