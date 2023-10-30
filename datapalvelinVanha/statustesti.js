'use strict';

const { STATUSKOODIT, STATUSVIESTIT } =require('./kirjastoRest/statuskoodit');

console.log(STATUSKOODIT);

console.log(STATUSVIESTIT)

console.log(STATUSVIESTIT.PAIVITYS_OK(12));
console.log(STATUSVIESTIT.PERUSAVAIN_RISTIRIITAINEN(2,4));