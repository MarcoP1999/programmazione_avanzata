"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var Database_1 = require("../model/Database");
var sequelize = Database_1.SingletonDB.getInstance().getConnection();
var Dataset = sequelize.define("Files", {
    file_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fk_dataset: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    file: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
