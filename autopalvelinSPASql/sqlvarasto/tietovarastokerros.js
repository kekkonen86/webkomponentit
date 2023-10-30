'use strict';

const { STATUSKOODIT, STATUSVIESTIT } = require('./statuskoodit');
const { 
    lisaysParametrit,
    paivitysParametrit }=require('./parametrifunktiot');

const Tietokanta = require('./tietokanta');
const yhteysoptiot=require('./yhteysoptiot.json');

const sql = require('./sqlLauseet.json');

const haeKaikkiSql = sql.haeKaikki.join(' ');
const haeSql = sql.hae.join(' ');
const lisaaSql = sql.lisaa.join(' ');
const paivitaSql = sql.paivita.join(' ');
const poistaSql = sql.poista.join(' ');

const PERUSAVAIN=sql.perusavain;

//Tietovarasto

module.exports = class Tietovarasto{
    constructor(){
        this.kanta=new Tietokanta(yhteysoptiot);
    }

    get STATUSKOODIT(){
        return STATUSKOODIT;
    }
    get resurssi() {
        return 'autot';//paranneltava
    }

    get kuvakansio() {
        return ''; //paranneltava
    }

    haeKaikki(){
        return new Promise(async (resolve, reject)=>{
            try{
                const tulos = await this.kanta.suoritaKysely(haeKaikkiSql);
                resolve(tulos.kyselynTulos);

            }
            catch(virhe){
                console.log(virhe);
                reject(STATUSVIESTIT.OHJELMAVIRHE());
            }
        });
    } //haeKaikki loppu

    hae(id){
        return new Promise(async (resolve,reject)=>{
            if(!id){
                reject(STATUSVIESTIT.EI_LOYTYNYT('--- tyhjä ---'));
            }
            else{
                try{
                    const tulos=await this.kanta.suoritaKysely(haeSql,[id]);
                    if(tulos.kyselynTulos.length>0){
                        resolve(tulos.kyselynTulos[0]);
                    }
                    else{
                        reject(STATUSVIESTIT.EI_LOYTYNYT(id))
                    }
                }
                catch(virhe){
                    console.log(virhe);
                    reject(STATUSVIESTIT.OHJELMAVIRHE());
                }
            }
        });
    } //hae loppu

    lisaa(uusi){
        return new Promise(async (resolve,reject)=>{
            try{
                if(uusi){
                    if(!uusi[PERUSAVAIN]){
                        reject(STATUSVIESTIT.EI_LISATTY());
                    }
                    else{
                        const hakutulos=
                            await this.kanta.suoritaKysely(haeSql, [uusi[PERUSAVAIN]]);
                        if(hakutulos.kyselynTulos.length>0){
                            reject(STATUSVIESTIT.JO_KAYTOSSA(uusi[PERUSAVAIN]));
                        }
                        else{
                            const status=
                                await this.kanta.suoritaKysely( lisaaSql,
                                                                lisaysParametrit(uusi));
                            resolve(STATUSVIESTIT.LISAYS_OK(uusi[PERUSAVAIN]));
                        }
                    }
                }
                else{
                    reject(STATUSVIESTIT.EI_LISATTY());
                }

            }
            catch(virhe){
                console.log(virhe);
                reject(STATUSVIESTIT.EI_LISATTY());
            }
        });
    } //lisaa loppu

    poista(id){
        return new Promise(async (resolve,reject)=>{
            if(!id){
                reject(STATUSVIESTIT.EI_LOYTYNYT('--- tyhjä ---'));
            }
            else{
                try{
                    const status= 
                        await this.kanta.suoritaKysely(poistaSql,[id]);
                    if(status.kyselynTulos.muutetutRivitLkm===0){
                        resolve(STATUSVIESTIT.EI_POISTETTU());
                    }
                    else{
                        resolve(STATUSVIESTIT.POISTO_OK(id));
                    }

                }
                catch(virhe){
                    reject(STATUSVIESTIT.OHJELMAVIRHE());
                }
            }
        });
    }//poista loppu

    paivita(muutettu){
        return new Promise(async (resolve,reject)=>{
            if(muutettu){
                try{
                    const status=
                        await this.kanta.suoritaKysely( paivitaSql,
                                                        paivitysParametrit(muutettu));
                    if(status.kyselynTulos.muutetutRivitLkm===0){
                        resolve(this.lisaa(muutettu));
                        // const status = STATUSVIESTIT.EI_PAIVITETTY();
                        // status.tyyppi='info'; //mahdollista,mutta ei suositeltavaa
                        // resolve(status);
                    }
                    else{
                        resolve(STATUSVIESTIT.PAIVITYS_OK(muutettu[PERUSAVAIN]));
                    }
                }
                catch(virhe){
                    reject(STATUSVIESTIT.EI_PAIVITETTY());
                }
            }
            else{
                reject(STATUSVIESTIT.EI_PAIVITETTY());
            }
        })
    }//paivitys loppu



} //luokan loppu