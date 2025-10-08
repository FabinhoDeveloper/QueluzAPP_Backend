const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solicitante_viagem', {
    id_solicitante_viagem: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_completo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefone: {
      type: DataTypes.CHAR(11),
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'solicitante_viagem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_solicitante_viagem" },
        ]
      },
    ]
  });
};
