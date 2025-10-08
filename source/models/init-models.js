var DataTypes = require("sequelize").DataTypes;
var _acompanhante = require("./acompanhante");
var _carro = require("./carro");
var _categoria_mensagem = require("./categoria_mensagem");
var _funcao = require("./funcao");
var _funcionario = require("./funcionario");
var _funcionario_funcao = require("./funcionario_funcao");
var _mensagem_ouvidoria = require("./mensagem_ouvidoria");
var _parada = require("./parada");
var _solicitante_viagem = require("./solicitante_viagem");
var _status_carro = require("./status_carro");
var _status_mensagem = require("./status_mensagem");
var _status_viagem = require("./status_viagem");
var _tipo_carro = require("./tipo_carro");
var _usuario = require("./usuario");
var _viagem = require("./viagem");
var _viagem_acompanhante = require("./viagem_acompanhante");
var _viagem_usuario = require("./viagem_usuario");

function initModels(sequelize) {
  var acompanhante = _acompanhante(sequelize, DataTypes);
  var carro = _carro(sequelize, DataTypes);
  var categoria_mensagem = _categoria_mensagem(sequelize, DataTypes);
  var funcao = _funcao(sequelize, DataTypes);
  var funcionario = _funcionario(sequelize, DataTypes);
  var funcionario_funcao = _funcionario_funcao(sequelize, DataTypes);
  var mensagem_ouvidoria = _mensagem_ouvidoria(sequelize, DataTypes);
  var parada = _parada(sequelize, DataTypes);
  var solicitante_viagem = _solicitante_viagem(sequelize, DataTypes);
  var status_carro = _status_carro(sequelize, DataTypes);
  var status_mensagem = _status_mensagem(sequelize, DataTypes);
  var status_viagem = _status_viagem(sequelize, DataTypes);
  var tipo_carro = _tipo_carro(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var viagem = _viagem(sequelize, DataTypes);
  var viagem_acompanhante = _viagem_acompanhante(sequelize, DataTypes);
  var viagem_usuario = _viagem_usuario(sequelize, DataTypes);

  acompanhante.belongsToMany(viagem, { as: 'viagem_id_viagem_viagems', through: viagem_acompanhante, foreignKey: "acompanhante_id_acompanhante", otherKey: "viagem_id_viagem" });
  funcao.belongsToMany(funcionario, { as: 'funcionario_id_funcionario_funcionarios', through: funcionario_funcao, foreignKey: "funcao_id_funcao", otherKey: "funcionario_id_funcionario" });
  funcionario.belongsToMany(funcao, { as: 'funcao_id_funcao_funcaos', through: funcionario_funcao, foreignKey: "funcionario_id_funcionario", otherKey: "funcao_id_funcao" });
  usuario.belongsToMany(viagem, { as: 'viagem_id_viagem_viagem_viagem_usuarios', through: viagem_usuario, foreignKey: "usuario_id_usuario", otherKey: "viagem_id_viagem" });
  viagem.belongsToMany(acompanhante, { as: 'acompanhante_id_acompanhante_acompanhantes', through: viagem_acompanhante, foreignKey: "viagem_id_viagem", otherKey: "acompanhante_id_acompanhante" });
  viagem.belongsToMany(usuario, { as: 'usuario_id_usuario_usuarios', through: viagem_usuario, foreignKey: "viagem_id_viagem", otherKey: "usuario_id_usuario" });
  viagem_acompanhante.belongsTo(acompanhante, { as: "acompanhante_id_acompanhante_acompanhante", foreignKey: "acompanhante_id_acompanhante"});
  acompanhante.hasMany(viagem_acompanhante, { as: "viagem_acompanhantes", foreignKey: "acompanhante_id_acompanhante"});
  viagem.belongsTo(carro, { as: "carro_id_carro_carro", foreignKey: "carro_id_carro"});
  carro.hasMany(viagem, { as: "viagems", foreignKey: "carro_id_carro"});
  mensagem_ouvidoria.belongsTo(categoria_mensagem, { as: "categoria_mensagem_id_categoria_mensagem_categoria_mensagem", foreignKey: "categoria_mensagem_id_categoria_mensagem"});
  categoria_mensagem.hasMany(mensagem_ouvidoria, { as: "mensagem_ouvidoria", foreignKey: "categoria_mensagem_id_categoria_mensagem"});
  funcionario_funcao.belongsTo(funcao, { as: "funcao_id_funcao_funcao", foreignKey: "funcao_id_funcao"});
  funcao.hasMany(funcionario_funcao, { as: "funcionario_funcaos", foreignKey: "funcao_id_funcao"});
  funcionario_funcao.belongsTo(funcionario, { as: "funcionario_id_funcionario_funcionario", foreignKey: "funcionario_id_funcionario"});
  funcionario.hasMany(funcionario_funcao, { as: "funcionario_funcaos", foreignKey: "funcionario_id_funcionario"});
  viagem.belongsTo(funcionario, { as: "funcionario_id_funcionario_funcionario", foreignKey: "funcionario_id_funcionario"});
  funcionario.hasMany(viagem, { as: "viagems", foreignKey: "funcionario_id_funcionario"});
  parada.belongsTo(solicitante_viagem, { as: "solicitante_viagem_id_solicitante_viagem_solicitante_viagem", foreignKey: "solicitante_viagem_id_solicitante_viagem"});
  solicitante_viagem.hasMany(parada, { as: "paradas", foreignKey: "solicitante_viagem_id_solicitante_viagem"});
  viagem_acompanhante.belongsTo(solicitante_viagem, { as: "solicitante_viagem_id_solicitante_viagem_solicitante_viagem", foreignKey: "solicitante_viagem_id_solicitante_viagem"});
  solicitante_viagem.hasMany(viagem_acompanhante, { as: "viagem_acompanhantes", foreignKey: "solicitante_viagem_id_solicitante_viagem"});
  carro.belongsTo(status_carro, { as: "status_carro_id_status_carro_status_carro", foreignKey: "status_carro_id_status_carro"});
  status_carro.hasMany(carro, { as: "carros", foreignKey: "status_carro_id_status_carro"});
  viagem_usuario.belongsTo(status_viagem, { as: "status_viagem_id_status_viagem_status_viagem", foreignKey: "status_viagem_id_status_viagem"});
  status_viagem.hasMany(viagem_usuario, { as: "viagem_usuarios", foreignKey: "status_viagem_id_status_viagem"});
  carro.belongsTo(tipo_carro, { as: "tipo_carro_id_tipo_carro_tipo_carro", foreignKey: "tipo_carro_id_tipo_carro"});
  tipo_carro.hasMany(carro, { as: "carros", foreignKey: "tipo_carro_id_tipo_carro"});
  funcionario.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasOne(funcionario, { as: "funcionario", foreignKey: "usuario_id_usuario"});
  mensagem_ouvidoria.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasMany(mensagem_ouvidoria, { as: "mensagem_ouvidoria", foreignKey: "usuario_id_usuario"});
  viagem_usuario.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasMany(viagem_usuario, { as: "viagem_usuarios", foreignKey: "usuario_id_usuario"});
  parada.belongsTo(viagem, { as: "viagem_id_viagem_viagem", foreignKey: "viagem_id_viagem"});
  viagem.hasMany(parada, { as: "paradas", foreignKey: "viagem_id_viagem"});
  viagem_acompanhante.belongsTo(viagem, { as: "viagem_id_viagem_viagem", foreignKey: "viagem_id_viagem"});
  viagem.hasMany(viagem_acompanhante, { as: "viagem_acompanhantes", foreignKey: "viagem_id_viagem"});
  viagem_usuario.belongsTo(viagem, { as: "viagem_id_viagem_viagem", foreignKey: "viagem_id_viagem"});
  viagem.hasMany(viagem_usuario, { as: "viagem_usuarios", foreignKey: "viagem_id_viagem"});

  return {
    acompanhante,
    carro,
    categoria_mensagem,
    funcao,
    funcionario,
    funcionario_funcao,
    mensagem_ouvidoria,
    parada,
    solicitante_viagem,
    status_carro,
    status_mensagem,
    status_viagem,
    tipo_carro,
    usuario,
    viagem,
    viagem_acompanhante,
    viagem_usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
