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
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false
	}
);

export async function saveImg(dataset_id, elementPath) {
	try{
		if( await Files.create(
				{
					fk_dataset: dataset_id,
					filepath: elementPath
				}
			)
		)	 return true;
		else return false;
	}
	catch(err){
		console.log(err);
		return false;
	}
}