const axios = require('axios');

async function validarAluno(id) {
  try {
    const response = await axios.post('http://localhost:3000/alunos/validate', { id });
    console.log('Resposta da API:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.log('Erro na resposta:');
      console.log(JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Erro:', error.message);
    }
  }
}

// Exemplo: validar aluno com id 1
validarAluno(1);
