const express = require('express');
const router = express.Router();
const base = require('../config/db');

router.post('/connect', (req, res) => {
    const em = req.body.email, sid = req.body.service_id, id_ac = req.body.identifiant;
    const acc = req.body.access_token, refresh = req.body.refresh_token;
    base.query('SELECT * FROM user WHERE email = ?',[req.body.email], (err, rows, fields) => {
        if (rows && rows.length > 0) {
            const user_id = rows[0].id;
            const cmd = "INSERT INTO accounts(user_id, service_id, identifiant, access_token, refresh_token) VALUES(?, ?, ?, ?, ?)";
            base.query(cmd, [user_id, sid, id_ac, acc, refresh], (err, rows, fields) => {
                if (!err) {
                    res.status(200).send({message: `Account pour le service ${sid} bien ajouter a la liste des accounts.`, status: 200});
                } else
                    res.status(201).send({message: `Erreur lors de l'ajout a la liste des accounts pour le service ${sid}.`, status: 201});
            });
        } else {
            res.status(400).json({message: `Ce mail ${em} n\'existe pas.`, status: 400});
        }
    })
})

router.post('/isco', (req, res) => {
    const em = req.body.email, sd = req.body.service_id;
    console.log("email", em)
    console.log("sd = ", sd)
    base.query('SELECT * FROM user WHERE email = ?',[em], (err, rows, fields) => {
        if (rows && rows.length > 0) {
            console.log("oui")
            const user_id = rows[0].id;
            const cmd = "SELECT * FROM accounts WHERE user_id = ? AND service_id = ?";
            base.query(cmd, [user_id, req.body.service_id], (err, rows, fields) => {
                if (rows && rows.length > 0) {
                    console.log("bon")
                    res.status(200).send({message: `Utilisateur ${em} connecter pour le service ${sd}`, status: 200});
                } else {
                    console.log("mauvais")
                    res.status(201).send({message: `Utilisateur ${em} n\'est pas connecter pour le service ${sd}`, status: 201});
                }
            });

        } else {
            console.log("non")
            res.status(400).json({message: `Ce mail ${em} n\'existe pas.`, status: 400});
        }
    })
})

router.post('/', (req, res) => {
    const all = `SELECT * FROM accounts`;
    base.query(all, (err, rows, fields) => {
        res.status(200).send(rows);
    })
})

router.delete('/delete', (req, res) => {
    const all = `DELETE FROM accounts`;
    base.query(all, (err, rows, fields) => {
        res.status(200).send("Tout supprimer");
    })
})

module.exports = router;