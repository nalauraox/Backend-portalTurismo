const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
 
const User = require('../models/Users');
 
// ✅ Criar usuário (registro) — público
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
 
    // Verifica se o email já está cadastrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }
 
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);
 
    // Cria o novo usuário
    const newUser = await User.create({ name, email, password: hashedPassword });
 
    // Retorna os dados sem a senha
    const { id } = newUser;
    res.status(201).json({ id, name, email });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});
 
// ✅ Listar todos os usuários
router.get('/', async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
});
 
// ✅ Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });
 
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
 
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
});
 
// ✅ Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
 
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
 
    // Atualiza o nome se foi enviado
    if (name) user.name = name;
 
    // Atualiza o e-mail, verificando se já está em uso
    if (email && email !== user.email) {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'Email já está em uso.' });
      }
      user.email = email;
    }
 
    // Atualiza a senha se foi enviada
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
 
    // Salva as alterações
    await user.save();
 
    // Retorna os dados atualizados
    res.status(200).json({
      message: 'Usuário atualizado com sucesso.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
});
 
// ✅ Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
 
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
 
    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
});
 
module.exports = router;