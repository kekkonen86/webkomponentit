'use strict';

const fs=require('fs').promises;

async function lueVarasto(varastoTiedostoPolku){
    try{
        const data = await fs.readFile(varastoTiedostoPolku,'utf8');
        return JSON.parse(data);
    }
    catch(virhe){
        return [];
    }
}

async function kirjoitaVarasto(varastoTiedostoPolku, data){
    try{
        await fs.writeFile(varastoTiedostoPolku,
            JSON.stringify(data,null,4),{
                encoding:'utf8',
                flag:'w'
        });
        return true;

    }
    catch(virhe){
        return false;
    }
}

module.exports={lueVarasto, kirjoitaVarasto}