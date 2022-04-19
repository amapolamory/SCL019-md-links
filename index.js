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

      path = main.relToAbs(path);

      if (main.isFile(path)) {

        if (main.extensionValid(path)) {

          const data = main.readFile(path);
          main.getLinks(data, path)
            .then((arrayLinks) => {
              totalLinks = arrayLinks.length

              arrayLinks.forEach(element => {
                links.push(element.href)
              });



              const promiseArr = links.map((url) => main.validateLinks(url).then((status) => {
                arraylink.push(status);

                const busqueda = arraylink.reduce((acc, arraylink) => {
                  acc[arraylink.linkname] = ++acc[arraylink.linkname] || 0;
                  return acc;
                }, {});
                
                 duplicados = arraylink.filter( (arraylink) => {
                  return busqueda[arraylink.linkname];
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
              return Promise.all(promiseArr);




            }).then(() => {
              if(options.validate && !options.stats){
                console.table(arraylink);
              }
              if (!options.validate && options.stats) {

                console.log('total: ',arraylink.length)
                console.log('unique: ' ,arraylink.length - duplicados.length )
              }

              
              }).then(()=>{

              if(options.validate && options.stats){

             

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
