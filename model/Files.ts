import { DataTypes, Model, Sequelize } from "sequelize";
import { SingletonDB } from "../model/Database";
import { ErrorReply } from "redis";

const sequelize = SingletonDB.getInstance().getConnection();

const Files = sequelize.define(
	"Files",
	{
		file_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
        	autoIncrement: true,
		},
		fk_dataset: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		filename: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		file: {
			type: DataTypes.BLOB,
			allowNull: false
		}
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false
	}
);

export async function saveImg(img) {
	try{
		Files.create(img);
		return true;
	}
	catch(err){
		console.log(err);
		return false;
	}
}