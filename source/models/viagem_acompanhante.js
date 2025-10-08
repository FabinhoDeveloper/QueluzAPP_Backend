const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viagem_acompanhante', {
    viagem_id_viagem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'viagem',
        key: 'id_viagem'
      }
    },
    acompanhante_id_acompanhante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'acompanhante',
        key: 'id_acompanhante'
      }
    },
    solicitante_viagem_id_solicitante_viagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'solicitante_viagem',
        key: 'id_solicitante_viagem'
      }
    }
  }, {
    sequelize,
    tableName: 'viagem_acompanhante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "viagem_id_viagem" },
          { name: "acompanhante_id_acompanhante" },
        ]
      },
      {
        name: "viagem_acompanhante_acompanhante_id_acompanhante_fkey",
        using: "BTREE",
        fields: [
          { name: "acompanhante_id_acompanhante" },
        ]
      },
      {
        name: "viagem_acompanhante_solicitante_viagem_id_solicitante_viage_fkey",
        using: "BTREE",
        fields: [
          { name: "solicitante_viagem_id_solicitante_viagem" },
        ]
      },
    ]
  });
};
