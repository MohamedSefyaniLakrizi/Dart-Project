const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const bcrypt = require('bcrypt');

router.post("/add-Rib", authorization, async (req, res) => {
    try {
        const Rib = req.body.rib;
        bcrypt.hash(Rib, 12, async function(err, hash) {
            const newUser = await pool.query(
                "UPDATE users SET rib = $1 WHERE id = $2;",
                [Rib ,req.user.id]
            );
            console.log("Rib added successfully");
            res.json({ newUser });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});


router.get('/:user_id', authorization, async (req, res) => {
    const user_id = req.params.user_id;
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;