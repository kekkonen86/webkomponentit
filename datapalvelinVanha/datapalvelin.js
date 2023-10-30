'use strict';

const http = require('http');
const path = require('path');

const virheViesti=`
##########################################
Käyttö: node datapalvelin <asetustiedosto>

Esimerkki: node datapalvelin config.json
##########################################`;

if(process.argv.length<3){
    console.log(virheViesti);
}
else{
    const [, , asetusTiedostoPolku] = process.argv;
    try{
        const asetustiedosto=require(path.join(__dirname,asetusTiedostoPolku));
        kaynnistaPalvelin(asetustiedosto);
    }
    catch(virhe){
        console.log(virhe);
        console.log(`Asetustiedostoa '${asetusTiedostoPolku}' ei löydy`);
    }
}

function kaynnistaPalvelin(asetustiedosto){
    const config=asetustiedosto;
    const kirjastokansioPolku = path.join(__dirname, config.kirjasto.kansio);
    const varastokansioPolku = path.join(__dirname,config.varasto.kansio);
    const varastokerrosPolku = path.join(kirjastokansioPolku,config.kirjasto.varastokerros);
    const varastokasittelijaPolku=path.join(kirjastokansioPolku, config.kirjasto.varastokasittelija);
    const varastoasetuksetPolku = path.join(varastokansioPolku,config.varasto.asetustiedosto);

    // console.log(varastokerrosPolku);
    // console.log(varastokasittelijaPolku);
    // console.log(varastoasetuksetPolku);

    const {luoVarasto} = require(varastokerrosPolku);

    const {
        haeKaikki,
        hae,
        haeArvot,
        haeAvaimet,
        haeKuva,
        perusavain,
        hakuavaimet,
        resurssi
    } = luoVarasto(varastoasetuksetPolku,varastokansioPolku,varastokasittelijaPolku);

    const palvelin = http.createServer(async (req,res)=>{
        const {pathname, searchParams} =new URL(`http://${req.headers.host}${req.url}`);
        const reitti=decodeURIComponent(pathname);
        // console.log(pathname)

        try{
            if(reitti==='/'){
                lahetaJson(res,resurssi);
            }
            else if(reitti=== `/${resurssi}/avaimet`){
                // const kentat=await haeAvaimet();
                // lahetaJson(res,kentat);
                lahetaJson(res, await haeAvaimet());
            }
            else if(reitti===`/${resurssi}/hakuavaimet`){
                lahetaJson(res,hakuavaimet);
            }
            else if(reitti===`/${resurssi}/perusavain`){
                lahetaJson(res,perusavain);
            }
            else if(reitti===`/${resurssi}`){
                lahetaJson(res, await haeKaikki());
            }
            else if(reitti ===`/${resurssi}/ehdolla`){
                const hakuavain=valitsehakuavain(searchParams);
                if(hakuavain){
                    const hakuarvo=searchParams.get(hakuavain);
                    const tulos=await hae(hakuavain,hakuarvo);
                    lahetaJson(res,tulos);
                }
                else{
                    lahetaJson(res,{virhe:`Hakuavain ei ole joukossa '${hakuavaimet.join()}'`});
                }
            }
            else if(reitti===`/${resurssi}/arvot`){
                const hakuavain = searchParams.get('avain');
                const kertaalleen = searchParams.has('kertaalleen');
                if(hakuavain){
                    lahetaJson(res, await haeArvot(hakuavain,kertaalleen));
                }
                else{
                    lahetaJson(res,{virhe:`Hakuavainta 'avain' ei löydy`});
                }
            }
            else if(reitti===`/${resurssi}/kuvat`){
                const nimi=searchParams.get('nimi');
                if(nimi){
                    const kuva=await haeKuva(nimi);
                    if(kuva && kuva.kuvaData){
                        return lahetaKuva(res,kuva);
                    } 
                }
                res.statusCode = 404;
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end();
            }
            else{
                lahetaJson(res,{virhe:`Resurssia ${reitti} ei löydy`});
            }
        }
        catch(virhe){
            lahetaJson(res,{virhe:virhe.message});
        }
    });

    palvelin.listen(config.port,config.host, 
        ()=>console.log(`Palvelin ${config.host} palvelee portissa ${config.port}`));

    //apufunktiot
    function lahetaJson(res, jsonResurssi){
        const jsonData=JSON.stringify(jsonResurssi);
        res.writeHead(200,{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        });
        res.end(jsonData);
    }

    function lahetaKuva(res,kuvaresurssi){
        res.writeHead(200,{
            'Content-Type':kuvaresurssi.mime.tyyppi,
            'Content-Length':Buffer.byteLength( kuvaresurssi.kuvaData, 
                                                kuvaresurssi.mime.koodaus),
            'Access-Control-Allow-Origin': '*'                                 
        });
        res.end(kuvaresurssi.kuvaData, kuvaresurssi.mime.koodaus);
    }

    function valitsehakuavain(hakuParams){
        for(const avain of hakuavaimet){
            if(hakuParams.has(avain)){
                return avain;
            }
        }
        return null;
    }

} // kaynnistaPalvelin -funktion loppu