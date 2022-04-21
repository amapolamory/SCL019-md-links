
const fs = require('fs');//permite usar las funciones  de filesistem
const path = require('path');
const http = require('http');
const url = require('url');
let { lstatSync, existsSync } = require('fs');


//verifica si existe la ruta ingresada
const existence = (route) => existsSync(route); 
// transforma la ruta relativa a absoluta
const relToAbs = (route) => (path.isAbsolute(route) ? route : path.resolve(route));

const isFile = (route) => lstatSync(route).isFile();
//funcion para validar que  la extension del documento sea .md
const extensionValid = (route) => {
    const ext = path.extname(route.toLowerCase());
    if (ext === ".md") {
        return true;
        
    } else {
        console.log("No es un archivo md");
        return false;
    }
};
//funcion para validar el documento
const readFile = (files) => {
    try {// señala un bloque de instrucciones a intentar
        console.log("files", files)
        const data = fs.readFileSync(files, "utf8");
        return data
    } 

    catch (e) {// se le da una instruccion en caso de que pase algo distinto al catch
        throw new Error('Documento no válido', e)
    }
};


const getLinks = (file, userPath) => {

    return new Promise ((resolve) => {
      const lines = file.split("\n"); //separa en lineas el documento
      let arrayLinks = [];
      for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
          const links = line.matchAll(regularEx); 
          const match = regularEx.test(line); // test para ver si lo que hace match es un link
          if (match) {
              for (const link of links) { 
                  const data = {
                      text: link[1],
                      href: link[2],
                      file: userPath,
                      line: i + 1,
                  };
                  arrayLinks.push(data); // se suma al arreglo de links
                  resolve(arrayLinks)
                //   console.table(arrayLinks)
                
                 
              }
          }
      }
    })

};

function validateLinks(link) {
    return new Promise((resolve) => {
      const options = {
        method: 'HEAD',
        host: url.parse(link).host,
        port: 80,
        path: url.parse(link).pathname,
      };
      const req = http.request(options, (res) => {
        const nuevaData = {
          linkname: link,
          Code: res.statusCode,
          status: res.statusCode,
        };

        resolve(nuevaData); 
   
      })
  
      req.on('error', (error) => {
        const newData = {
          linkname: link,
          status: false,
        };
        resolve(newData);
    
      });
      req.end()
     
    })
  }









exports.relToAbs = relToAbs;
exports.extensionValid = extensionValid;
exports.readFile = readFile;
exports.getLinks = getLinks;
exports.existence = existence;
exports.isFile = isFile;
exports.validateLinks = validateLinks;
// exports.mdLinks = mdLinks;



