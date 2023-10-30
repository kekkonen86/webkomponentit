'use strict';

const Tietokanta=require('./sqlvarasto/tietokanta');

const optiot = {
    "host": "localhost",
    "port": 3306,
    "user": "palvelin",
    "password": "salainen",
    "database": "autokanta"
};

const kanta=new Tietokanta(optiot);

// kanta.suoritaKysely('select * from auto')
//     .then(console.log)
//     .catch(console.log);

// kanta.suoritaKysely('insert into auto values(?,?,?,?,?,?)',
//     [3, 'Hoppa', 'sininen', 5000, 'loistoauto', 'pienikuva.png'])
//     .then(console.log)
//     .catch(console.log);

// kanta.suoritaKysely('delete from auto where numero=?',[3])
//     .then(console.log)
//     .catch(console.log)

const sql=require('./sqlvarasto/sqlLauseet.json');

const haeKaikkiSql=sql.haeKaikki.join(' ');
const haeSql=sql.hae.join(' ');
const lisaaSql=sql.lisaa.join(' ');
const paivitaSql=sql.paivita.join(' ');
const poistaSql=sql.poista.join(' ');

// kanta.suoritaKysely(haeKaikkiSql).then(console.log).catch(console.log);
// kanta.suoritaKysely(haeSql,[2]).then(console.log).catch(console.log);
// kanta.suoritaKysely(lisaaSql, [3, 'Hoppa', 'sininen', 5000, 'loistoauto', 'pienikuva.png']).then(console.log).catch(console.log);
// kanta.suoritaKysely(paivitaSql, ['Hoppax', 'sininenx', 50000, 'loistoautox', 'pxienikuva.png',3]).then(console.log).catch(console.log);
// kanta.suoritaKysely(poistaSql, [3]).then(console.log).catch(console.log);