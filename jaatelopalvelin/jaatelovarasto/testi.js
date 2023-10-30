'use strict';

const henkilo={
    etunimi:'Matti',
    sukunimi:'Puro'
};

console.log(henkilo.sukunimi);
console.log(henkilo.etunimi);
console.log(henkilo['etunimi']);

let kentta='sukunimi';
console.log(henkilo[kentta]);
kentta='etunimi';
console.log(henkilo[kentta]);

function tulosta(kentta){
    console.log(kentta,henkilo[kentta]);
}

tulosta('sukunimi');
tulosta('etunimi');

for(const kentta of Object.keys(henkilo)){
    tulosta(kentta);
}
console.log('################');
for (const kentta of ['sukunimi','etunimi','sukunimi','x']) {
    tulosta(kentta);
}

