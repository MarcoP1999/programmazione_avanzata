import { DataTypes } from "sequelize";
import { SingletonDB } from "../model/Database";
var sequelize = SingletonDB.getInstance().getConnection();
var Dataset = sequelize.define("Datasets", {
    dataset_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fk_user: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
});
