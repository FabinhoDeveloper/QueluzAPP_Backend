const Sequelize = require('sequelize');
const initModels = require("./init-models")

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_HOST) {
    throw new Error("Variáveis de ambiente do banco não definidas corretamente!");
}  

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => console.log("Conexão com o banco de dados realizada com sucesso!"))
.catch((err) => console.error("Erro ao conectar ao banco:", err));

const models = initModels(sequelize);

module.exports = {sequelize, models};
