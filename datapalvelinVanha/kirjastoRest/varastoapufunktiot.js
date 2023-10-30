'use strict';

const path = require('path');

function luoVarastokerros(juuripolku,config){

    const varastoConfigPolku=
        path.join(juuripolku,config.varasto.kansio,
                  config.varasto.asetustiedosto);

    const {
        varastotiedosto,
        perusavain,
        resurssi,
        kuvakansio,
        muunnin
    } = require(varastoConfigPolku);

    const varastoPolku = 
        path.join(juuripolku, config.varasto.kansio, varastotiedosto);
    const kirjastokansioPolku=path.join(juuripolku,config.kirjasto.kansio);
    const { muunna } = require(path.join(juuripolku, 
                            config.varasto.kansio,muunnin));
    const {
        lueVarasto, 
        kirjoitaVarasto
    }=require(path.join(kirjastokansioPolku,'varastokasittelija'));

    async function haeKaikkiVarastosta(){
        return (lueVarasto(varastoPolku));
    }

    async function haeYksiVarastosta(arvo){
        return (await lueVarasto(varastoPolku))
            .find(olio=>olio[perusavain]==arvo) || null;
    }

    async function lisaaVarastoon(uusiOlio){
        const varasto = await lueVarasto(varastoPolku);
        varasto.push(muunna(uusiOlio));
        return await kirjoitaVarasto(varastoPolku,varasto);
    }

    async function poistaVarastosta(arvo){
        const varasto = await lueVarasto(varastoPolku);
        const i=varasto.findIndex(alkio=>alkio[perusavain]==arvo);
        if(i<0) return false;
        varasto.splice(i,1);
        return await kirjoitaVarasto(varastoPolku, varasto);
    }

    async function paivitaVarasto(olio){
        const varasto = await lueVarasto(varastoPolku);
        const vanhaOlio= 
            varasto.find(vanha=>vanha[perusavain]==olio[perusavain]);

        if(vanhaOlio){
            Object.assign(vanhaOlio,muunna(olio));
            return await kirjoitaVarasto(varastoPolku, varasto);
        }
        return false;
    }


    return {
        haeKaikkiVarastosta,
        haeYksiVarastosta,
        lisaaVarastoon,
        poistaVarastosta,
        paivitaVarasto,
        perusavain,
        resurssi,
        kuvakansio
    }
}

module.exports={luoVarastokerros}