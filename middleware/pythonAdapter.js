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
exports.segmentation = exports.read = exports.configModel = void 0;
var spawn = require('child_process').spawn;
var pyOutput = String();
function configModel(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var process, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, spawn('python3', ['./python/SAM_model.py'])];
                case 1:
                    process = _d.sent();
                    process.stdout.on('data', function (data) {
                        // Do something with the data returned from python script
                        pyOutput += data.toString().split("\n");
                    });
                    _b = (_a = process).on;
                    _c = ['close'];
                    return [4 /*yield*/, function (req, res, next) {
                            //res.locals.configured = true;
                            console.log("Model configured: " /*+res.locals.configured*/);
                        }];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                case 3:
                    _d.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.configModel = configModel;
function read(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var python;
        return __generator(this, function (_a) {
            python = spawn('python3', ['./python/basic_test.py', req.user.email]);
            python.stdout.on('data', function (data) {
                // Do something with the data returned from python script
                pyOutput += data.toString().split("\n");
            });
            python.on('close', function (code) {
                console.log("Executed model configuration " + code);
                // send data to browser
                //res.locals.answer = pyOutput;
                res.status(200).send(pyOutput);
            });
            return [2 /*return*/];
        });
    });
}
exports.read = read;
/* export async function segmentation(req, res, next){
    // spawn new child process to call the python script
    const process = await spawn('python3', ['./python/SAM_inference.py', req.user.files ] );
    
    process.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        pyOutput = data.toString()
    });
       
    process.on('close', (code) => {
        console.log("Inference completed => result sent to client");
        res.status(200).json( JSON.parse( pyOutput ) );
    });
} */
function segmentation(imgList, done) {
    // spawn new child process to call the python script
    var process = spawn('python3', ['./python/SAM_inference.py', imgList[0]]);
    process.stdout.on('data', function (data) {
        // Do something with the data returned from python script
        pyOutput = data.toString();
    });
    process.on('close', function (code) {
        console.log("Inference completed");
        done();
        return pyOutput;
        //res.status(200).json( JSON.parse( pyOutput ) );
    });
}
exports.segmentation = segmentation;
