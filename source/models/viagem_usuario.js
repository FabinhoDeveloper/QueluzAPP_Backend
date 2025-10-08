const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viagem_usuario', {
    viagem_id_viagem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'viagem',
        key: 'id_viagem'
      }
    },
    usuario_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    status_viagem_id_status_viagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'status_viagem',
        key: 'id_status_viagem'
      }
    }
  }, {
    sequelize,
    tableName: 'viagem_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "viagem_id_viagem" },
          { name: "usuario_id_usuario" },
        ]
      },
      {
        name: "viagem_usuario_status_viagem_id_status_viagem_fkey",
        using: "BTREE",
        fields: [
          { name: "status_viagem_id_status_viagem" },
        ]
      },
      {
        name: "viagem_usuario_usuario_id_usuario_fkey",
        using: "BTREE",
        fields: [
          { name: "usuario_id_usuario" },
        ]
      },
    ]
  });
};
