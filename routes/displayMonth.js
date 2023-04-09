const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

const thisMonth = new Date().getMonth() + 1;

const Months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};


router.get('/', authorization, async (req, res) => {
    try {
        const MonthData = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user]);
        res.json(MonthData.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});

router.get('/participant-order/:round_id', authorization ,async (req, res) => {
    try {
      const { round_id } = req.params;
      const user_id = req.user.id;
      console.log('round_id:', round_id);
      console.log('user_id:', user_id);
      const query = `
        SELECT *
        FROM participant_order
        WHERE round_id = $1 AND user_id = $2;
      `;
  
      

      const { rows } = await pool.query(query, [round_id,req.user.id]);

      const year = rows.created_at.getFullYear();

      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching participant order:', error);
      res.status(500).send('Error fetching participant order');
    }
  });

module.exports = router;