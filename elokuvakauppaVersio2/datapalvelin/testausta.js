'use strict';

const Tietokanta = require('./tietovarasto/tietokanta');
const optiot = require('./tietovarasto/yhteystiedot.json');

const kanta=new Tietokanta(optiot);

// kanta.suoritaKysely('select * from elokuva')
//     .then(console.log)
//     .catch(console.log);

// kanta.suoritaKysely('select * from elokuva where id=?',[1])
//     .then(console.log)
//     .catch(console.log);

kanta.suoritaKysely('select * from asiakas where etunimi=? and sukunimi=?', ['Leila','Hökki'])
    .then(console.log)
    .catch(console.log);