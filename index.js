const express = require("express");
var cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import do middleware de autenticação
// const { eAdmin } = require('./source/middlewares/auth');

const app = express();

// Middlewares

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});

// Configuração das rotas

const UserControllers = require("./source/controllers/UserControllers")
const AuthControllers = require("./source/controllers/AuthControllers")

app.use("/user", UserControllers)
app.use("/auth", AuthControllers)

// Instancia do servidor API

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});