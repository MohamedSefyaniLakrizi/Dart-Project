const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req,res,next) => {
    try {
        const jwtToken = req.header("Authorization");
        token = jwtToken.replace("Bearer ","");
        console.log(token);
        if(!token) {
            return res.status(403).json("Not Authorized");
        }
        const payload = jwt.verify(token, process.env.jwtSecret); 
        req.user = payload.user;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(403).json("Not Authorized");
    }
};