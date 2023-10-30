import {Tiedot} from "./tietokomponentti.js";

customElements.define('tiedot-elementti',Tiedot);

document.addEventListener('DOMContentLoaded',alusta);

function alusta(){
    const tiedot=document.getElementById('eka');
    tiedot.nimi='Kattila'; //käyttää setteriä
    // tiedot.setAttribute('nimi','Kattila');
    const uusiTieto=document.createElement('tiedot-elementti');
    uusiTieto.nimi='uusi nimi';
    uusiTieto.hinta=23;
    uusiTieto.kuvapolku='/kuvat/testi.png';
    uusiTieto.taustaVari='pink';
    document.querySelector('main').appendChild(uusiTieto);

    const toka=new Tiedot();
    toka.nimi='toka';
    toka.hinta=45;
    toka.kuvapolku ='/kuvat/testi.png';
    toka.tausta('red'); //normaali metodikutsu
    toka.taustaVari='orange'; //setterillä
    document.querySelector('main').appendChild(toka);

}