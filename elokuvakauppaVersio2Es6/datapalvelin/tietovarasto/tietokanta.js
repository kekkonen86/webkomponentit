import mariadb from 'mariadb';

export default class Tietokanta{

    constructor(yhteysoptiot){
        this.yhteysoptiot=yhteysoptiot;
    };

    get yhteys(){
        try{
            return mariadb.createConnection(this.yhteysoptiot);
        }
        catch(virhe){
            return null;
        }
    }
    //sql on sql lause merkkijonona ja parametrit on taulukko arvoja
    //sql-lauseessa olevien ? -merkkien tilalle
    suoritaKysely(sql, parametrit, yhteys){
        return new Promise(async (resolve,reject)=>{
            let uusiYhteys=false; //transaktiota varten
            try{
                if(!yhteys){
                    yhteys = await this.yhteys;
                    uusiYhteys=true;
                }
                let kyselynTulos = await yhteys.query(sql,parametrit);
                if(typeof kyselynTulos.affectedRows === 'undefined'){
                    resolve({kyselynTulos,tulosjoukko:true});
                }
                else{
                    resolve({
                        kyselynTulos:{
                            muutetutRivitLkm: kyselynTulos.affectedRows,
                            lisattyId: kyselynTulos.insertId,
                            status:kyselynTulos.warningStatus
                        },
                        tulosjoukko:false
                    });
                }
            }
            catch(virhe){
                reject('Sql-virhe: '+virhe);
            }
            finally{
                if(yhteys && uusiYhteys) yhteys.end();
            }
        });
    }; //suoritaKysely loppu
} // luokan loppu