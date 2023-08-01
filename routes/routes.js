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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.use(express_1.default.json());
//----------------- AUTH ------------------------------------------
var auth = __importStar(require("../middleware/authorization.js"));
router.use([auth.checkHeader, auth.checkToken, auth.verifyAndAuthenticate]);
router.use(function (err, req, res, next) {
    try {
        if (err instanceof SyntaxError && "body" in err) {
            throw "JSON not valid";
        }
        next();
    }
    catch (e) {
        res.sendStatus(400);
    }
});
//-------------------- USER ------------------------------------------
var UserController_js_1 = require("../controller/UserController.js");
var AdminController_js_1 = require("../controller/AdminController.js");
var userCnt = new UserController_js_1.UserController();
var adminCnt = new AdminController_js_1.AdminController();
router.get("/budget", auth.checkUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userCnt.getBudget(req, res);
        return [2 /*return*/];
    });
}); });
router.patch("/budget", auth.checkUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        adminCnt.setBudget(req, res);
        return [2 /*return*/];
    });
}); });
router.get("/dataset", auth.checkUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        adminCnt.showDatasets(req, res);
        return [2 /*return*/];
    });
}); });
router.post("/dataset", auth.checkUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userCnt.createDataset(req, res);
        return [2 /*return*/];
    });
}); });
router.delete("/dataset", auth.checkUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        adminCnt.deleteDataset(req, res);
        return [2 /*return*/];
    });
}); });
router.patch("/dataset", auth.checkUser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userCnt.renameDataset(req, res);
        return [2 /*return*/];
    });
}); });
var uploader = __importStar(require("../middleware/fileUploader.js"));
var userModel = __importStar(require("../model/Users.js"));
var uuid = require('crypto');
router.post("/upload", auth.checkUser, uploader.checkFormat, uploader.unpackZip, uploader.billUpload, userCnt.getDatasetId, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                req.user.files.forEach(function (currentFile) {
                    res.locals.FSpath = "./images/" + uuid.randomUUID().toString() + ".jpg";
                    uploader.saveImgFS(currentFile, res);
                    uploader.saveImgDB(res);
                });
                return [4 /*yield*/, userModel.updateBudget(req.budgetProposal, req.user.email)];
            case 1:
                _d.sent();
                _b = (_a = res.status(200)).send;
                _c = "Files [" + req.user.files + "] upload complete!" +
                    "\nCurrent budget is: ";
                return [4 /*yield*/, userModel.getBudget(req.user.email)];
            case 2:
                _b.apply(_a, [_c + (_d.sent()).dataValues.budget]);
                return [2 /*return*/];
        }
    });
}); });
//-------------------- Queues ------------------------------------------
var pythonAdapter = __importStar(require("../middleware/pythonAdapter.js"));
var bullmq_1 = require("bullmq");
var ioredis_1 = __importDefault(require("ioredis"));
var connection = new ioredis_1.default(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST, { maxRetriesPerRequest: null });
var queue = new bullmq_1.Queue('AsyncProc', { connection: connection });
var worker = new bullmq_1.Worker(queue.name, function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!uploader.billSegmentation) return [3 /*break*/, 2];
                console.log("Started an async job");
                return [4 /*yield*/, pythonAdapter.segmentation(job.data.images)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err = new Error("Not enough credit");
                job.moveToFailed(err, null, true);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); }, {
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
    connection: connection
});
//-------------------- Python ------------------------------------------
router.get("/process", auth.checkUser, userCnt.getDBfiles, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pid = "pid_" + Math.random().toString(36).slice(10);
                return [4 /*yield*/, queue.add(queue.name, { images: req.user.files }, { jobId: pid })];
            case 1:
                _a.sent();
                res.status(200).send("Job: " + pid + " added to processing queue");
                return [2 /*return*/];
        }
    });
}); });
router.get("/status", auth.checkUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var requestedJob, state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, queue.getJob(req.user.pid)];
            case 1:
                requestedJob = _a.sent();
                if (!requestedJob)
                    res.status(404).send("Job: " + requestedJob.id + " doesn't exist!");
                return [4 /*yield*/, requestedJob.getState()];
            case 2:
                state = _a.sent();
                if (state == "completed")
                    res.status(200).json(JSON.parse(requestedJob.returnvalue));
                else
                    res.status(200).send("Job: " + requestedJob.id + " is " + state.toUpperCase());
                return [2 /*return*/];
        }
    });
}); });
//-------------------- Error Fallback --------------------------------------
router.get("*", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.sendStatus(404);
        return [2 /*return*/];
    });
}); });
router.post("*", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.sendStatus(404);
        return [2 /*return*/];
    });
}); });
module.exports = router;
