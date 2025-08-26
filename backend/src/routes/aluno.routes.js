const express = require('express');
const fs = require('fs');
const router = express.Router();


const dbPath = './backend/mock_db_moodle/moodle-db.json';
function getAlunos() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return db.alunos || [];
}

router.post('/validate', (req, res) => {
  const { id, email } = req.body;
  const alunos = getAlunos();
  const aluno = alunos.find(a => a.id === id || a.email === email);

  if (!aluno) {
    return res.status(404).json({ message: 'Aluno não encontrado' });
  }

  res.json({
    id: aluno.id,
    email: aluno.email,
    missingSkills: aluno.missingSkills
  });
});

module.exports = router;
