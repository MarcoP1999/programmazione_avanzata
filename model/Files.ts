import { DataTypes, Model, Sequelize } from "sequelize";
import { SingletonDB } from "../model/Database";

const sequelize = SingletonDB.getInstance().getConnection();

const Dataset = sequelize.define(
  "Files",
  {
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
  }
);