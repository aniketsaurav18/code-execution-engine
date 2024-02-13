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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileManager_1 = require("./fileManager");
const commandExecution_1 = require("./commandExecution");
const utils_1 = require("./utils");
const config_1 = require("../config/config");
const redisClient_1 = require("./redisClient");
const execute = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeFilePath = path_1.default.join(__dirname, "..", "shared", `${data.id}`, `code.${config_1.extensionName[data.lang]}`);
        const inputFilePath = path_1.default.join(__dirname, "..", "shared", `${data.id}`, `input.txt`);
        const dir = path_1.default.join(__dirname, "..", "shared", `${data.id}`);
        yield fs_1.default.promises.mkdir(dir);
        if (data.src !== "") {
            (0, fileManager_1.writeToFile)(codeFilePath, data.src);
        }
        else {
            throw new Error("source code not found");
        }
        (0, fileManager_1.writeToFile)(inputFilePath, data.input);
        const executionPath = path_1.default.join(__dirname, "..", "shared");
        console.log(executionPath);
        const containerName = (0, utils_1.getContainerName)(data.lang);
        const command = `docker run --rm -e ID=${data.id} -e memoryLimit=${config_1.executionVariables.memoryLimit} -e timeLimit=${config_1.executionVariables.timeLimit} -v ${executionPath}:/usr/${config_1.extensionName[data.lang]}/shared ${containerName}`;
        const result = yield (0, commandExecution_1.executeCommandWithTimeout)(command, 5);
        console.log("container spinned..");
        console.log(result);
        if (!result) {
            yield (0, redisClient_1.setData)({ status: "completed", stderr: "Problem running your code." }, data.id);
        }
        else if (result.stdout) {
            yield (0, redisClient_1.setData)({ status: "completed", stdout: result.stdout }, data.id);
        }
        else {
            if (result.stderr) {
                yield (0, redisClient_1.setData)({ status: "completed", stderr: result.stderr }, data.id);
            }
            else {
                yield (0, redisClient_1.setData)({ status: "completed", stderr: "Problem running your code." }, data.id);
            }
        }
        (0, fileManager_1.deleteFile)(dir);
    }
    catch (e) {
        console.log("execution error........");
        console.log(e);
        console.log("--------------------");
        yield (0, redisClient_1.setData)({ status: "completed", stderr: "Problem running your code." }, data.id);
    }
});
exports.execute = execute;
//# sourceMappingURL=execute.js.map