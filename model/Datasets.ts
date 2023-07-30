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
	let datasets:any;
	let list = [];
	try{
		if(role == 0) //is an admin
			datasets = await Dataset.findAll();
		else
			datasets = await Dataset.findAll({
				where: { fk_user: owner }
			});
		return datasets;
	}
	catch (err)	{
		console.log(err);
		return 0;
	}
}

export async function getdatasetPK(dsName, owner ) {
	
	try{
		let datasets = await Dataset.findOne({ 
			where: { fk_user: owner, name: dsName } 
		})
		return datasets.dataValues.dataset_id;
	}
	catch (err)	{
		console.log(err);
		return false;
	}
}

export async function deleteDataset(which: string ) {
	try{
		await Dataset.destroy({
			where: { name: which }
		});
		return true;
	}
	catch (err)	{
		console.log(err);
		return false;
	}
}

export async function updateDataset(which: string, newName: string ) {
	try{
		return await Dataset.update({ name: newName }, 
			{ 
				where: { name: which } 
			}
		);
	}
	catch (err)	{
		console.log(err);
		return false;
	}
}