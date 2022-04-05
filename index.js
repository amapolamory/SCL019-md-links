//  module.exports = () => {
// };
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

    if(main.extensionValid(answer)){
        main.fileValid(answer)
    }
})









