import {Sequelize} from "sequelize";

export class SingletonDB { // connessione al db realizzata con classe Singleton
    private static instance: SingletonDB;
    private singleConnection: Sequelize; 

    private constructor() { 
        const db: string = process.env.PGDATABASE as string;
        const username: string = process.env.PGUSER as string;
        const password: string = process.env.PGPASSWORD as string;
        const host: string = process.env.PGHOST as string;
        const port: number = Number(process.env.PGPORT);
        this.singleConnection = new Sequelize(db, username, password, {
            host: host,
            port: port,
            dialect: 'postgres',
            dialectOptions: {
            },  
            define: {
                freezeTableName: true
            },
            logging:false});
            
    }

    public static getInstance(): SingletonDB {
        if (!SingletonDB.instance) {
            SingletonDB.instance = new SingletonDB();
        }
        return SingletonDB.instance;
    }

    public getConnection() {
        return this.singleConnection;        
    }

}