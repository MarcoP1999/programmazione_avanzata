import { DataTypes } from "sequelize";
import { SingletonDB } from "../model/Database";
var sequelize = SingletonDB.getInstance().getConnection();
var Dataset = sequelize.define("Files", {
    file_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fk_dataset: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    file: {
        type: DataTypes.BLOB,
        allowNull: false,
    }
});
