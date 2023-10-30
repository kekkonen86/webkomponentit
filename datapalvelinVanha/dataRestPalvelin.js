'use strict';

const http = require('http');
const path = require('path');

const virheViesti = `
###############################################
Käyttö: node dataRestpalvelin <asetustiedosto>

Esimerkki: node dataRestPalvelin config.json
###############################################`;

if (process.argv.length < 3) {
    console.log(virheViesti);
}
else {
    const [, , asetusTiedostoPolku] = process.argv;
    try {
        const asetustiedosto = 
            require(path.join(__dirname, asetusTiedostoPolku));
        kaynnistaPalvelin(asetustiedosto);
    }
    catch (virhe) {
        console.log(virhe);
        console.log(`Asetustiedostoa '${asetusTiedostoPolku}' ei löydy`);
    }
}

function kaynnistaPalvelin(asetustiedosto){
    // console.log(asetustiedosto);
    const config=asetustiedosto;

    const restApufunktiotPolku = 
        path.join(__dirname,'kirjastoRest','restApufunktiot.js');

    const {luoTietovarasto}=
        require(path.join(__dirname,'kirjastoRest','tietovarastokerros.js'));

    const tietovarasto=luoTietovarasto(__dirname,config);

    const RESURSSI=tietovarasto.resurssi;
    const KUVAKANSIO=tietovarasto.kuvakansio;
    // console.log(KUVAKANSIO)
    const kuvakansioPolku=path.join(__dirname,config.varasto.kansio,KUVAKANSIO);


    const {
        lahetaJson,
        lahetaOptionsVastaus,
        lahetaHead,
        kasitteleJson,
        lataaTiedostoPalvelimelle
    } = require(restApufunktiotPolku);

    const palvelin = http.createServer(async (req,res)=>{
        const {pathname} = new URL(`http://${req.headers.host}${req.url}`);
        const reitti=decodeURIComponent(pathname);

        try{
            const metodi=req.method.toUpperCase();
            if(metodi==='OPTIONS'){
                lahetaOptionsVastaus(res);
            }else if(metodi==='HEAD'){
                let body={};
                if(reitti===`/rest/${RESURSSI}`){
                    body = await tietovarasto.haeKaikki();
                }
                else if(reitti===`/rest/${RESURSSI}/`){
                    const osat=reitti.split('/');
                    if(osat.length>3){
                        const perusavain=osat[3];
                        body=await tietovarasto.hae(perusavain);
                    }
                }
                lahetaHead(res,body);
            }
            else if (reitti === `/rest/${RESURSSI}/kuvat` && metodi==='POST'){
                lataaTiedostoPalvelimelle(req,kuvakansioPolku)
                    .then(status=>lahetaJson(res,status))
                    .catch(virhe=>lahetaJson(res,virhe));
            }
            else if(reitti===`/rest/${RESURSSI}`){
                if(metodi==='GET'){
                    lahetaJson(res,await tietovarasto.haeKaikki());
                }
                else if(metodi==='POST'){
                    try{
                        const tulos=await kasitteleJson(req);
                        lahetaJson(res, await tietovarasto.lisaa(tulos));
                    }
                    catch(virhe){
                        lahetaJson(res,virhe,404)
                    }
                }
                else {
                    lahetaJson(res,{viesti:'resurssinumero puuttuu'},404);
                }
            }
            else if (reitti.startsWith(`/rest/${RESURSSI}/`)){
                const osat=reitti.split('/');
                if(osat.length>3){
                    const perusavain=osat[3];
                    switch(metodi){
                        case 'GET':
                            tietovarasto.hae(perusavain)
                                .then(tulosGet=>lahetaJson(res,tulosGet))
                                .catch(virhe=>lahetaJson(res,virhe));
                            break;
                        case 'DELETE':
                            tietovarasto.poista(perusavain)
                                .then(tulosDelete => lahetaJson(res, tulosDelete))
                                .catch(virhe => lahetaJson(res, virhe));
                            break;
                        case 'PUT':
                            try{
                                const tulosPut=await kasitteleJson(req);
                                const statusPut = 
                                    await tietovarasto.paivita(tulosPut,perusavain);
                                lahetaJson(res,statusPut);

                            }
                            catch(virhe){
                                lahetaJson(res,virhe);
                            }
                            break;
                        default:
                            lahetaJson(res,{viesti:'metodi ei ole käytössä'},405)
                    }
                }
            }
            else{
                lahetaJson(res,{viesti:'resurssia ei ole'},405);
            }

        }
        catch(virhe){
            lahetaJson(res,{viesti:virhe.message},404);
        }

    }); //palvelin loppu

    palvelin.listen(config.port+1000,config.host, 
        ()=>console.log(`restpalvelin portissa ${config.port+1000}`));


} //kaynnistaPalvelin loppu