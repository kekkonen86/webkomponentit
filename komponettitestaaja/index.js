'use strict';

const http = require('http');
const path = require('path');
const fs=require('fs');

const port=process.env.PORT || 3000;
const host=process.env.HOST || 'localhost';

const {lue, laheta, onJoukossa,lahetaVirhe} = require('./kirjasto/apufunktiot');

const komponenttikansiot = ['/webkomponentit/'];
const resurssireitit=['/tyylit/','/kuvat/','/js/','/favicon'].concat(komponenttikansiot);



const palvelin = http.createServer(async (req,res)=>{
    const {pathname} = new URL(`http://${req.headers.host}${req.url}`);
    const reitti=decodeURIComponent(pathname);
    try{
        if(reitti==='/'){
            let komponentit=[];
            for(const kansio of komponenttikansiot){
                const polku=kansio.replaceAll('/','');
                komponentit=komponentit.concat(komponenttilista(polku));
            }
            const tulos=muodostaKotisivu(komponentit);
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
    ()=>console.log(`komponenttitestaaja ${host}:${port} palvelee`));
    

function komponenttilista(kansio){
    const polku = path.join(__dirname,kansio);
    const tiedostot=fs.readdirSync(polku,{withFileTypes:true});
    const hakemistot = tiedostot.filter(tiedosto=>tiedosto.isDirectory())
        .map(hakemisto=>hakemisto.name);
    const valikkotiedostot=[];
    for(const hak of hakemistot){
        const tpolku=path.join(polku,hak);
        const hakemistonTiedostot=fs.readdirSync(tpolku);
        const htmlTiedostot = hakemistonTiedostot.filter(tiedosto=>tiedosto.endsWith('.html'));
        htmlTiedostot.forEach(tied=>valikkotiedostot.push(`${kansio}/${hak}/${tied}`));
    }
    return valikkotiedostot
}

function muodostaKotisivu(kansiot){
    let htmlJono=`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Komponenttitestaaja</title>
    <link rel="stylesheet" href="/tyylit/perustyylit.css">
    <link rel="icon" href="/favicon.png" type="image/png">
</head>
<body>
    <main>
        <h1>Valikko</h1>`;

    for(const kopmonenttipolku of kansiot){
        const [kansio,nimi,tiedosto] = kopmonenttipolku.split('/');
        htmlJono+=`<a href="${kansio}/${nimi}/${tiedosto}">`
        htmlJono+=`<button><span class="kansio">${nimi}</span> ${tiedosto}</button></a>\n`;
    }

    htmlJono +=`</main>
</body>
</html>`;
    return {
        tiedostoData: htmlJono, 
        mime: { "tyyppi": "text/html", "koodaus": "utf8" }
    };
}