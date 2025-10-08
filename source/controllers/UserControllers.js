const app = require("express")
const router = app.Router()
const { models } = require("../models/index")

router.get("/get", async (req, res) => {
    await models.usuario.findAll({
        attributes: ['id', 'cpf', 'password'],
        order: [['id', 'DESC']]
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
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);

    await models.usuario.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não cadastrado com sucesso!"
            });
        });
});

router.put("/update", async (req, res) => {
    const { id } = req.body;

    await models.usuario.update(req.body, { where: { id } })
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
