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
  
      const query = `
        SELECT po.round_id, po.user_id, po.participant_order,
               (((12 * (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM r.created_at)) + (EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM r.created_at))) % r.duration) + 1) AS current_order
        FROM participant_order po
        JOIN rounds r ON po.round_id = r.id
        WHERE po.round_id = $1
        ORDER BY po.participant_order;
      `;
  
      const { rows } = await pool.query(query, [round_id]);
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching participant order:', error);
      res.status(500).send('Error fetching participant order');
    }
  });

module.exports = router;