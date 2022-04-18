const main = require("./main");
let links = []


 const mdLinks = (path,options) => {

  let totalLinks = 0;
  let linksOk = 0;
  let linkBroken =0;
  let arraylink = [];

  return new Promise((resolve) => {
    
    if(main.existence(path)){

      path = main.relToAbs(path);

      if(main.isFile(path)){

        if(main.extensionValid(path)){

         const data = main.readFile(path);
         main.getLinks(data,path)
         .then((arrayLinks) => {
          totalLinks = arrayLinks.length
          
          arrayLinks.forEach(element => {
            links.push(element.href)
          });
    

    
            const promiseArr = links.map((url) => main.validateLinks(url).then((status) => {
              arraylink.push(status);
            //   console.table(arraylink);
           

              if(options.validate && !options.stats ){
            //   console.log('Link : ', status.linkname, )
            //   console.log('Status Code : ', status.Code)
              if(status.status){
            status.status='ok';
              }else{
              status.status='fail;'
                  } 
                }

            })
              .catch((err) => {
                console.log('La ruta  no existe'.bgRed);
                console.log(err);
              }));
            return Promise.all(promiseArr);
           



          }).then(() => {
              console.table(arraylink)
            if(!options.validate && options.stats ){
              arraylink.forEach(element => {
                   if(element.status){
                     linksOk++
                   }else{
                     linkBroken++
                   }
               });

               console.log('Links Correctos : ', linksOk)
               console.log('Links Rotos : ', linkBroken)
            }
          })

        }else{
          console.log('No es una archivo .md')
        }
      }else{
        console.log('No es una archivo')
      }

    }else{
      console.log('La ruta no existe')
    }
   

  });
};


exports.mdLinks = mdLinks;
