import util from "util";
const executeCommand = util.promisify(require("child_process").exec);

interface Result {
    stdout: string | undefined,
    stderr: string
}

export const executeCommandWithTimeout = async (command: string, timeoutlimit: number): Promise<Result | undefined> => {
    try {
        const { stdout, stderr } = await executeCommand(command);

        // console.log('Standard Output:', stdout);
        // console.error('Standard Error:', stderr);

        return { stdout, stderr };
    } catch (error: any) {
        if (error.stderr) {
            return { stdout: undefined, stderr: error.stderr }
        } else {
            return { stdout: undefined, stderr: "Problem running code." }
        }
    }
};