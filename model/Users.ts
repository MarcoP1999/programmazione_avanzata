import { DataTypes, Model, Sequelize } from "sequelize";
import { SingletonDB } from "../model/Database.js";

const sequelize = SingletonDB.getInstance().getConnection();

const Users = sequelize.define(
	"Users",
	{
		email: {
		type: DataTypes.STRING(30),
		allowNull: false,
		},
		budget: {
		type: DataTypes.REAL,
		allowNull: false,
		}
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false
  	}
);

/**
 * restituisce il budget dell'utente, selezionandolo via email
 * @param email email dell'utente
 * @returns budget
 */
export async function getBudget(email: string) {
	const budget = await Users.findOne({
			attributes: ['budget'],
			where: { email: email },
	});
	return budget;
  }
  
  /**
   * controlla esistenza di un utente tramite la email.
   * @param email 
   * @returns oggetto user trovato.
   */
export async function checkUser(email: string) {
	const user = await Users.findOne({
		attributes: ['email'],
		where: { email: email },
	});
	return user;
}
  
  /**
   * ricarica il budget dell'utente, cercando per email.
   * @param newBudget nuovo budget
   * @param email l'email dell'utente
   */
export async function updateBudget(newBudget: Number, usermail: string) {
	try {
		await Users.update(
			{	budget: newBudget	},
			{	where: { email: usermail}	}
		);
	  } 
	  catch (err) {
			console.log(err);
	  }
	
}