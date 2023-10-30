import { Tuotetiedot } from "./tuotekomponentti.js";
import { Valintalista } from "./valintalistakomponentti.js";

document.addEventListener('DOMContentLoaded', alusta);

let avainkentta;
let arvokentta;
let tulosalue;

function alusta(){
    avainkentta=document.getElementById('hakuavain');
    arvokentta=document.getElementById('hakuarvo');
    tulosalue=document.getElementById('tulosalue');

    fetch(`http://localhost:3002/tuotteet/hakuavaimet`,{mode:'cors'})
        .then(data=>data.json())
        .then(avaimet=>avainkentta.setAttribute('data-valinnat',avaimet.join()))
        .catch(console.log);

    document.getElementById('hae').addEventListener('click',haeTuote);
}

async function haeTuote(){
    tulosalue.innerHTML='';
    try{
        const avain=avainkentta.valittu;
        const arvo=arvokentta.value;
        if(avain && arvo){
            const data = 
              await fetch(`http://localhost:3002/tuotteet/ehdolla?${avain}=${arvo}`,{mode:'cors'});
            const tuotteet=await data.json();
            for(const tuote of tuotteet){
                const tuotekomponentti=document.createElement('tuote-elementti');
                tuotekomponentti.setAttribute('tuotenumero',tuote.tuotenumero);
                tuotekomponentti.setAttribute('nimi',tuote.nimi);
                tuotekomponentti.setAttribute('hinta',tuote.hinta);
                tuotekomponentti.setAttribute('väri',tuote.väri);
                tuotekomponentti.setAttribute('huomautuksia',tuote.huomautuksia);
                tulosalue.appendChild(tuotekomponentti);
            }
        }
    }
    catch(virhe){
        console.log(virhe);
    }
}
