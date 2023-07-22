import { DataTypes, Model, Sequelize } from "sequelize";
import { SingletonDB } from "../model/Database";

const sequelize = SingletonDB.getInstance().getConnection();

const Dataset = sequelize.define(
  "Datasets",
  {
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
  },
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false
  }
);