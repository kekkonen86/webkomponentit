'use strict';

const path = require('path');

const MIMETYYPIT ={
    '.png': { tyyppi: 'image/png', koodaus: 'binary' },
    '.jpg': { tyyppi: 'image/jpeg', koodaus: 'binary' },
    '.jpeg': { tyyppi: 'image/jpeg', koodaus: 'binary' },
    '.gif': { tyyppi: 'image/gif', koodaus: 'binary' },
    '.ico': { tyyppi: 'image/vnd.microsoft.icon', koodaus: 'binary' }
};

const luoVarasto =(asetuspolku,varastokansio,varastokasittelijaPolku)=>{
    const {
        varastotiedosto,
        perusavain,
        hakuavaimet,
        resurssi,
        kuvakansio
    } = require(asetuspolku);

    const {lueVarasto,lueKuva}=require(varastokasittelijaPolku);

    const varastotiedostoPolku=path.join(varastokansio,varastotiedosto);

    const haeKaikki = async () =>{
        try{
            return await lueVarasto(varastotiedostoPolku);
        }
        catch(virhe){
            // console.log(virhe);
            return [];
        }
    }

    const hae = async (avain,arvo)=>{
        try{
            const tiedot = await lueVarasto(varastotiedostoPolku);
            return tiedot.filter(alkio=>alkio[avain]==arvo);
        }
        catch(virhe){
            // console.log(virhe);
            return [];
        }
    };

    const haeArvot = async (avain, vainKertaalleen=false) =>{
        try{
            const tiedot = await lueVarasto(varastotiedostoPolku);
            const arvot = [];
            if(vainKertaalleen){
                for(const alkio of tiedot){
                    if (alkio[avain] && !arvot.includes(alkio[avain])) {
                        arvot.push(alkio[avain]);
                    }
                }  
            }
            else{
                for (const alkio of tiedot) {
                    if (alkio[avain]) {
                        arvot.push(alkio[avain]);
                    }
                }   
            }
            return arvot;
        }
        catch(virhe){
            return [];
        }
    };

    const haeAvaimet = async ()=>{
        try{
            const tiedot = await lueVarasto(varastotiedostoPolku);
            const nimet = new Set(tiedot.flatMap(alkio=>Object.keys(alkio)));
            return [...nimet];
        }
        catch(virhe){
            // console.log(virhe)
            return [];
        }
    };

    const haeKuva = async kuvatiedostonNimi =>{
        if(kuvakansio){
            try {
                const tiedostotunniste = path.extname(kuvatiedostonNimi).toLocaleLowerCase();
                if (!MIMETYYPIT[tiedostotunniste]) return null;
                const mime = MIMETYYPIT[tiedostotunniste];
                const kuvapolku = path.join(varastokansio, kuvakansio, kuvatiedostonNimi);
                const kuvaData = await lueKuva(kuvapolku);
                return { kuvaData, mime };
            }
            catch (virhe) {
                return null;
            }
        }
        else {
            return null;
        }
    }

    return {
        haeKaikki,
        hae,
        haeArvot,
        haeAvaimet,
        haeKuva,
        perusavain,
        hakuavaimet,
        resurssi
    }
} //luoVarasto -funktion loppu

module.exports={luoVarasto};