'use strict';

import {Tiedot} from "./tietokomponentti.js";
customElements.define('tiedot-elementti',Tiedot);

document.addEventListener('DOMContentLoaded',alusta);
let syote;
let tulosalue;

function alusta(){
    syote=document.getElementById('syote');
    tulosalue=document.getElementById('tulos');
    document.getElementById('hae').addEventListener('click', paivita);
}

async function paivita(){
    tulosalue.innerHTML='';
    const jaatelo=syote.value;
    try{
        const data = 
            await fetch(`http://localhost:3001/jäätelöt/ehdolla?nimi=${jaatelo}`, {mode:'cors'});
        const tulosdata=await data.json();
        if(tulosdata.length>0){
            const tulos = tulosdata[0];
            const tiedot = new Tiedot();
            tiedot.nimi = tulos.nimi;
            tiedot.hinta = tulos.hinta;
            if (tulos.kuva) {
                const kuvatulos =
                    await fetch(`http://localhost:3001/jäätelöt/kuvat?nimi=${tulos.kuva}`, { mode: 'cors' });
                const kuva = await kuvatulos.blob();
                if (kuva) {
                    tiedot.kuvapolku = URL.createObjectURL(kuva);
                }
            }
            else{
                tiedot.kuvapolku = '';
            }
            tulosalue.appendChild(tiedot);
        }   
    }
    catch(virhe){
        alert(virhe.message);
    }
}


