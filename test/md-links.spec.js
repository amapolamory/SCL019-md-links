

const main = require('../main.js')
const try1 = 'carpeta\\path.md';
const try2 = 'carpeta\\trying.txt';
const try3= 'lala';

// testea la funcion de la existencia de la ruta
// describe('la funcion existence',  () => {
// it('devuelve true si el path es existente',  () =>{
//     console.log(try1);
//     expect(main.existence(try1)).toBe(true);
// })
// it('devuelve false si el path no existe', () => {
//     console.log(try3);
//     console.log(main.existence(try3))
//     expect(main.existence(try3)).toBe(false);
// })
// });

// funcion que testea la conversion de relativa a absoluta

describe('La función convertPath', () => {

    it(`Transforma la ruta relativa ${try1} en absoluta`, () => {
      console.log(try1);
      expect(main.relToAbs(try1)).toBe('C:\\Users\\Amapola\\OneDrive\\Escritorio\\MDlinks\\SCL019-md-links\\carpeta\\path.md');
    });
   
    it(`Transforma la ruta relativa ${try2} en absoluta`, () => {
      console.log(try2);
  
      expect(main.relToAbs(try2)).toBe('C:\\Users\\Amapola\\OneDrive\\Escritorio\\MDlinks\\SCL019-md-links\\carpeta\\trying.txt');
    });

  });

  //funcion que testea la extension del archivo
  // describe('la funcion extensionValid',  () => {
  //   it('devuelve true si la extension de la ruta es md',  () =>{
  //       console.log(try1);
  //       expect(main.existence(try1)).toBe(true);
  //   });
  //   it('devuelve false si la ruta no es md', () => {
  //       console.log(try2);
  //       console.log(main.extensionValid(try2))
  //       expect(main.extensionValid(try2)).toBe(false);
  //   })
  //   });

