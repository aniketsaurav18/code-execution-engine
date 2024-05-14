import util from "util";
const executeCommand = util.promisify(require("child_process").exec);

interface Result {
    stdout: string | undefined,
    stderr: string
}

export const executeCommandWithTimeout = async (command: string, timeoutlimit: number): Promise<Result | undefined> => {
    try {
        console.log("executing command..")
        const { stdout, stderr } = await executeCommand(command);
        return { stdout, stderr };
    } catch (error: any) {
        if (error.stderr) {
            return { stdout: undefined, stderr: error.stderr }
        } else {
            return { stdout: undefined, stderr: "Problem running code." }
        }
    }
};