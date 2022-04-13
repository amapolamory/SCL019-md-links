const {mdLink} = require ('./index.js');
const readline = require('readline');
const process = require('process');


console.log('--------------------Bienvenido--------------------');

//const option es un objeto ya que  va a guardar
let args = process.argv;

const list = {};
let path = '';

if (args.some((x) => x === '--validate')) {
  list.validate = true;
}
if (args.some((x) => x === '--stats')) {
  list.stats = true;
}


  if (val[0] === 'mdLink') {
    path = val[1];
  } else {
    path = val[2];
  }
  mdLink(path, list).then(() => {
    console.log();
  }).catch((err) => {
    console.log(err.message);
  });