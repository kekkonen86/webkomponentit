'use strict';

const {kirjoitaVarasto} =require('./jaatelovarasto/varastokasittelija');

kirjoitaVarasto('testi.json',{"a":1, "b":2})
    .then(console.log)
    .catch(console.log);