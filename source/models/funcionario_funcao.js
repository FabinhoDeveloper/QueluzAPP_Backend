const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funcionario_funcao', {
    funcionario_id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'funcionario',
        key: 'id_funcionario'
      }
    },
    funcao_id_funcao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'funcao',
        key: 'id_funcao'
      }
    }
  }, {
    sequelize,
    tableName: 'funcionario_funcao',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "funcionario_id_funcionario" },
          { name: "funcao_id_funcao" },
        ]
      },
      {
        name: "funcionario_funcao_funcao_id_funcao_fkey",
        using: "BTREE",
        fields: [
          { name: "funcao_id_funcao" },
        ]
      },
    ]
  });
};
