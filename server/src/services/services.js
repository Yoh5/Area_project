const express = require('express');
const router = express.Router();
const base = require('../config/db');

/**
 * @swagger
 * /services/:
 *   get:
 *     summary: Services disponibles
 *     description: Renvoie une liste de services disponibles
 *     responses:
 *       200:
 *         description: Liste de services disponibles bein renvoyee
 */

router.post('/', (req, res) => {
    const all = `SELECT id, name FROM services`;
    base.query(all, (err, rows, fields) => {
        res.status(200).send(rows);
    })
})

router.put('/modify', (req, res) => {
    const cmd2 = "UPDATE services SET name = ? WHERE id = ?";
    base.query(cmd2, [req.body.name, req.body.id], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({message : 'Mise a jour du service bien effectuee', status: 200});
        } else
        res.status(400).json({message : 'Echec lors de la mise a jour du service', status: 400});
    })
})

/**
 * @swagger
 * /services/add:
 *   post:
 *     summary: Ajout d'un service
 *     description: Ajoute un service dont le name est passe en parametre
 *     parameters:
 *       - in: body
 *         name: name
 *         description: Nom du service
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nom du service
 *     responses:
 *       200:
 *         description: Ajout du service reussie
 *       400:
 *         description: Erreur lors de l'ajout du service
 */
router.post('/add', (req, res) => {
    const cmd = "INSERT INTO services(name) VALUES(?)";
    base.query(cmd, [req.body.name], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({message: `Service ${req.body.name} bien ajouter a la liste des services.`, status: 200});
        } else
            res.status(400).json({message: `Erreur lors de l'ajout du service ${req.body.name}.`, status: 400});
    });
})

/**
 * @swagger
 * /services/delete/:id:
 *   delete:
 *     summary: Suppression d'un service
 *     description: Supprime du service dont l'id est passee en parametre
 *     parameters:
 *       - in: body
 *         id: id
 *         description: Supprime du service en fonction de l'id
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: id du service
 *     responses:
 *       200:
 *         description: Suppression du service reussie
 *       400:
 *         description: Suppression du service echouer
 */

router.delete('/delete/:id', (req, res) => {
    base.query('DELETE FROM services WHERE id=?', [req.params.id], (err, rows, fields) =>{
        if (!err) {
            res.status(200).send({message: `Service id = ${req.params.id} bien supprimer de la liste des services.`, status: 200});
        } else {
            res.status(400).json({message: `Erreur lors de la suppression du service id = ${req.params.id}.`, status: 400});
        }
    })
})

module.exports = router;