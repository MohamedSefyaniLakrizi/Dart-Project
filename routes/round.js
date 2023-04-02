const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
        res.json(user.rows[0]); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});

router.post("/add", authorization, async (req, res) => {
    const { name, amount, duration } = req.body;
    console.log("adding new Round");
    try {
      const newRound = await pool.query(
        "INSERT INTO rounds (name, admin_id, amount, duration) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, req.user.id, amount, duration]
      );
      pool.query('INSERT INTO participants (user_id, round_id) VALUES ($1, $2) RETURNING *',
        [req.user.id, newRound.rows[0].id]
      );
      res.json(newRound.rows[0]);
      console.log("Round added successfully");
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  });
  
  router.post("/add-member", authorization, async (req, res) => {
    const { roundId, memberId } = req.body;
    try {
      const newParticipant = await pool.query(
        "INSERT INTO participants (user_id, round_id) VALUES ($1, $2) RETURNING *",
        [memberId, roundId]
      );
      res.json(newParticipant.rows[0]);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  });
  
  router.delete("/remove-member/:roundId/:memberId", authorization, async (req, res) => {
    const { roundId, memberId } = req.params;
  
    try {
      await pool.query("DELETE FROM participants WHERE user_id = $1 AND round_id = $2", [
        memberId,
        roundId,
      ]);
      res.json("Member removed from the round.");
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  });
  
  router.delete("/delete/:roundId", authorization, async (req, res) => {
    const { roundId } = req.params;
  
    try {
      await pool.query("DELETE FROM rounds WHERE id = $1 AND admin_id = $2", [
        roundId,
        req.user.id,
      ]);
      res.json("Round deleted.");
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  });

module.exports = router;