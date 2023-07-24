import { DataTypes, Model, Sequelize } from "sequelize";
import { SingletonDB } from "../model/Database";

const sequelize = SingletonDB.getInstance().getConnection();

const Dataset = sequelize.define(
	"Datasets",
	{
		dataset_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
        	autoIncrement: true,
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

export async function newDataset(owner: string, name: string ) {
	try{
		let ds = await Dataset.create({fk_user: owner, name: name});
		if(ds)	return true;
	}
	catch (err)	{
		console.log(err);
	}
}

export async function getDatasets(role: Number, owner: string ) {
	try{
		if(role == 0) return await Dataset.findAll();
		else 
			return await Dataset.findAll({
				where: { fk_user: owner }
			});
	}
	catch (err)	{
		console.log(err);
	}
}