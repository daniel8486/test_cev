const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.json({ message: 'User route funcionando!' });
});

module.exports = router;
