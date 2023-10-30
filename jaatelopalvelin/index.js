'use strict';

const http = require('http');
const path = require('path');

const port=process.env.PORT || 3000;
const host=process.env.HOST || 'localhost';

const {lue, laheta, lahetaJson,onJoukossa,lahetaVirhe} = require('./kirjasto/apufunktiot');
const { haeKaikkiLajit, onLaji, haeJaatelo } = require('./jaatelovarasto/jaatelopakastin');

const kotipolku=path.join(__dirname,'kotisivu.html');

const resurssireitit=['/tyylit/','/kuvat/','/js/','/favicon'];

const palvelin = http.createServer(async (req,res)=>{
    const {pathname} = new URL(`http://${req.headers.host}${req.url}`);
    const reitti=decodeURIComponent(pathname);
    // console.log(pathname,reitti);
    // console.log(req)
    // console.log(req.headers);

    try{
        if(reitti==='/'){
            const tulos=await lue(kotipolku);
            laheta(res,tulos);
        }
        else if(onJoukossa(reitti, ...resurssireitit)){
            const resurssi=await lue(path.join(__dirname,reitti));
            laheta(res, resurssi);
        }
       
        else if(reitti==='/lajit'){
            const lajit = await haeKaikkiLajit();
            lahetaJson(res,lajit);
        }
        else if(reitti.startsWith('/jäätelö/')){ //   /jäätelö/mansikka
            const polunOsat=reitti.split('/');
            // console.log(polunOsat);
            const laji=polunOsat[2];
            if(await onLaji(laji)){
                const jäätelö = await haeJaatelo(laji);
                lahetaJson(res, jäätelö);
            }
            else{
                lahetaVirhe(res,'ei löytynyt');
            } 
        }
        else{
            lahetaVirhe(res,'reittiä ei löydy');
        }
    }
    catch(virhe){
        lahetaVirhe(res,'virhe',500);
    }
});

palvelin.listen(port,host, 
    ()=>console.log(`jäätelöpalvelin ${host}:${port} palvelee`));
    