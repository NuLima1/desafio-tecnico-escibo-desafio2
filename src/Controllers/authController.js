const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = require('./usersController');

function authenticateUser(req, res) {
  const { email, senha } = req.body;

  const user = users.find((user) => user.email === email);

  // Verificar se o usuário existe e se a senha está correta
  if (user && bcrypt.compareSync(senha, user.senha)) {
    // Gerar um token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'secreto', { expiresIn: '1h' });

    // Retornar o token
    return res.status(200).json({ token });
  }

  // Caso o usuário não seja encontrado ou a senha esteja incorreta
  return res.status(401).json({ error: 'Credenciais inválidas' });
}

module.exports = (app) => {
  app.post('/login', authenticateUser);
};
