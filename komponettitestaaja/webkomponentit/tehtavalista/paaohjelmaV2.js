import {Tehtava} from './tehtavakomponenttiV2.js';

let tehtavalista;
let tehtava;
let tuloslista;

const talletuksestaPalautetut=[
    { teksti: 'aaaaa', tila: 'Valmis' }, 
    { teksti: 'bbbb', tila: 'Tekeillä' },
    { teksti: 'ccc', tila: 'Aloittamatta' },
    { teksti: 'ddddd', tila: 'Valmis' }
]



document.addEventListener('DOMContentLoaded', aloita);

function aloita(){
    document.getElementById('lisaa').addEventListener('click', lisaaUusi);
    tehtava=document.getElementById('tehtava');
    tehtavalista=document.getElementById('tehtavalista');
    document.getElementById('yht').addEventListener('click',yhteenveto);
    tuloslista = document.querySelector('pre');
    palautaTalletetut();
}

function palautaTalletetut(){
    for (const tehtava of talletuksestaPalautetut){
        const teht = document.createElement('tehtava-komponentti');
        teht.setAttribute('text',tehtava.teksti);
        teht.setAttribute('state',tehtava.tila);
        tehtavalista.appendChild(teht);
    }
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
