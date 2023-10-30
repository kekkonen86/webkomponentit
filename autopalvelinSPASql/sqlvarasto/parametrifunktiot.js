'use strict';

const lisaysParametrit = auto =>[
    +auto.numero, auto.nimi, auto.väri, +auto.hinta, 
    auto.huomautuksia, auto.kuva
];

const paivitysParametrit = auto =>[
    auto.nimi, auto.väri, +auto.hinta,
    auto.huomautuksia, auto.kuva, +auto.numero
];

module.exports={lisaysParametrit,paivitysParametrit}