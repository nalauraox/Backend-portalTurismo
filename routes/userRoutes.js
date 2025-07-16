const express = require('express');
const router = express.Router();

const user = require('../controllers/userController')
 
// ✅ Criar usuário (registro) — público
router.post('/', user.createUser);
 
// ✅ Listar todos os usuários
router.get('/', user.listUser);
 
// ✅ Buscar usuário por ID
router.get('/:id', user.listUserByTd);
 
// ✅ Atualizar usuário
router.put('/:id', user.updateUser);
 
// ✅ Deletar usuário
router.delete('/:id', user.deleteUser);
 
module.exports = router;