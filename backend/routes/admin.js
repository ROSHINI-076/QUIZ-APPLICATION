const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { adminCode } = req.body;
  if (adminCode === process.env.ADMIN_CODE) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
