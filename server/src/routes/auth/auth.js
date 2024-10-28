const express = require('express');
const router = express.Router();
const base = require('../../config/db');
const axios = require('axios');

router.post('/github', async (req, res) => {
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
    console.log(response.data);
    // console.log(code);
    console.log(refreshToken);
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error('Error exchanging code for access token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;