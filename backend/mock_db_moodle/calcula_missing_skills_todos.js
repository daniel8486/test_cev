const fs = require('fs');

const expectedSkills = ["Design", "UI/UX", "Programação", "Lógica"];
const db = JSON.parse(fs.readFileSync('./backend/mock_db_moodle/moodle-db.json', 'utf8'));

function printMissingSkills(entity, label) {
  if (!entity || !Array.isArray(entity)) return;
  entity.forEach(user => {
    const faltantes = expectedSkills.filter(skill => user.missingSkills && user.missingSkills.includes(skill));
    console.log(`${label} ${user.id} (${user.email || user.name}): ${faltantes.join(", ") || 'Nenhuma habilidade faltante.'}`);
  });
}

console.log('Usuários:');
printMissingSkills(db.users, 'Usuário');

console.log('\nAlunos:');
printMissingSkills(db.alunos, 'Aluno');
