'use strict';

const http = require('http');
const path = require('path');

const port=process.env.PORT || 3000;
const host=process.env.HOST || 'localhost';

const {lahetaJson} = require('./kirjasto/apufunktiot');
const { haeKaikkiLajit, onLaji, haeJaatelo } = require('./jaatelovarasto/jaatelopakastin');

const palvelin = http.createServer((req,res)=>{
    // haeKaikkiLajit().then(lajit=>lahetaJson(res,lajit));
    haeJaatelo('mansikka').then(jäätelö=>lahetaJson(res,jäätelö));
    // lahetaJson(res,{
    //     vastaus:'tämä on vastaus', 
    //     taulukko:[1,2,3]
    // });

});

palvelin.listen(port,host, 
    ()=>console.log(`jäätelöpalvelin ${host}:${port} palvelee`));
    