'use strict';

const http = require('http');
const path = require('path');

const port=process.env.PORT || 3000;
const host=process.env.HOST || 'localhost';

const {lue, laheta ,onJoukossa,lahetaVirhe} = require('./kirjasto/apufunktiot');


const kotipolku=path.join(__dirname,'kotisivu.html');

const resurssireitit=['/tyylit/','/kuvat/','/js/','/favicon'];

const palvelin = http.createServer(async (req,res)=>{
    const {pathname} = new URL(`http://${req.headers.host}${req.url}`);
    const reitti=decodeURIComponent(pathname);

    try{
        if(reitti==='/'){
            const tulos=await lue(kotipolku);
            laheta(res,tulos);
        }
        else if(onJoukossa(reitti, ...resurssireitit)){
            const resurssi=await lue(path.join(__dirname,reitti));
            laheta(res, resurssi);
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
    