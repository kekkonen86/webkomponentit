import { Elokuvakori } from "/js/webkomponentit/elokuvakori.js";
import {Tuoterivi} from "/js/webkomponentit/tuoterivi.js";

document.addEventListener('DOMContentLoaded', alusta);

const leffakortit=[];
let tilausrivit;
let kuitti;
let teetilaus;
let elokuvaDiv;

async function alusta(){
    elokuvaDiv=document.getElementById('elokuvat');
    tilausrivit = document.getElementById('tilausrivit');
    teetilaus = document.getElementById('teetilaus');
    kuitti = document.getElementById('kuitti');
    teetilaus.classList.add('piilotettu');
    kuitti.classList.add('piilotettu');
    document.getElementById('valmis').addEventListener('click', valmis);

    try{
        const data = await fetch('http://localhost:3004/elokuvat',{mode:'cors'});
        const elokuvat=await data.json();

        for(const elokuva of elokuvat){
            const leffa=new Elokuvakori(elokuva); 
            leffa.addEventListener('lisatty',nayta);
            
            leffakortit.push(leffa);
            elokuvaDiv.appendChild(leffa);
        }
    }
    catch(virhe){
        console.log(virhe);
    }
}

function nayta(){
    const tilattavatTuotteet=leffakortit.filter(alkio=>alkio.lukumaara>0)
        .map(kortti=> ({nimi:kortti.nimi, hinta:kortti.hinta, lkm:kortti.lukumaara}));
    tilausrivit.innerHTML='';
    for(const tuote of tilattavatTuotteet){
        const trivi=document.createElement('tuote-rivi');
        trivi.setAttribute('nimi',tuote.nimi);
        trivi.setAttribute('hinta',tuote.hinta);
        trivi.setAttribute('maara',tuote.lkm);
        tilausrivit.appendChild(trivi);
    }
    if(tilattavatTuotteet.length>0){
        teetilaus.classList.remove('piilotettu');
    }
    else {
        teetilaus.classList.add('piilotettu');
    }
}

async function valmis(){
    nayta();
    const tilaukset=leffakortit.filter(alkio=>alkio.lukumaara>0)
        .map(kortti=>({numero:kortti.numero, lkm:kortti.lukumaara}));
    const enimi=document.getElementById('etunimi');
    const snimi = document.getElementById('sukunimi');
    if(enimi.value.length===0 || snimi.value.length===0){
        alert('Anna etu- ja sukunimi!');
        return;
    }

    const tilaus = {
        etunimi:enimi.value,
        sukunimi:snimi.value,
        tilaukset
    };
    console.log(tilaus);

    const optiot={
        method:'POST',
        mode:'cors',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(tilaus)
    };

    const pre = document.querySelector('pre');
    try{
        const data = await fetch('http://localhost:3004/tilaa',optiot);
        const tulos = await data.json();
        console.log(tulos)
        pre.textContent=`Kiitos tilauksestasi ${tulos.etunimi} ${tulos.sukunimi}`+
        `\nTilauksesi numero on ${tulos.tilausnumero}`+
        `\nAsiakasnumerosi on ${tulos.asiakasnumero}`;
        kuitti.classList.remove('piilotettu');
        document.querySelector('section').classList.add('piilotettu');
    }
    catch(virhe){
        console.log(virhe);
    }
}