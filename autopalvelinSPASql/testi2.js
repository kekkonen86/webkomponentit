'use strict';

const Tietovarasto = require('./sqlvarasto/tietovarastokerros');

const varasto=new Tietovarasto();

varasto.haeKaikki().then(console.log).catch(console.log);
// varasto.hae(2).then(console.log).catch(console.log);
// varasto.hae(20).then(console.log).catch(console.log);
// varasto.hae().then(console.log).catch(console.log);
// varasto.lisaa({
//     "numero": 5,
//     "nimi": "Kaara",
//     "väri": "sininen",
//     "hinta": 1234,
//     "huomautuksia": "loistoauto",
//     "kuva": "mansikka.png"
// }).then(console.log).catch(console.log);
// varasto.paivita({
//     "numero": 15,
//     "nimi": "Kaarax",
//     "väri": "sininenx",
//     "hinta": 12349,
//     "huomautuksia": "loistxoauto",
//     "kuva": "mansikkax.png"
// }).then(console.log).catch(console.log);
// varasto.paivita({
//     "numero": 15,
//     "nimi": "Kaarax",
//     "väri": "sininenx",
//     "hinta": 12349,
//     "huomautuksia": "loistxoauto",
//     "kuva": "mansikkax.png"
// }).then(console.log).catch(console.log);
// varasto.poista(5).then(console.log).catch(console.log);