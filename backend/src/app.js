const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');


const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const alunoRoutes = require('./routes/aluno.routes');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.use((req, res, next) => {
  req.startTime = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(req.startTime);
    const ms = (diff[0] * 1e3) + (diff[1] / 1e6);
    res.setHeader('X-Response-Time', `${ms.toFixed(2)}ms`);
  });
  next();
});

app.get('/ping', (req, res) => {
  const diff = process.hrtime(req.startTime);
  const ms = (diff[0] * 1e3) + (diff[1] / 1e6);
  res.json({ message: 'pong', responseTime: `${ms.toFixed(2)}ms` });
});


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/alunos', alunoRoutes);


app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
});


module.exports = app;