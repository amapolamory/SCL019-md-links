const index = require('./index.js')
const fs = require('fs');//permite usar las funciones  de filesistem
const path = require('path');

let { lstatSync, existsSync } = require('fs');

//verifica si existe la ruta ingresada
const existence = (answer) => existsSync(answer);
// transforma la ruta relativa a absoluta
const relToAbs = (answer) => (path.isAbsolute(answer) ? answer : path.resolve(answer));

//funcion para validar que  la extension del documento sea .md
const extensionValid = (router) => {
    const ext = path.extname(router.toLowerCase());
    if (ext === ".md") {
        return true;
    } else {
        console.log("No es un archivo md");
    }
};
//funcion para validar el documento
const fileValid = (files) => {
    try {
        const data = fs.readFileSync(files, "utf8");
        getLinks(data, files)
        console.log('Contenido del archivo:', data);

    } catch (e) {
        throw new Error('Documento no válido', e)
    }
};

const getLinks = (file, userPath) => {
    const lines = file.split("\n"); //separa en lineas el documento
    let arrayLinks = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
        const links = line.matchAll(regularEx);
        const match = regularEx.test(line);
        if (match) {
            for (const link of links) {
                const data = {
                    text: link[1],
                    href: link[2],
                    file: userPath,
                    line: i + 1,
                };
                arrayLinks.push(data);
            }
            console.log(arrayLinks)
        }
    }
    return arrayLinks;

};


exports.relToAbs = relToAbs;
exports.extensionValid = extensionValid;
exports.fileValid = fileValid;
exports.getLinks = getLinks;
exports.existence = existence;
// exports.file = file;



