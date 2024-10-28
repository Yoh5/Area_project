const express = require('express');
const router = express.Router();
const base = require('../config/db');

router.post('/is_enable', (req, res) => {
  let uid = 0;
  base.query('SELECT * FROM user WHERE email = ?', [req.body.email], (err, rows, fields) => {
    if (rows && rows.length > 0) {
      uid = rows[0].id
      base.query('SELECT * FROM user_area WHERE user_id = ? AND enable = 1', [uid], (err, rows, fields) => {
        if (rows && rows.length > 0) {
          res.status(200).send(rows)
        } else {
          res.status(400).send("PAs darae pour toi")
        }
      })
    } else {
      res.status(400).send("Email introuvable")
    }
  })
})

router.post('/add', (req, res) => {
    const cmd = "INSERT INTO act_react(serv_act_id, serv_react_id, descr) VALUES(?, ?, ?)";
    base.query(cmd, [req.body.serv_act_id, req.body.serv_react_id, req.body.descr], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message: `Action reaction ${req.body.descr} bien ajouter a la liste des act_react.`, status: 200});
        } else
            res.status(400).json({message: `Erreur lors de l'ajout de l'act_react ${req.body.descr}.`, status: 400});
    });
})

router.put('/modify/:id', (req, res) => {
    base.query('SELECT * FROM act_react WHERE id = ?',[req.params.id],(err, rows, fields) => {
        if (rows && rows.length > 0) {
            const cmd2 = "UPDATE act_react SET serv_act_id = ?, serv_react_id = ?, descr = ? WHERE id = ?";
            base.query(cmd2, [req.body.serv_act_id, req.body.serv_react_id, req.body.descr, req.params.id], (err, rows, fields) => {
                if (!err) {
                    res.status(200).json({message : 'Mise a jour de l\'action reaction bien effectuee', status: 200});
                } else
                    res.status(400).json({message : 'Echec lors de la mise a jour de l\'action reaction', status: 400});
            })
        } else {
            res.status(400).json({message: 'Aucune action reaction de cet id', status: 400});
        }
    })
})

router.post('/:id', async (req, res) => {
    try {
      const sid = req.params.id;
      let tmp = {};
      let act_id = 0, ssi = 0, ssd = 0;
  
      const getUserByEmail = (email) => {
        return new Promise((resolve, reject) => {
          base.query('SELECT * FROM user WHERE email = ?', [email], (err, rows, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      };
  
      const getActReactData = (serv_act_id, serv_react_id) => {
        return new Promise((resolve, reject) => {
          base.query('SELECT * FROM act_react WHERE serv_act_id = ? OR serv_react_id = ?', [serv_act_id, serv_react_id], (err, rows, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      };
  
      const checkUserAccount = (user_id, service_id) => {
        return new Promise((resolve, reject) => {
          base.query('SELECT * FROM accounts WHERE user_id = ? AND service_id = ?', [user_id, service_id], (err, rows, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      };
  
      const checkUserArea = (user_id, act_react_id) => {
        return new Promise((resolve, reject) => {
          base.query('SELECT * FROM user_area WHERE user_id = ? AND act_react_id = ? AND enable = 1', [user_id, act_react_id], (err, rows, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      };
  
      const rows = await getUserByEmail(req.body.email);
      if (rows && rows.length > 0) {
        const user_id = rows[0].id;
        const actReactRows = await getActReactData(sid, sid);
        if (actReactRows && actReactRows.length > 0) {
          tmp = actReactRows;
          console.log("list des areas", tmp);
          for (let i = 0; i < actReactRows.length; i++) {
            act_id = actReactRows[i].id;
            ssi = actReactRows[i].serv_act_id;
            ssd = actReactRows[i].serv_react_id;
            console.log("id du service act:", ssi);
            console.log("id du service react :", ssd);
  
            const userAccountRows1 = await checkUserAccount(user_id, ssi);
            if (userAccountRows1 && userAccountRows1.length > 0) {
              console.log(`1- id : ${user_id} connecter pour le service ${ssi}`);
              const userAccountRows2 = await checkUserAccount(user_id, ssd);
              if (userAccountRows2 && userAccountRows2.length > 0) {
                console.log(`2- id : ${user_id} connecter pour le service ${ssd}`);
                tmp[i].clic = true;
                const userAreaRows = await checkUserArea(user_id, act_id);
                if (userAreaRows && userAreaRows.length > 0) {
                  tmp[i].enable = true;
                  console.log(tmp);
                } else {
                  tmp[i].enable = false;
                  //console.log(tmp);
                }
              } else {
                console.log(`Pas connecter pour le service ${ssd}`);
                tmp[i].clic = false;
                tmp[i].enable = false;
                //console.log(tmp);
              }
            } else {
              tmp[i].clic = false;
              tmp[i].enable = false;
              //console.log(tmp);
            }
          }
        }
      }
  
      res.status(200).send(tmp);
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).send('Une erreur s\'est produite.');
    }
  });


router.post('/', (req, res) => {
    const all = `SELECT id, serv_act_id, serv_react_id, descr FROM act_react`;
    base.query(all, (err, rows, fields) => {
        res.status(200).send(rows);
    });
})

module.exports = router;