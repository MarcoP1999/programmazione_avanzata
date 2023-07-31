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
exports.unpackZip = exports.checkFormat = exports.billSegmentation = exports.billUpload = exports.saveImgFS = void 0;
var datasetModel = __importStar(require("../model/Datasets.js"));
var userModel = __importStar(require("../model/Users.js"));
var fileModel = __importStar(require("../model/Files.js"));
var fs = require('fs');
var path = require('path');
var AdmZip = require("adm-zip");
function saveImgFS(req, res, next, currentFile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (fs.copyFile(currentFile, res.locals.FSpath, fs.constants.COPYFILE_EXCL, function (err) {
                if (err) {
                    console.log("File '" + res.locals.FSpath + "' copy to FileSystem failed");
                    return false;
                }
                else
                    return true;
            }))
                return [2 /*return*/, true];
            return [2 /*return*/];
        });
    });
}
exports.saveImgFS = saveImgFS;
function billUpload(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var currentBudget;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.getBudget(req.user.email)];
                case 1:
                    currentBudget = (_a.sent()).dataValues.budget;
                    console.log("Current budget: " + currentBudget);
                    console.log("N of files to Upload: " + req.user.files.length);
                    if (currentBudget >= 0.5 * req.user.files.length) {
                        req.budgetProposal = currentBudget - (0.5 * req.user.files.length);
                        console.log("New budget proposal: " + req.budgetProposal);
                        next();
                    }
                    else {
                        console.log("Not enough credit for user");
                        res.status(401).send("Not enough credit for user: " + req.user.email);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.billUpload = billUpload;
function billSegmentation(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var currentBudget, fileCount, _a, _b, budgetProposal;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, userModel.getBudget(req.user.email)];
                case 1:
                    currentBudget = (_c.sent()).dataValues.budget;
                    console.log("current budget: " + currentBudget);
                    _b = (_a = fileModel).readFiles;
                    return [4 /*yield*/, datasetModel.getdatasetPK(req.user.dataset, req.user.email)];
                case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 3:
                    fileCount = (_c.sent()).length;
                    console.log("N of files to segment: " + fileCount);
                    if (currentBudget >= 4 * fileCount) {
                        budgetProposal = currentBudget - (4 * fileCount);
                        userModel.updateBudget(budgetProposal, req.user.email);
                        console.log("New budget: " + budgetProposal);
                        next();
                    }
                    else {
                        console.log("Not enough credit for user");
                        res.status(401).send("Required " + (4 * fileCount) + " credits to start segmentation.\n "
                            + req.user.email + " has just " + currentBudget);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.billSegmentation = billSegmentation;
function checkFormat(req, res, next) {
    var accepted_extensions = [".jpg", ".jpeg", ".bmp", ".png", ".zip"];
    var accepted = true;
    req.user.files.forEach(function (element) {
        if (!accepted_extensions.includes(path.extname(element)))
            accepted = false;
    });
    if (accepted) {
        console.log("checkFormat OK");
        next();
    }
    else
        res.status(400).send("Files unsupported" + req.user.files);
}
exports.checkFormat = checkFormat;
function unpackZip(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var zip, zipEntries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(path.extname(req.user.files[0]) == ".zip")) return [3 /*break*/, 2];
                    console.log("is a zip");
                    zip = new AdmZip(req.user.files[0]);
                    zipEntries = zip.getEntries();
                    return [4 /*yield*/, zip.extractAllTo("./unzipped", true)];
                case 1:
                    _a.sent();
                    updateFilesList(req, zipEntries);
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    next();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.unpackZip = unpackZip;
function updateFilesList(req, elemList) {
    req.user.files = []; //clear request file list => not a zip anymore
    elemList.forEach(function (element) {
        if (!element.isDirectory)
            req.user.files.push("./unzipped/" + element.name);
    });
}
