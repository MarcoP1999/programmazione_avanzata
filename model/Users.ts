import { DataTypes, Model, Sequelize } from "sequelize";
import { SingletonDB } from "../model/Database";

const sequelize = SingletonDB.getInstance().getConnection();

const User = sequelize.define(
  "users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    modelName: "users",
    timestamps: false,
  }
);

/**
 * restituisce il budget dell'utente, selezionandolo via email
 * @param email email dell'utente
 * @returns budget
 */
export async function getBudget(email: string) {
    const budget = await User.findOne({
      attributes: ["budget"],
      where: { email: `${email}` },
    });
    return budget;
  }
  
  /**
   * controlla esistenza di un utente tramite la email.
   * @param email 
   * @returns oggetto user trovato.
   */
  export async function checkUser(email: string) {
    const user = await User.findOne({
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
  export async function updateBudget(newBudget: Number, email: string) {
    const user = await User.update(
      {
        budget: newBudget,
      },
      {
        where: { email: `${email}` },
      }
    );
  }