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

    function generateInvitationCode() {
      return Math.floor(1000000 + Math.random() * 9000000);
    }
    
    // Check if the invitation code already exists in the database
    async function checkInvitationCode(invitationCode) {
      const result = await pool.query(`SELECT COUNT(*) FROM rounds WHERE invitation_code = ${invitationCode}`);
      return (result.rows.length > 0 && result.rows[0].count > 0);
    }
    
    
    // Generate a unique invitation code that doesn't exist in the database
    async function getUniqueInvitationCode() {
      let invitationCode;
      do {
        invitationCode = generateInvitationCode();
      } while (await checkInvitationCode(invitationCode));
      return invitationCode;
    }


    console.log("adding new Round");
    try {
      const invitationCode = await getUniqueInvitationCode();
      console.log(invitationCode);
      const newRound = await pool.query(
        "INSERT INTO rounds (name, admin_id, amount, duration, invitation_code) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, req.user.id, amount, duration, invitationCode]
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

  router.get("/get-invitation-code/:invitationCode", authorization, async (req, res) => {
    try {
      const {invitationCode} = req.params;
      const invitation_code = await pool.query(
        "SELECT invitation_code FROM rounds WHERE id = $1;",
        [invitationCode]
      );
      res.json(invitation_code);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  });

module.exports = router;

  router.post('/add-by-invitation-code', authorization, async (req, res) => {
    try{
      const { invitationCode,  } = req.body;
      const round = await pool.query("SELECT * FROM rounds WHERE invitation_code = $1;", [invitationCode]);
      await pool.query("INSERT INTO participants (user_id, round_id) VALUES ($1, $2) RETURNING *;", [req.user.id, round.rows[0].id]);
      res.json("Round added successfully");
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  });
  router.get("/get-participants",authorization, async (req, res) => {
    try {
      const round = await pool.query("SELECT round_id FROM participants WHERE user_id = $1", [req.user.id]);
      console.log(req.user.id);
      if (!round.rows[0]) {
        // Return an error response if the round object is undefined
        return res.status(400).json({ message: "No round found for this user" });
      }
      const users = await pool.query("SELECT user_id FROM participants WHERE round_id = $1", [round.rows[0].round_id]);
      res.json(users.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  });
  

  router.get("/get-round", async (req, res) => {
    try {
      const round = await pool.query("SELECT * FROM participants WHERE user_id = $1;", [req.user.id]);
      res.json(round.rows[0]);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  }); 