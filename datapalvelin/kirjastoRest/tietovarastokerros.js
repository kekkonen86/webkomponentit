'use strict';
const path = require('path');

function luoTietovarasto(juuripolku,config){
    const kirjastoRestPolku = path.join(juuripolku, 'kirjastoRest');
    const statusPolku = path.join(kirjastoRestPolku,'statuskoodit.js');
    const apufunktiotPolku = path.join(kirjastoRestPolku, 'varastoapufunktiot.js')

    const { STATUSKOODIT, STATUSVIESTIT } =require(statusPolku);

    const {luoVarastokerros} = require(apufunktiotPolku);

    const {
        haeKaikkiVarastosta,
        haeYksiVarastosta,
        lisaaVarastoon,
        poistaVarastosta,
        paivitaVarasto,
        perusavain,
        resurssi,
        kuvakansio
    } = luoVarastokerros(juuripolku,config);

    class Tietovarasto{
        get STATUSKOODIT(){
            return STATUSKOODIT;
        }

        get resurssi(){
            return resurssi;
        }

        get kuvakansio(){
            return kuvakansio;
        }

        haeKaikki(){
            return haeKaikkiVarastosta();
        }

        hae(arvo){
            return new Promise(async (resolve, reject)=>{
                if(!arvo){
                    reject(STATUSVIESTIT.EI_LOYTYNYT('--tyhjä--'))
                }
                else{
                    const tulos = await haeYksiVarastosta(arvo);
                    if(tulos){
                        resolve(tulos);
                    }
                    else {
                        reject(STATUSVIESTIT.EI_LOYTYNYT(arvo));
                    }
                }
            });
        }

        lisaa(uusi){
            return new Promise(async (resolve,reject)=>{
                if(uusi){
                    if(await lisaaVarastoon(uusi)){
                        resolve(STATUSVIESTIT.LISAYS_OK(uusi[perusavain]));
                    }
                    else{
                        reject(STATUSVIESTIT.EI_LISATTY());
                    }
                }
                else{
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
            })
        } //lisaa loppu

        poista(arvo) {
            return new Promise(async (resolve, reject) => {
                if (!arvo) {
                    reject(STATUSVIESTIT.EI_LOYTYNYT('--tyhjä--'))
                }
                else if(await poistaVarastosta(arvo)){
                    resolve(STATUSVIESTIT.POISTO_OK(arvo))
                }   
                else {
                    reject(STATUSVIESTIT.EI_POISTETTU());
                }   
            });
        } //poisto loppu

        paivita(muutettuOlio,avain){
            console.log(muutettuOlio,avain)
            return new Promise(async (resolve,reject)=>{
                if (muutettuOlio && avain) {
                    if(muutettuOlio[perusavain]!=avain){
                        reject(STATUSVIESTIT.PERUSAVAIN_RISTIRIITAINEN(
                            muutettuOlio[perusavain],avain));
                    }
                    else if(await haeYksiVarastosta(muutettuOlio[perusavain])){
                        if(await paivitaVarasto(muutettuOlio)){
                            resolve(STATUSVIESTIT.PAIVITYS_OK(muutettuOlio[perusavain]));
                        }
                        else{
                            reject(STATUSVIESTIT.EI_PAIVITETTY());
                        }
                    }
                    else if(await lisaaVarastoon(muutettuOlio)){
                        resolve(STATUSVIESTIT.LISAYS_OK(muutettuOlio[perusavain]));
                    }
                    else{
                        reject(STATUSVIESTIT.EI_LISATTY());
                    }
                }
                else {
                    reject(STATUSVIESTIT.EI_PAIVITETTY());
                }
            });   
        }//paivita loppu

    }  //luokan loppu

    return new Tietovarasto();

}//luoTietovarasto-funktion loppu

module.exports={luoTietovarasto};