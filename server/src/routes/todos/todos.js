const express = require('express');
const router = express.Router();
const base = require('../../config/db');
const auth = require('../../middleware/auth');
router.post('/', function(req, res) {
    const cmd = "INSERT INTO todo(title, description, due_time, status, user_id) VALUES(?, ?, ?, ?, ?)";
    base.query(cmd, [req.body.title, req.body.description, req.body.due_time, req.body.status, req.body.user_id], (err, rows, fields) => {
        if (!err) {
            res.send('Inserted todo successful');
        } else
            console.log(err);
    });
})