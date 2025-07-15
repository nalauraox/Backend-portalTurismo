// Importa o tipo de dados do Sequelize
const { DataTypes } = require('sequelize');
 
// Importa a instância configurada do Sequelize (conexão com o banco de dados)
const sequelize = require('../config/db');
 
// Define o modelo de Usuário (User)
const Contact = sequelize.define('Contact', {
  // Campo ID: chave primária, número inteiro e autoincrementável
  id: {
    type: DataTypes.INTEGER,       // Tipo número inteiro
    autoIncrement: true,           // Será incrementado automaticamente
    primaryKey: true,              // Define como chave primária (PK)
  },
 
  // Campo nome do usuário
  name: {
    type: DataTypes.STRING,        // Texto simples
    allowNull: false,              // Campo obrigatório (não pode ser nulo)
  },
 
  // Campo e-mail do usuário
  email: {
    type: DataTypes.STRING,        // Texto simples
    allowNull: false,              // Obrigatório

  },

 message: {
    type: DataTypes.TEXT,
    allowNull: false, 
 }
 
}, {
  // Configurações adicionais do modelo
 
  tableName: 'contacts',              // Nome da tabela no banco de dados (evita plural automático)
 
  timestamps: true,                // Cria automaticamente os campos createdAt e updatedAt
});
 
// Exporta o modelo para ser utilizado em outras partes da aplicação
module.exports = Contact;