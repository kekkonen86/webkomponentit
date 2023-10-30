'use strict';

const path = require('path');

const {lue} = require('../kirjasto/apufunktiot'); //ei kiva, kovakoodattu!

const jsonPolku=path.join(__dirname,'jaatelot.json');

const haeKaikkiLajit = async ()=>{
    try{
        const data = await lue(jsonPolku);
        const jaatelot=await JSON.parse(data.tiedostoData);
        return Object.keys(jaatelot);
    }
   catch(virhe){
        return [];
   }
}

const onLaji= async jaatelolaji=>{
    try {
        const data = await lue(jsonPolku);
        const jaatelot = await JSON.parse(data.tiedostoData);
        return Object.keys(jaatelot).includes(jaatelolaji);
    }
    catch(virhe){
        return false;
    }
  
}

const haeJaatelo = async jaatelolaji =>{
    try {
        const data = await lue(jsonPolku);
        const jaatelot = await JSON.parse(data.tiedostoData);
        return jaatelot[jaatelolaji] || null;
    }
    catch(virhe){
        return null;
    }
}

module.exports={haeKaikkiLajit,onLaji,haeJaatelo}

// haeKaikkiLajit().then(console.log).catch(console.log);
// onLaji('mansikkax').then(console.log).catch(console.log);
// haeJaatelo('mansikka').then(console.log).catch(console.log);
// haeJaatelo('mansikka').then(tulos=>console.log(tulos)).catch(virhe=>console.log(virhe));
//ilman async:iä
// console.log(haeKaikkiLajit());
// console.log(onLaji('mansikka'));
// console.log(onLaji('Mansikka'));
// console.log(onLaji('x'));
// console.log(haeJaatelo('mansikka'));
// console.log(haeJaatelo('x'));

