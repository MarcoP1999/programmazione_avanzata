"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataset = exports.deleteDataset = exports.getDatasetIndex = exports.getDatasets = exports.newDataset = void 0;
var sequelize_1 = require("sequelize");
var Database_1 = require("../model/Database");
var sequelize = Database_1.SingletonDB.getInstance().getConnection();
var Dataset = sequelize.define("Datasets", {
    dataset_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fk_user: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
function newDataset(owner, name) {
    return __awaiter(this, void 0, void 0, function () {
        var ds, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Dataset.create({ fk_user: owner, name: name })];
                case 1:
                    ds = _a.sent();
                    if (ds)
                        return [2 /*return*/, true];
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.newDataset = newDataset;
function getDatasets(role, owner) {
    return __awaiter(this, void 0, void 0, function () {
        var datasets, list, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    list = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!(role == 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Dataset.findAll()];
                case 2:
                    datasets = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, Dataset.findAll({
                        where: { fk_user: owner }
                    })];
                case 4:
                    datasets = _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, datasets];
                case 6:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [2 /*return*/, 0];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getDatasets = getDatasets;
function getDatasetIndex(dsName, owner) {
    return __awaiter(this, void 0, void 0, function () {
        var datasets, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Dataset.findOne({
                            attributes: ['dataset_id'],
                            where: {
                                fk_user: owner,
                                name: dsName
                            }
                        })];
                case 1:
                    datasets = _a.sent();
                    return [2 /*return*/, datasets.dataValues.dataset_id];
                case 2:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, 0];
            }
        });
    });
}
exports.getDatasetIndex = getDatasetIndex;
function deleteDataset(which) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Dataset.destroy({
                            where: { name: which }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteDataset = deleteDataset;
function updateDataset(which, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Dataset.update({ name: newName }, {
                            where: { name: which }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_5 = _a.sent();
                    console.log(err_5);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateDataset = updateDataset;
