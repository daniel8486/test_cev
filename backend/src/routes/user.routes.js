const express = require('express');
const router = express.Router();

// Rota de exemplo para usuários
router.get('/', (req, res) => {
  res.json({ message: 'User route funcionando!' });
});

module.exports = router;
