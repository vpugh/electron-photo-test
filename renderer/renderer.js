/*
 create an object from the fs module
 */
const fs = require('fs');
const {shell} = require('electron');
/*
 fs module provides a method readdir() which takes, as parameter, the path of the directory, and a callback of what we want to do with the obtained files.
 Here we give it the current directory as the path
 NOTE: The path will always:
 1. Contain the full path, e.g /home/username/Desktop/....to read the Desktop. The full path always starts from the root
 2. Append a slash at the end of the path. e.g /home/username/Desktop should have the / at the end to be /home/username/Desktop/
 */
// fs.readdir('.', (err, files) => {
//     'use strict';
//     //if an error is thrown when reading the directory, we throw it. Otherwise we continue
//     if (err) throw  err;
//     //the files parameter is an array of the files and folders in the path we passed. So we loop through the array, printing each file and folder
//     for (let file of files) {
//         console.log(file);
//     }
// });

/*
 readFolder function to obtain the path
 */
function readFolder(path, backBtn) {
    fs.readdir(path, (err, files) => {
        if (backBtn) {
        console.log('Ok');
        let path = `$../${backBtn}`;
        console.log(path);
        document.getElementById('backBtn').innerHTML = `<button class="btn btn-small btn-default" onclick="readFolder(this.id);" id="${backBtn}">Back</button><br>`;
    }
        files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

        'use strict';
        if (err) throw  err;
        //Dynamically add <ol> tags to the div
        document.getElementById('listed-files').innerHTML = `<ul id="display-files"></ul>`;
        for (let file of files) {
            fs.stat(path + file, (err, stats) => {
                /**
                 *When you double click on a folder or file, we need to obtain the path and name so that we can use it to take action. The easiest way to obtain the path and name for each file and folder, is to store that information in the element itself, as an ID. this is possible since we cannot have two files with the same name in a folder. theID variable below is created by concatenating the path with file name and a / at the end. As indicated earlier, we must have the / at the end of the path.
                 *
                 */
                let theID = `${path}${file}/`;
                if (err) throw err;
                if (stats.isDirectory()) {
                    /**
                     * Add an ondblclick event to each item. With folders, call this same function (recursion) to read the contents of the folder. If its a file, call the openFile function to open the file with the default app.
                     *
                     */
                    document.getElementById('display-files').innerHTML += `<li><i class="fa fa-folder-open"></i><a href="javascript:void(0)" id=${theID} onclick="readFolder(this.id)">${file}</a></li>`;
                }
                else {
                    document.getElementById('display-files').innerHTML += `<li><i class="fa fa-file"></i><a href="javascript:void(0)"  id=${theID} ondblclick="openFileElectron(this.id)">${file}</a></li>`;
                }
            });
        }
    });
}
//open the file with the default application
function openFile(path) {
    shell.openItem(path);
}

// Open file in Electron App
function openFileElectron(path) {
    // fs.readFile(err, (path, data)){
    //     if (err) throw err;

    //     function OpenedFile(data) {

    //     }

    //     module.exports = OpenedFile;
    // }
    //// fs.stat(path + file, (err, stats) => {
        fs.readFile(path, (err, data) => {
            fs.stat(path, 'utf-8', (err, data, stats) => {
                if (err) throw err;

                if (stats.isFile(data)) {
                    console.log("The file content is: " + data);
                }
            })
        })
    // fs.stat(path, 'utf-8', (err, data, stats) => {
    //     if (err) {
    //         alert("An error ocurred reading the file: " + err.message);
    //         return;
    //     }

    //     if (stats.isFile()) {
    //         console.log("The file content is:" + data);
    //         // document.getElementById('fileContents').innerHTML += `<p>${data}</p>`
    //         callback(null, data);
    //     }
    // })
    // fs.readFile(path, 'utf-8', (err, data, stats) => {
        
    //     if (err) {
    //         alert("An error ocurred reading the file: " + err.message);
    //         return;
    //     }
    //     if (stats.isFile()) {
    //         console.log("The file content is:" + data);
    //     // document.getElementById('fileContents').innerHTML += `<p>${data}</p>`
    //     }
    // })
}