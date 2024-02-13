import * as fs from 'fs';

export const writeToFile = async (filePath: string, content: string) => {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Error writing to the file:", err);
            throw err;
        } else {
            console.log("content has been written to the file successfully.");
        }
    });
}

export const deleteFile = async (directoryPath: string) => {
    // fs.readdir(directoryPath, (err, files) => {
    //     if (err) {
    //         console.error('Error reading directory:', err);
    //         return;
    //     }
    //     for (const file of files) {
    //         const filePath = directoryPath + '/' + file;
    //         // Remove each file or subdirectory
    //         fs.unlink(filePath, (err) => {
    //             if (err) {
    //                 console.error('Error removing file:', err);
    //             } else {
    //                 console.log('File removed:', filePath);
    //             }
    //         });
    //     }
    //     fs.rmdir(directoryPath, (err) => {
    //         if (err) {
    //             console.error('Error removing directory:', err);
    //         } else {
    //             console.log('Directory removed:', directoryPath);
    //         }
    //     });
    // });
    fs.rm(directoryPath, { recursive: true, force: true, maxRetries: 3 }, (err) => {
        if (err) {
            console.log(`Deletion of ${directoryPath} failed`);
            console.log(err.message);
        } else {
            console.log(`Deletion of ${directoryPath} successful`)
        }
    });
}