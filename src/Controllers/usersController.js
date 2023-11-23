const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const users = []; 

function InsertUser(req, res) {
    const { nome, email, senha, ddd, telefone } = req.body;

 
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Função para criar um novo usuário
    function createUser(nome, email, senha, ddd, telefone) {
        // Aplicando hash à senha usando bcrypt
        bcrypt.hash(senha, 10, (err, hashedSenha) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar usuário' });
            }

            // Criar um usuário com a senha hash
            const newUser = {
                nome: nome,
                email: email,
                senha: hashedSenha,
                ddd: ddd,
                telefone: telefone
            };

            // Adicione o novo usuário à lista de usuários
            users.push(newUser);
            
            // Retorna a criação do usuário
            return res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
        });
    }

    // Exemplo de chamada da função createUser
    createUser(nome, email, senha, ddd, telefone);
  }

module.exports = (app) => {
  app.post('/users', InsertUser);
};
