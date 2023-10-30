import {Tehtava} from './tehtavakomponenttiV2.js';

let tehtavalista;
let tehtava;
let tuloslista;



document.addEventListener('DOMContentLoaded', aloita);

function aloita(){
    document.getElementById('lisaa').addEventListener('click', lisaaUusi);
    tehtava=document.getElementById('tehtava');
    tehtavalista=document.getElementById('tehtavalista');
    document.getElementById('yht').addEventListener('click',yhteenveto);
    tuloslista = document.querySelector('pre');
}

function lisaaUusi(){
    const teksti=tehtava.value;
    const uusi=document.createElement('tehtava-komponentti');
    // const uusi = new Tehtava();
    uusi.setAttribute('text',teksti);
    // uusi.text=teksti;
    tehtavalista.appendChild(uusi);
}

function yhteenveto(){
    const tehtavienTilat=[];
    for(const teht of tehtavalista.children){
        // console.log(teht);
        tehtavienTilat.push(`${teht.getAttribute('text')} : ${teht.getAttribute('state')}`);
    }
    tuloslista.textContent=tehtavienTilat.join('\n');
}
