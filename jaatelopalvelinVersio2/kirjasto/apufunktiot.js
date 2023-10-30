'use strict';

const fs=require('fs').promises;
const path = require('path');

const MIMETYYPIT=require('./mimetyypit.json');

const lue= polku =>{
    const tiedostotunniste=path.extname(polku).toLowerCase();
    const mime = MIMETYYPIT[tiedostotunniste] || 
        {tyyppi:'application/octet-stream', koodaus:'binary'};
    return fs.readFile(polku, mime.koodaus)
        // .then(tiedostoData => ({ tiedostoData: tiedostoData, mime: mime }))
        .then(tiedostoData => ({tiedostoData,mime}))
        .catch(virhe=>virhe);
}

//resurssi on olio {tiedostoData,mime}
const laheta = (res,resurssi)=>{
    res.writeHead(200, {
        'Content-Type': resurssi.mime.tyyppi,
        'Content-Length':Buffer.byteLength(resurssi.tiedostoData,resurssi.mime.koodaus)
    });
    res.end(resurssi.tiedostoData, resurssi.mime.koodaus);
}

const lahetaJson = (res, jsonresurssi)=>{
    const jsonData=JSON.stringify(jsonresurssi);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(jsonData);
}

const onJoukossa=(reitti,...reittienAlkuosat)=>{
    for(const alku of reittienAlkuosat){
        if(reitti.startsWith(alku)) return true;
    }
    return false;
}

const lahetaVirhe= (res,viesti,koodi=404)=>{
    res.writeHead(koodi, {'Content-Type':'application/json:charset=utf-8'});
    res.end(JSON.stringify({virhe:viesti}));
}

module.exports={lue, laheta, lahetaJson, onJoukossa,lahetaVirhe}

// lue('./apufunktiot.js').then(console.log).catch(console.log);
// lue('./mimetyypit.json').then(console.log).catch(console.log);