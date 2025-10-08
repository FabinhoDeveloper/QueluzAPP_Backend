const app = require("express")
const router = app.Router()
const { models } = require("../models/index")
const bcrypt = require("bcryptjs")

router.get("/get", async (req, res) => {
    await models.usuario.findAll({
        order: [['id_usuario', 'DESC']]
    })
        .then((users) => {
            return res.json({
                erro: false,
                users
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
    });
});

router.get("/get/:id", async (req, res) => {
    const { id } = req.params;

    //await User.findAll({ where: { id: id } })
    await models.usuario.findByPk(id)
        .then((user) => {
            return res.json({
                erro: false,
                user: user
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});

router.post("/create", async (req, res) => {
    try {
        const { primeiro_nome, sobrenome, cpf, telefone, email, senha, endereco } = req.body;

        const senhaHash = await bcrypt.hash(senha, 8);

        const usuario = await models.usuario.create({
            primeiro_nome,
            sobrenome,
            cpf,
            telefone,
            email,
            senha: senhaHash,
            endereco
        });

        return res.status(201).json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!",
            usuario, // aqui você retorna o usuário criado
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!",
            detalhe: error.message
        });
    }
});


router.put("/update/:id", async (req, res) => {
    const { id } = req.params;

    await models.usuario.update(req.body, { where: { id_usuario: id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não editado com sucesso!"
            });
        });
});

router.put("/update-password", async (req, res) => {
    const { id, password } = req.body;

    var senhaCrypt = await bcrypt.hash(password, 8);

    await models.usuario.update({ password: senhaCrypt }, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Senha editada com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Senha não editada com sucesso!"
            });
        });
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    await models.usuario.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não apagado com sucesso!"
            });
        });
});

module.exports = router
