const express = require('express');
const router = express.Router();
const base = require('../config/db');

router.post('/modify', (req, res) => {
    const em = req.body.email, act_react_id = req.body.act_react_id, en = req.body.enable;
    console.log(`email = ${em} act_reactid = ${act_react_id}, enable = ${en}`)
    base.query('SELECT * FROM user WHERE email = ?',[em], (err, rows, fields) => {
        if (rows && rows.length > 0) {
            const user_id = rows[0].id;
            const cmd = "SELECT * FROM user_area WHERE user_id = ? AND act_react_id = ?";
            base.query(cmd, [user_id, act_react_id], (err, rowss, fields) => {
                if (rowss && rowss.length > 0) {
                    const cmd2 = "UPDATE user_area SET enable = ? WHERE user_id = ? AND act_react_id = ?";
                    base.query(cmd2, [en, user_id, act_react_id], (err, rows, fields) => {
                        if (!err) {
                            res.status(200).send({message: `Enable de l'area bien modifiee.`, status: 200});
                        } else
                            res.status(400).send({message: `Erreur lors de la modification de l'enable de l'area.`, status: 200});

                    })
                } else {
                    const cmd = "INSERT INTO user_area(user_id, act_react_id, enable) VALUES(?, ?, ?)";
                    base.query(cmd, [user_id, act_react_id, en], (err, rows, fields) => {
                        if (!err) {
                            res.status(200).send({message: `Ajout d'une nouvelle area pour 'utilisateur`, status: 200});
                        } else
                            res.status(400).send({message: `Erreur lors de l'ajout d'une nouvelle area.`, status: 200});
                    });
                } 
            });
        } else {
            res.status(400).json({message: `Ce mail ${em} n\'existe pas.`, status: 400});
        }
    })
})

router.post('/', (req, res) => {
    const all = `SELECT * FROM user_area`;
    base.query(all, (err, rows, fields) => {
        res.status(200).json(rows);
    })
})

router.delete('/delete', (req, res) => {
    const all = `DELETE FROM user_area`;
    base.query(all, (err, rows, fields) => {
        res.status(200).json("User_area supprimer");
    })
})

module.exports = router;