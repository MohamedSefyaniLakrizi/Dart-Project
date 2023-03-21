const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtgenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/register', validInfo, async (req, res) => {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
    if (user.rows.length !== 0) {
        return res.status(401).json("User already exists");
    }
    try {
        const { username, email, password } = req.body;
        bcrypt.hash(password, 12, async function(err, hash) {
            const newUser = await pool.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, hash]
            );
            const jwtToken = jwtgenerator(newUser.rows[0].id) 
            return res.json({ jwtToken });
        });
    } catch (err) {
        console.log("there is an error");
        console.error(err.message);
    }   
    
});

router.post('/login',validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);
        console.log(user.rows[0]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or email is incorrect");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).json("Password or email is incorrect");
        }
        const jwtToken = jwtgenerator(user.rows[0].id);
        res.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
    }
});

router.get('/is-verify', authorization, async (req, res) => {
    res.json(true);
    try {
        res.json(true);
        console.log("authorized");
    } catch (error) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

module.exports = router;