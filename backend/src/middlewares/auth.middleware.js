const jwt = require('jsonwebtoken');
module.exports = (roles = []) => {
return (req, res, next) => {
const header = req.headers['authorization'];
const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;
if (!token) return res.status(401).json({ message: 'Token ausente' });
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
if (roles.length && !roles.includes(decoded.role)) {
return res.status(403).json({ message: 'Acesso negado' });
}
req.user = decoded;
next();
} catch (e) {
return res.status(401).json({ message: 'Token inválido' });
}
};
};