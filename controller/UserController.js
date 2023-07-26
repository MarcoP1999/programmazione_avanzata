"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserController = void 0;
var userModel = __importStar(require("../model/Users.js"));
var datasetModel = __importStar(require("../model/Datasets.js"));
var uploader = __importStar(require("../middleware/fileUploader.js"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.getBudget = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var retrieved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retrieved = null;
                        return [4 /*yield*/, userModel.getBudget(req.user.email)];
                    case 1:
                        retrieved = _a.sent();
                        if (retrieved)
                            res.status(200).send("Budget for '" + req.user.email + "' is: " + retrieved.budget);
                        else
                            res.status(404).send("User '" + req.user.email + "' not found");
                        return [2 /*return*/];
                }
            });
        }); };
        this.createDataset = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var yourDatasets, datasets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        yourDatasets = [];
                        return [4 /*yield*/, datasetModel.getDatasets(req.user.role, req.user.email)];
                    case 1:
                        datasets = _a.sent();
                        datasets.forEach(function (item) {
                            yourDatasets.push(item.dataValues.name);
                        });
                        if (yourDatasets.includes(req.user.dataset))
                            res.status(400).send("Dataset '" + req.user.dataset + "' already exists for user: " + req.user.email);
                        else if (datasetModel.newDataset(req.user.email, req.user.dataset))
                            res.status(200).send("Dataset '" + req.user.dataset + "' created");
                        else
                            res.sendStatus(400);
                        return [2 /*return*/];
                }
            });
        }); };
        this.renameDataset = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var yourDatasets, datasets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        yourDatasets = [];
                        return [4 /*yield*/, datasetModel.getDatasets(req.user.role, req.user.email)];
                    case 1:
                        datasets = _a.sent();
                        datasets.forEach(function (item) {
                            yourDatasets.push(item.dataValues.name);
                        });
                        if (yourDatasets.includes(req.user.newName))
                            res.status(400).send("Dataset '" + req.user.dataset + "' already exists");
                        else {
                            if (datasetModel.updateDataset(req.user.dataset, req.user.newName))
                                res.status(200).send("Dataset '" + req.user.dataset + "' renamed to: " + req.user.newName);
                            else
                                res.status(404).send("Dataset to rename doesn't exist");
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.upload = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var savedPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, uploader.upload(req, res, req.user.file)];
                    case 1:
                        savedPath = _a.sent();
                        if (savedPath)
                            res.status(200).send("File '" + req.user.file + " ' uploaded in: " + savedPath);
                        else
                            res.status(400).send("DB writing error");
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return UserController;
}());
exports.UserController = UserController;
