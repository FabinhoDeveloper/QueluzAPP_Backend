// scripts/generate-models.js
const dotenv = require("dotenv")
const {exec} = require("child_process")

// Carrega variáveis do .env
dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_DIALECT
} = process.env;

// Monta o comando dinamicamente
const command = `npx sequelize-auto -o "./source/models" -d ${DB_NAME} -h ${DB_HOST} -u ${DB_USER} -x ${DB_PASS} -p ${DB_PORT} -e ${DB_DIALECT}`;

console.log("🔄 Gerando models com Sequelize Auto...");
console.log(command.replace(DB_PASS, '***')); // não mostra a senha no terminal

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erro: ${error.message}`);
    return;
  }
  if (stderr) console.error(stderr);
  console.log(stdout);
  console.log("✅ Models gerados com sucesso!");
});
