const jwt = require('jsonwebtoken');

const verification = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bear = header.split(' ');
        const token = bear[1];
        req.token = token;
        next(); 
    } else {
        res.status(403).json({msg:'No token, authorization denied'});
    }
}

function generateToken(req) {
    return jwt.sign({
    name: req.body.name,
    password: req.body.password
    }, process.env.SECRET, {expiresIn: '4minutes'});
}

module.exports.verification = verification;
module.exports.generateToken = generateToken;