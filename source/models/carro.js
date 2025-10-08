const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carro', {
    id_carro: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_carro_id_tipo_carro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_carro',
        key: 'id_tipo_carro'
      }
    },
    status_carro_id_status_carro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'status_carro',
        key: 'id_status_carro'
      }
    },
    modelo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    placa: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fabricante: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'carro',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_carro" },
        ]
      },
      {
        name: "carro_status_carro_id_status_carro_fkey",
        using: "BTREE",
        fields: [
          { name: "status_carro_id_status_carro" },
        ]
      },
      {
        name: "carro_tipo_carro_id_tipo_carro_fkey",
        using: "BTREE",
        fields: [
          { name: "tipo_carro_id_tipo_carro" },
        ]
      },
    ]
  });
};
