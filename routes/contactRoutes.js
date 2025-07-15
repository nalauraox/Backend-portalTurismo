const express = require('express');
const Contact = require('../models/contacts');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const contact = await Contact.create({ name, email, message });
    return res.status(201).json(contact);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const erros = error.errors.map(e => e.message);
      return res.status(400).json({ errors: erros });
    }
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar contatos.' });
  }
});

module.exports = router;
