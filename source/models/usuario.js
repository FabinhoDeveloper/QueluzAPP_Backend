const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    primeiro_nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cpf: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: "usuario_cpf_key"
    },
    telefone: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: "usuario_telefone_key"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "usuario_email_key"
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefone_confirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    sobrenome: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "usuario_cpf_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cpf" },
        ]
      },
      {
        name: "usuario_telefone_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "telefone" },
        ]
      },
      {
        name: "usuario_email_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
