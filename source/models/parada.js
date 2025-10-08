const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parada', {
    id_parada: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    solicitante_viagem_id_solicitante_viagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'solicitante_viagem',
        key: 'id_solicitante_viagem'
      }
    },
    viagem_id_viagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'viagem',
        key: 'id_viagem'
      }
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'parada',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_parada" },
        ]
      },
      {
        name: "parada_solicitante_viagem_id_solicitante_viagem_fkey",
        using: "BTREE",
        fields: [
          { name: "solicitante_viagem_id_solicitante_viagem" },
        ]
      },
      {
        name: "parada_viagem_id_viagem_fkey",
        using: "BTREE",
        fields: [
          { name: "viagem_id_viagem" },
        ]
      },
    ]
  });
};
