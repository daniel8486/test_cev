# Test CEV - Guia de Execução

Este projeto utiliza Docker, Node.js, Express, Sequelize, MariaDB, Moodle (Bitnami), e um mock de API com json-server.

## Pré-requisitos
- Docker e Docker Compose instalados
- Node.js (recomendado v18+)
- npm

## Passos para rodar a aplicação

### 1. Subir os containers principais ( Execute os comandos na ordem abaixo)
- Entrar na pasta backend
```sh
 npm install 
```
- Executar de fora da pasta backend
```sh
 docker compose -f docker-compose.yml up -d ou docker compose up 
```
 - Garantir a persistência do container 
```sh
 docker compose -f docker-compose.yml down ou docker compose down 
```
```sh
 docker compose -f docker-compose.yml up -d ou docker compose up  
```

Isso irá iniciar:
- Postgres (banco do backend)
- Backend Node.js
- MariaDB (banco do Moodle)
- Moodle (Bitnami)

### 2. Rodar as migrações do banco do backend
```sh
docker exec -it backend_app npx sequelize-cli db:migrate
```

### 3. Iniciar o mock do Moodle (json-server)
```sh
npm install -g json-server # se não tiver
json-server --watch backend/mock_db_moodle/moodle-db.json --port 4000
```

### 4. Testar rotas do backend 
- Acesse `http://localhost:3000` para rotas do backend (Express)
- Exemplos:
	- POST `/auth/register` para registrar usuário
	- POST `/auth/login` para autenticar e receber JWT
	- POST `/alunos/validate` para validar habilidades de alunos

### 5. Testar Moodle
- Acesse `http://localhost` para interface do Moodle
- Usuário e senha padrão definidos no docker-compose

### 6. Scripts de apoio
- Para calcular habilidades faltantes:
	```sh
	node backend/mock_db_moodle/calcula_missing_skills_todos.js
	```
- Para calcular habilidade
	```sh
	node backend/mock_db_moodle/calcula_missing_skills.js
	```
- Para testar validação de aluno:
	```sh
	node backend/mock_db_moodle/testa_validacao_aluno.js
	```
- Testar endpoints Mockados
    ```sh
	http://localhost:4000/carreira
	```   
	```sh
	http://localhost:4000/submissions
	```  
	 ```sh
	http://localhost:4000/users
	```  
	```sh
	http://localhost:4000/alunos
	```  
   	
### 7. Endpoints ( Exemplo de Requests)

curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"email":"teste1@example.com","password":"123456", "name": "Teste 1"}'

curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"teste1@example.com","password":"123456"}'

curl -X POST http://localhost:3000/alunos/validate -H "Content-Type: application/json" -d '{"id":1}'

curl -i http://localhost:3000/ping

## Observações
- Para zerar o banco do backend, remova o volume:
	```sh
	docker volume rm test_cev_postgres_data
	```
- As rotas e scripts podem ser adaptados conforme necessidade.
- O arquivo `moodle-db.json` pode ser editado para simular diferentes cenários de alunos e habilidades.

---
Dúvidas ou problemas? Consulte os arquivos de rota em `backend/src/routes/` ou peça ajuda!
# test_cev

---

