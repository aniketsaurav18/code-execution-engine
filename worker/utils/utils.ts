import * as config from "../config/config"

export const getContainerName = (lang: string) => {
    return config.containerName[lang];
}

const getCommandCpp = (input: string, id: string): string => {
    if (input) {
        return `./exec < ./shared/${id}/input.txt`;
    } else {
        return "./exec";
    }
}
const getCommandPython = (input: string, id: string): string => {
    if (input) {
        return `python3 ./shared/${id}/code.py < ./shared/${id}/input.txt`;
    } else {
        return `python3 ./shared/${id}/code.py`
    }
}

export const getCommandFunction: { [key: string]: Function } = {
    "cpp": getCommandCpp,
    "python": getCommandPython
};