const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mensagem_ouvidoria', {
    id_mensagem_ouvidoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    categoria_mensagem_id_categoria_mensagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria_mensagem',
        key: 'id_categoria_mensagem'
      }
    },
    assunto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nome_solicitante: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_solicitante: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    numero_protocolo: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    mensagem: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_envio: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: "current_timestamp(6)"
    },
    status_mensagem: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mensagem_ouvidoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_mensagem_ouvidoria" },
        ]
      },
      {
        name: "mensagem_ouvidoria_categoria_mensagem_id_categoria_mensagem_fkey",
        using: "BTREE",
        fields: [
          { name: "categoria_mensagem_id_categoria_mensagem" },
        ]
      },
      {
        name: "mensagem_ouvidoria_usuario_id_usuario_fkey",
        using: "BTREE",
        fields: [
          { name: "usuario_id_usuario" },
        ]
      },
    ]
  });
};
