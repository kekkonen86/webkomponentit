import { lisaysUrlPost, lisaysKuvaUrlPost } from './urlit';

function tallennaData(dataJson){
    return new Promise(async(resolve,reject)=>{
        const optiot = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(dataJson)
        };

        const tulos = await fetch(`${lisaysUrlPost}/${dataJson.numero}`, optiot);
        if(tulos.ok) {
            resolve(await tulos.json());
        }
        else{
            reject({viesti:'Lisäys ei onnistunut', tyyppi:'virhe'});
        }
    });
}

function tallennaKuva(kuva){
    return new Promise(async(resolve,reject)=>{
        const kuvaOptiot = {
            method: 'POST',
            body: kuva.kuvaData,
            mode: 'cors',
            headers: {
                'Datapalvelin-Tiedosto-Nimi': kuva.nimi
            }
        };
        const kuvalisays = await fetch(lisaysKuvaUrlPost, kuvaOptiot);
        if (kuvalisays.ok) {
            resolve(await kuvalisays.json());
        }
        else{
            reject({ viesti: 'Lisäys ei onnistunut', tyyppi: 'virhe' });
        }  
    });
}

export {tallennaData, tallennaKuva};