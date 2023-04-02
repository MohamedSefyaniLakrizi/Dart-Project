const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
        const participants = await pool.query("SELECT * FROM participants WHERE user_id = $1", [req.user.id]);
        res.json({ user: user.rows[0], participants: participants.rows[0] });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});


module.exports = router;