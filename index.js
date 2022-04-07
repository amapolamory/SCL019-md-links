
const path = require("path");
const fs = require("fs");
const main = require("./main");


const readline = require('readline');

let rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rlInterface.question(`Ingresa tu ruta: \n`, function (route) {
    let answer = route;//ruta que ingresa el usuario
    console.log('Tu ruta es:' + answer);

    if (main.existence(answer)) {
        answer = main.relToAbs(answer);
        console.log('La ruta absoluta es' + answer);
    }
  
    else{
        console.log('La ruta no existe');
    }

    if(main.isFile(answer)){
        console.log('La ruta es un archivo')
    }
  

    if (main.extensionValid(answer)) {
        main.fileValid(answer)
    }
    else{
        console.log('El documento no es valido')
    };



rlInterface.close()
});









