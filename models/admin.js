'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admins extends Model {
        static associate(models) {}
    };
    Admins.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        isBanned: DataTypes.BOOLEAN,
        name: {
          allowNull: false,
          type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Admins',
    });
    return Admins;
};