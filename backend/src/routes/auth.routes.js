const express = require('express');
const router = express.Router();
const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/login', (req, res) => {
  res.json({ message: 'Login route funcionando!' });
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'supersegredo',
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error: error.message });
  }
});


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
});

module.exports = router;