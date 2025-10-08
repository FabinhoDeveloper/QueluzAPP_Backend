const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viagem', {
    id_viagem: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    funcionario_id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'funcionario',
        key: 'id_funcionario'
      }
    },
    carro_id_carro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'carro',
        key: 'id_carro'
      }
    },
    data_partida: {
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: "current_timestamp(6)"
    }
  }, {
    sequelize,
    tableName: 'viagem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_viagem" },
        ]
      },
      {
        name: "viagem_carro_id_carro_fkey",
        using: "BTREE",
        fields: [
          { name: "carro_id_carro" },
        ]
      },
      {
        name: "viagem_funcionario_id_funcionario_fkey",
        using: "BTREE",
        fields: [
          { name: "funcionario_id_funcionario" },
        ]
      },
    ]
  });
};
