const app = require("express")
const router = app.Router()

const { models } = require("../models/index")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {    
    const user = await models.usuario.findOne({
        where: {
            cpf: req.body.cpf
        }
    });
    
    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    };

    if (!(await bcrypt.compare(req.body.senha, user.senha))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
        });
    };

    const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.SECRET, {
        //expiresIn: 600 // 10min
        expiresIn: '7d', // 7 dia
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        usuario: user,
        token
    });
});

router.get("/val-token", async (req, res) => {
    await models.usuario.findByPk(req.params.id_usuario)
        .then((user) => {
            return res.json({
                erro: false,
                user
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        });

});

module.exports = router
