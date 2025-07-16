const bcrypt =- require('bcryptjs');
const User = require('../models/users');


exports.login = async(req, res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({mesage: 'email e senha são obrigatorios'})
        const user = await User.findOne({where: {email}})
        if(!user) return res.status(400).json({message: 'Usuario não encontrado'})
        const passwordValid = await bcrypt.compare(password , user.password)
        if(!passwordValid) return res.status(400).json({mesage: 'email e senha estão incorretos'})
        res.json({message: 'Login realizado com sucesso',
        user : {id: user.id, name : user.name, email: user.email}
        })
     } catch (error) {
        res.status(500).json({message: 'Erro interno do servidor' });
    }
}