import {sequelizeConnection} from "./mainSequelize";
const sequelize = new sequelizeConnection();
const { DataTypes, Model } = require('sequelize');
export class BaseDatNomenclator extends Model {}

BaseDatNomenclator.init({
    // Model attributes are defined here
    id_nomenclators: {type: DataTypes.BIGINT,allowNull: true,primaryKey: true },
    name: {type: DataTypes.STRING,allowNull: false},
    descripcion: {type: DataTypes.STRING,allowNull: true},
    idtype: {type: DataTypes.INTEGER,allowNull: false}

}, {

    sequelize:sequelize.getSequelize(), // We need to pass the connection instance
    tableName: 'dat_nomenclators',
    timestamps: false,
    modelName: 'NomenclatorModel' // We need to choose the model name
});



