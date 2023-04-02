const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const bcrypt = require('bcrypt');

router.post("/add-Rib", authorization, async (req, res) => {
    try {
        const Rib = req.user.rib;
        const User = req.user
        console.log({ User });
        console.log("RIB is:" + Rib);
        bcrypt.hash(Rib, 12, async function(err, hash) {
            const newUser = await pool.query(
                "UPDATE users SET rib = $1 WHERE id = $2;",
                [Rib ,req.user.id]
            );
            console.log("Rib added successfully");
            res.json( req.user.rib);
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});


module.exports = router;