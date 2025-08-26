const fs = require('fs');

const expectedSkills = ["Design", "UI/UX", "Programação", "Lógica"];
const db = JSON.parse(fs.readFileSync('./backend/mock_db_moodle/moodle-db.json', 'utf8'));

if (!db.users) {
  console.error('Nenhum usuário encontrado no banco.');
  process.exit(1);
}

db.users.forEach(user => {
  const faltantes = expectedSkills.filter(skill => user.missingSkills && user.missingSkills.includes(skill));
  console.log(`Usuário ${user.id} (${user.email}) está faltando: ${faltantes.join(", ") || 'Nenhuma habilidade faltante.'}`);
});
