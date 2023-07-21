"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonDB = void 0;
var sequelize_1 = require("sequelize");
var SingletonDB = /** @class */ (function () {
    function SingletonDB() {
        var db = process.env.PGDATABASE;
        var username = process.env.PGUSER;
        var password = process.env.PGPASSWORD;
        var host = process.env.PGHOST;
        var port = Number(process.env.PGPORT);
        this.singleConnection = new sequelize_1.Sequelize(db, username, password, {
            host: host,
            port: port,
            dialect: 'postgres',
            dialectOptions: {},
            define: {
                freezeTableName: true
            },
            logging: false
        });
    }
    SingletonDB.getInstance = function () {
        if (!SingletonDB.instance) {
            SingletonDB.instance = new SingletonDB();
        }
        return SingletonDB.instance;
    };
    SingletonDB.prototype.getConnection = function () {
        return this.singleConnection;
    };
    return SingletonDB;
}());
exports.SingletonDB = SingletonDB;
