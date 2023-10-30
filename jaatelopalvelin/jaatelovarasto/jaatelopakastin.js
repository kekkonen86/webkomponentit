'use strict';

const jaatelot=require('./jaatelot.json');

const haeKaikkiLajit = async ()=>{
    return Object.keys(jaatelot);
}

const onLaji= async jaatelolaji=>{
    return Object.keys(jaatelot).includes(jaatelolaji);
    // return Object.keys(jaatelot)
    //     .includes(jaatelolaji.toLowerCase());
}

const haeJaatelo = async jaatelolaji =>{
    return jaatelot[jaatelolaji] || null;
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

