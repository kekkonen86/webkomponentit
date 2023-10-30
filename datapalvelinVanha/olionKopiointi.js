'use strict';

const kaara = {
    "numero": 5,
    "nimi": "Bil GT",
    "hinta": 23459,
    "lisävarusteet":{
        värit:['sininen', 'punainen'],
        radio:'Mökätoosa'
    }
}

// const uusi=Object.assign(kaara,{numero:1});
// const uusi = {...kaara,numero:1}; //pintakopio
const uusi = JSON.parse(JSON.stringify(kaara)); //syväkopio


console.log('uusi',uusi);
console.log('kaara',kaara);
uusi.numero=6;
console.log('uusi', uusi);
console.log('kaara', kaara);

uusi.lisävarusteet.radio='Jytäboksi';
console.log('uusi', uusi);
console.log('kaara', kaara);


