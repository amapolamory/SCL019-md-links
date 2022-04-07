

const main = require('../main.js')
const try1 = 'carpeta\\path.md';
const try2 = 'carpeta\\trying.txt';
const try3= 'lala';

describe('la funcion existence',  () => {
it('devuelve true si el path es existente',  () =>{
    console.log(try1);
    expect(main.existence(try1)).toBe(true);
})
it('devuelve false si el path no existe', () => {
    console.log(try3);
    console.log(main.existence(try2))
    expect(main.existence(try3)).toBe(false);
})
});
