const jwt = require('jsonwebtoken');
require("dotenv").config();
function jwtgenerator(user_id){
    const payload = {
        user: {
            id: user_id
        }
    };

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1h"})
}

module.exports = jwtgenerator;