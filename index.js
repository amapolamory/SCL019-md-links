const main = require("./main");
let links = []


const mdLinks = (path, options) => {

  let totalLinks = 0;
  let linksOk = 0;
  let linkBroken = 0;
  let arraylink = [];
  let duplicados= {};

  return new Promise((resolve) => {

    if (main.existence(path)) {

      path = main.relToAbs(path);// pasa ña ruta a absoluta

      if (main.isFile(path)) {// verifica si es un archivo

        if (main.extensionValid(path)) {// verifica que la extension sea md

          const data = main.readFile(path);// lee todo el archivo e incluye el array de links
          main.getLinks(data, path)
            .then((arrayLinks) => {
              totalLinks = arrayLinks.length

              arrayLinks.forEach(element => {
                links.push(element.href)// agrega los links al array
              });



              const promiseArr = links.map((url) => main.validateLinks(url).then((status) => {
                arraylink.push(status);// map crea el nuevo array de links que queda guaradado en arraylink 

                const busqueda = arraylink.reduce((acc, arraylink) => {
                  acc[arraylink.linkname] = ++acc[arraylink.linkname] || 0;
                  return acc;// reduce devuelve un resultado de un solo valor 
                }, {});
                
                 duplicados = arraylink.filter( (arraylink) => {
                  return busqueda[arraylink.linkname];//esta constante permite encontrar cuales son los links unicos
                });

                if (options.validate && !options.stats) {
      
                  if (status.status) {
                    status.status = 'ok';
                  } else {
                    status.status = 'fail;'
                  }
                }


              })
                .catch((err) => {
                  console.log('La ruta  no existe'.bgRed);
                  console.log(err);
                }));
              return Promise.all(promiseArr); //devuelve todas las promesas 




            }).then(() => {
              if(options.validate && !options.stats){// si solo es validate, se muestra una tabla con los links
                console.table(arraylink);
              }
              if (!options.validate && options.stats) {// si solo es stats nos da el total de links y los links unicos
                console.log('total: ',arraylink.length)
                console.log('unique: ' ,arraylink.length - duplicados.length )
              }

              
              }).then(()=>{

              if(options.validate && options.stats){// si es ambas opciones muestra los liks rotos los links totales y links unicos

             

                arraylink.forEach(element => {
                  if (element.status) {
                    linksOk++
                  } 
                
                  else  {
                    linkBroken++

                  }
                });
                console.log('Links unicos: ',arraylink.length-duplicados.length)
                console.log('Links totales: ',arraylink.length)
                console.log('Links Rotos : ', linkBroken)
                
              }
            })

        } else {
          console.log('No es una archivo .md')
        }
      } else {
        console.log('No es una archivo')
      }

    } else {
      console.log('La ruta no existe')
    }


  });
};


exports.mdLinks = mdLinks;
