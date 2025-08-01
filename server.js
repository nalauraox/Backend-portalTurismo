// Carrega as variáveis de ambiente definidas no arquivo .env
require('dotenv').config();
 
// Importa o framework Express para criar a aplicação web/API
const express = require('express');
 
// Importa a instância do Sequelize configurada para conexão com o banco PostgreSQL
const sequelize = require('./config/db');
 
// Importa o middleware CORS para configurar permissões de acesso entre domínios
const cors = require('cors');
 
// Importa as rotas modularizadas da aplicação
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
 
// Cria uma instância do app Express
const app = express();
 
// Configura o middleware CORS para aceitar requisições do frontend (localhost:5173)
// Permite os métodos GET, POST, PUT, DELETE e aceita credenciais (cookies, auth headers)
app.use(cors({                            
  origin: 'https://frontend-portal-turismo-git-main-nalauraoxs-projects.vercel.app/', // utilizar o link da vercel de vocês        
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));
 
// Middleware que transforma o corpo das requisições com JSON em objeto JavaScript acessível via req.body
app.use(express.json());
 
// Rota base da API para teste rápido — retorna texto simples confirmando que API está funcionando
app.get('/', (req, res) => res.send('API funcionando'));
 
// Configuração das rotas da API:
// Toda requisição para /api/users será encaminhada para userRoutes
app.use('/api/users', userRoutes);
 
// Toda requisição para /api/contacts será encaminhada para contactRoutes
app.use('/api/contacts', contactRoutes);
 
// Toda requisição para /api/auth será encaminhada para authRoutes
app.use('/api/auth', authRoutes);
 
// Porta definida no arquivo .env onde o servidor vai escutar as requisições
const PORT = process.env.PORT;
 
// Primeiro tenta conectar ao banco de dados PostgreSQL usando Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado ao banco PostgreSQL!');
 
    // Sincroniza os modelos Sequelize com o banco (cria tabelas, etc)
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Modelos sincronizados!');
 
    // Inicia o servidor Express na porta definida
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch(err =>
    // Caso ocorra erro na conexão ou sincronização, exibe no console
    console.error('🔴 Erro ao conectar/sincronizar:', err)
  );