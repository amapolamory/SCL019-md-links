const index = require('./index.js')
const fs = require('fs');//permite usar las funciones  de filesistem
const path = require('path');
const http = require('http');
const url = require('url');
let { lstatSync, existsSync } = require('fs');
const fetch = require('node-fetch')


const userPath = process.argv[2];

//verifica si existe la ruta ingresada
const existence = (answer) => existsSync(answer);
// transforma la ruta relativa a absoluta
const relToAbs = (answer) => (path.isAbsolute(answer) ? answer : path.resolve(answer));

const isFile = (answer) => lstatSync(answer).isFile();
//funcion para validar que  la extension del documento sea .md
const extensionValid = (router) => {
    const ext = path.extname(router.toLowerCase());
    if (ext === ".md") {
        return true;
    } else {
        console.log("No es un archivo md");
        return false;
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
        const match = regularEx.test(line);// test Prueba una coincidencia en una cadena. Devuelve true o false.
        if (match) {
            for (const link of links) {
                const data = {
                    text: link[1],
                    href: link[2],
                    file: userPath,
                    line: i + 1,
                };
                arrayLinks.push(data);
                //  validateLinks(data.href) //Ejecuta funcion anidada

            }
            console.log(arrayLinks)
        }
    }
    return arrayLinks;

}

// function validateLinks(link) {
//     return new Promise((resolve) => {
//         const options = {
//             method: 'HEAD',//El método HEAD pide una respuesta idéntica a la de una petición GET,(solicita una representación de un recurso específico.) pero sin el cuerpo de la respuesta.
//             host: url.parse(link).host,
//             port: 80,
//             path: url.parse(link).pathname,
//         };
//         const req = http.request(options, (res) => {
//             const nuevaData = {
//                 linkname: link,
//                 Code: res.statusCode,
//                 status: res.statusCode <= 399,
//             };
//             console.log(`statusCode: ${res.statusCode}`)
//             resolve(nuevaData);
//         })

//         req.on('error', (error) => {
//             console.error(error);
//             const newData = {
//                 linkname: link,
//                 status: false,
//             };
//             resolve(newData);
//         });
//         req.end()
//     })
    
// }

const validateLinks = (links) => {
    const validate = links.map((link) =>
      fetch(link.href).then((response) => {
        return {
          text: link.text,
          href: link.href,
          file: link.file,
          line: link.line,
          status: response.status,
          statusText: response.statusText,
          linkname: link,
         Code: res.statusCode,   
         status: res.statusCode <= 399,
        };
        
      })
    
    );
    return Promise.all(validate);


 
  };

 const mdLinks = (files, option) => {
    return new Promise((resolve, reject) => {
      const links = fileValid(files);
      if (option.validate) {
        resolve(validateLinks(links));
      
 
      } else {
        resolve(links);
        console.log(`statusCode: ${response.statusCode}`)
      }
      reject(new TypeError('error'));
    });
  };







exports.relToAbs = relToAbs;
exports.extensionValid = extensionValid;
exports.fileValid = fileValid;
exports.getLinks = getLinks;
exports.existence = existence;
exports.isFile = isFile;
exports.validateLinks = validateLinks;
exports.mdLinks = mdLinks;



