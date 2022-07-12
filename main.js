let fs = require("fs");
let path = require("path");
let inputarr = process.argv.slice(2);
console.log(inputarr);

// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let command = inputarr[0];
let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docs", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps"],
    app: ["exe", "dmg", "pkg", "deb"]
}

switch (command){
    case "tree":
        treefn(inputarr[1])
        break;
    case "organise":
        organisefn(inputarr[1]);
        break;
    case "help":
        helpfn()
        break;
    default:
        console.log("Please 🙌 enter right command");
}

function treefn(dirPath){
    console.log("Tree Command implemented for", dirPath);
}

function organisefn(dirPath){
    // console.log("Organise Command implemented for", dirPath);
    let destinationpath = path.join(dirPath, "organized_files");
    if(dirPath == undefined){
        console.log("Kindly enter the Path");
        return;
    }else{
        let doesexist = fs.existsSync(dirPath);
        if(doesexist){
            if(fs.existsSync(destinationpath) == false){
                fs.mkdirSync(destinationpath);    
            }
        }else{
            console.log("Kindly enter the Path");
            return;
        }
    }
    organisehelper(dirPath, destinationpath)
}

function organisehelper(src, dest){
    let childnames = fs.readdirSync(src);
    // console.log(childnames);
    for(let i = 0; i<childnames.length; i++){
        let childaddress = path.join(src, childnames[i]);
        let isfile = fs.lstatSync(childaddress).isFile();
        if(isfile){
            // console.log(childnames[i]);
            let category = getCategory(childnames[i]);
            console.log(childnames[i], "belongs to ->", category);

            sendFiles(childaddress, dest, category);
        }
    }
}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    // console.log(ext);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i = 0; i<cTypeArray.length; i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
    }
    return "other";
}

function sendFiles(srcFilePath, dest, category){
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }

    let filename = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, filename);
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(filename,"copies to ",categoryPath);
}


// Help
function helpfn(){
    console.log(`
    List of all commands
        ->node main.js tree "directoryPath"
        ->node main.js organize "directoryPath"
        ->node main.js help
    `);
}

