import { DataTypes, Model, Sequelize } from "sequelize";
import { SingletonDB } from "../model/Database";

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
		filepath: {
			type: DataTypes.STRING(250),
			allowNull: false,
		}
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false
	}
);

export async function saveImgDB(dataset_id, elementPath) {
	try{
		let newfile = await Files.create({
			fk_dataset: dataset_id,
			filepath: elementPath
		});
		if(newfile)
			return true;
	}
	catch (err)	{
		console.log(err);
		return false;
	}
}

export async function readFiles(dataset_id){
	try{
		let files = await Files.findAll({
			attributes: ['filepath'],
			where: { fk_dataset: dataset_id }
		});
		return files;
	}
	catch (err)	{
		console.log(err);
	}
}