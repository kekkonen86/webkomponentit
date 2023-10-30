import Tietokanta from './tietokanta.js';
import  {KOODIT,TYYPIT,VIESTIT} from './tilakoodit.js';

//määritellään require json tiedostojen lataamiseen
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const yhteystiedot = require('./yhteystiedot.json');
const sql = require('./sqlLauseet.json');

const haeKaikkiSql = sql.haeKaikki.join(' ');
const haeTilausnumerollaSql = sql.haeTilausNumerolla.join(' ');
const lisaaTilausSql = sql.lisaaTilaus.join(' ');
const lisaaTilausriviSql = sql.lisaaTilausrivi.join(' ');
const lisaaAsiakasSql = sql.lisaaAsiakas.join(' ');
const seuraavaTilausNroSql = sql.seuraavaTilausNro.join(' ');
const seuraavaAsiakasNroSql = sql.seuraavaAsiakasNro.join(' ');
const haeAsiakasSql = sql.haeAsiakas.join(' ');
const haeAsiakkaanTilauksetSql = sql.haeAsiakkaanTilaukset.join(' ');
const haeTilauksetNimellaSql = sql.haeTilauksetNimella.join(' ');

export default class Tietovarasto{
    constructor(){
        this.kanta=new Tietokanta(yhteystiedot);
    }

    get KOODIT(){
        return KOODIT
    }

    get TYYPIT(){
        return TYYPIT;
    }
//osa tarkastuksista puuttuu!
    haeKaikki(){
        return new Promise(async (resolve, reject)=>{
            try{
                const tulos = await this.kanta.suoritaKysely(haeKaikkiSql);
                resolve(tulos.kyselynTulos);
            }
            catch(virhe){
                console.log(virhe);
                reject(VIESTIT.OHJELMOINTIVIRHE());
            }
        });
    } //haeKaikki loppu

    haeTilausnumerolla(tilausnumero){
        return new Promise(async (resolve,reject)=>{
            try{
                const tulos = await this.kanta.suoritaKysely(haeTilausnumerollaSql,[tilausnumero]);
                if(tulos.kyselynTulos.length>0){
                    resolve(tulos.kyselynTulos);
                }
                else{
                    resolve(VIESTIT.EI_LOYTYNYT('tilausta numerolla',tilausnumero));
                }
            }
            catch(virhe){
                console.log(virhe);
                reject(VIESTIT.OHJELMOINTIVIRHE());
            }
        });

    } //haeTilausnumerolla loppu

    lisaaTilaus(tilaus){
        //tilaus={
        //     etunimi,
        //     sukunimi,
        //     tilaukset:[{elokuvanumero,lkm}]
        // }
        return new Promise(async (resolve,reject)=>{
            let yhteys;
            try{
                yhteys=await this.kanta.yhteys;
                yhteys.beginTransaction();
                const asiakas=
                    await this.kanta.suoritaKysely(haeAsiakasSql,[tilaus.etunimi,tilaus.sukunimi],yhteys);
                let asnro;
                if(asiakas.kyselynTulos.length>0){
                    asnro = asiakas.kyselynTulos[0].asiakasnumero;
                }
                else{
                    const apu=await this.kanta.suoritaKysely(seuraavaAsiakasNroSql, [], yhteys);
                    asnro=+apu.kyselynTulos[0].asiakasnumero;
                    // asnro = +(''+apu.kyselynTulos[0].asiakasnumero);
                    await this.kanta.suoritaKysely(lisaaAsiakasSql,[
                        asnro, tilaus.etunimi, tilaus.sukunimi
                    ],yhteys);
                }
                const tmp = await this.kanta.suoritaKysely(seuraavaTilausNroSql, [], yhteys);
                const tilausnumero=+tmp.kyselynTulos[0].tilausnumero;
                // const tilausnumero = +(''+tmp.kyselynTulos[0].tilausnumero);
                await this.kanta.suoritaKysely(lisaaTilausSql,[ tilausnumero,asnro], yhteys);

                for(const rivi of tilaus.tilaukset){
                    await this.kanta.suoritaKysely(lisaaTilausriviSql,
                        [tilausnumero,+rivi.numero,+rivi.lkm], yhteys);
                }
                const tulos={
                    tilausnumero,
                    asiakasnumero:asnro,
                    etunimi:tilaus.etunimi,
                    sukunimi:tilaus.sukunimi
                };
                await yhteys.commit(); //lopettaa transaction, jolloin muutokset jäävät pysyviksi
                resolve(tulos);
            }
            catch(virhe){
                console.log(virhe)
                if (yhteys) yhteys.rollback(); //peruu muutokset
                reject(VIESTIT.EI_LISATTY());
            }
            finally{
                if(yhteys) yhteys.end();
            }
        })
    } //lisaaTilaus loppu

    haeAsiakkaanTilaukset(asiakasnumero) {
        return new Promise(async (resolve, reject) => {
            try {
                const tulos = await this.kanta.suoritaKysely(haeAsiakkaanTilauksetSql, [asiakasnumero]);
                if (tulos.kyselynTulos.length > 0) {
                    resolve(tulos.kyselynTulos);
                }
                else {
                    resolve(VIESTIT.EI_LOYTYNYT('asiakasta numerolla', asiakasnumero));
                }
            }
            catch (virhe) {
                console.log(virhe);
                reject(VIESTIT.OHJELMOINTIVIRHE());
            }
        });

    } //haeAsiakkaanTilaukset loppu

    haeAsiakkaanNimella(etunimi,sukunimi) {
        return new Promise(async (resolve, reject) => {
            try {
                const tulos = await this.kanta.suoritaKysely(haeTilauksetNimellaSql, [etunimi,sukunimi]);
                if (tulos.kyselynTulos.length > 0) {
                    resolve(tulos.kyselynTulos);
                }
                else {
                    resolve(VIESTIT.EI_LOYTYNYT('asiakasta nimellä', `${etunimi} ${sukunimi}`));
                }
            }
            catch (virhe) {
                console.log(virhe);
                reject(VIESTIT.OHJELMOINTIVIRHE());
            }
        });

    } //haeAsiakkaanNimella loppu

} //luokan loppu