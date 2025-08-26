const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Course, User, Enrollment } = require('../database/models');

// Middleware de autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  jwt.verify(token, process.env.JWT_SECRET || 'supersegredo', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Rota protegida para listar cursos
router.get('/', authenticateToken, async (req, res) => {
  const courses = await Course.findAll();
  res.json({ courses });
});

// Criar curso
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const course = await Course.create({ name, description, status });
    res.status(201).json({ message: 'Curso criado com sucesso!', course });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar curso', error: error.message });
  }
});

// Matricular aluno em turma
router.post('/:courseId/enroll', authenticateToken, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: 'Curso não encontrado' });
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    await Enrollment.create({ UserId: userId, CourseId: courseId });
    res.json({ message: 'Aluno matriculado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao matricular aluno', error: error.message });
  }
});

// Listar matrículas de um curso
router.get('/:courseId/enrollments', authenticateToken, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: 'Curso não encontrado' });
    const enrollments = await Enrollment.findAll({
      where: { CourseId: courseId },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'role'] }]
    });
    res.json({ enrollments });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao listar matrículas', error: error.message });
  }
});

// Listar todos os alunos matriculados em todos os cursos
router.get('/enrollments/all', authenticateToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email', 'role'] },
        { model: Course, attributes: ['id', 'name', 'description', 'status'] }
      ]
    });
    res.json({ enrollments });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao listar matrículas', error: error.message });
  }
});

module.exports = router;
