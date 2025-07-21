const sequelize = require('./config/db');
require('dotenv').config();
const express = require('express')

const cors = require('cors');
 
const userRoutes = require('./routes/userRoutes')
const contactsRoutes = require('./routes/contactRoutes')
const authRoutes = require('./routes/authRoutes');
const app = express();
 
app.use(express.json());

app.use(cors());
 
app.get('/', (_req, res)=> res.send('API funcionando'));
 
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
 
sequelize.authenticate()
  .then(() => {
    console.log('Cconectado ao banco Mysql');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados')
    app.listen(PORT, () => console.log("SERVIDOR RODANDO NA PORTA: " + PORT))
  }).catch(erro => console.log("Erro interno do servidor", erro))