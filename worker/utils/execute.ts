import fs from "fs";
import path from "path";
import { writeToFile, deleteFile } from "./fileManager";
import { executeCommandWithTimeout } from "./commandExecution"
import { getContainerName, getCommandFunction } from "./utils";
import { executionVariables, extensionName } from "../config/config";
import { setData } from "./redisClient";



interface Data {
    src: string,
    input: string,
    lang: string,
    id: string
}

export const execute = async (data: Data) => {
    try {
        // const extension = getExtension(data.lang);
        const codeFilePath = path.join(__dirname, "..", "shared", `${data.id}`, `code.${extensionName[data.lang]}`);
        const inputFilePath = path.join(__dirname, "..", "shared", `${data.id}`, `input.txt`);
        const dir = path.join(__dirname, "..", "shared", `${data.id}`);
        // const templateDir = path.join(__dirname, "..", "templates", "entrypoint-template.sh");
        await fs.promises.mkdir(dir);
        if (data.src !== "") {
            writeToFile(codeFilePath, data.src);
        } else {
            throw new Error("source code not found");
        }

        writeToFile(inputFilePath, data.input);

        const executionPath = path.join(__dirname, "..", "shared");
        console.log(executionPath);
        const containerName = getContainerName(data.lang);
        // const executionCommand = getCommandFunction[data.lang](data.lang, data.id);

        const command = `docker run --rm -e ID=${data.id} -e memoryLimit=${executionVariables.memoryLimit} -e timeLimit=${executionVariables.timeLimit} -v ${executionPath}:/usr/${extensionName[data.lang]}/shared ${containerName}`;

        const result = await executeCommandWithTimeout(command, 5);
        console.log("container spinned..");
        console.log(result);
        if (!result) {
            await setData({ status: "completed", stderr: "Problem running your code." }, data.id);
        } else if (result.stdout) {
            await setData({ status: "completed", stdout: result.stdout }, data.id);
        } else {
            if (result.stderr) {
                await setData({ status: "completed", stderr: result.stderr }, data.id);
            } else {
                await setData({ status: "completed", stderr: "Problem running your code." }, data.id);
            }
        }
        deleteFile(dir);
    } catch (e: any) {
        console.log("execution error........")
        console.log(e);
        console.log("--------------------")
        await setData({ status: "completed", stderr: "Problem running your code." }, data.id);
    }
}

