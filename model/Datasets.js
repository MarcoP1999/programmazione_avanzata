"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var Database_1 = require("../model/Database");
var sequelize = Database_1.SingletonDB.getInstance().getConnection();
var Dataset = sequelize.define("Datasets", {
    dataset_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fk_user: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    }
});
