'use strict';

(function(){
    let jaatelovalinta;
    let tulosalue;
    let div;
    let p;
    let h2;
    let img;
    let option;

    document.addEventListener('DOMContentLoaded', alusta);

    async function alusta(){
        jaatelovalinta = document.getElementById('jaatelot');
        tulosalue = document.getElementById('tulosalue');
        div = document.createElement('div');
        p = document.createElement('p');
        h2 = document.createElement('h2');
        img = document.createElement('img');
        option = document.createElement('option');

        try{
            const data = await fetch('/lajit');
            const tulos = await data.json();
            // console.log(tulos);
            muodostaJaatelovalinta(tulos);
        }
        catch(err){
            tyhjennaTulos();
            naytaVirhe(err.message);
        }
    } //alustus loppuu

    function muodostaJaatelovalinta(jaatelolajit){
        if(!jaatelolajit || jaatelolajit.virhe){
            tyhjennaTulos();
            naytaVirhe('jäätelöä ei löytynyt');
        }
        else{
            for(const laji of jaatelolajit){
                const vaihtoehto = option.cloneNode(true);
                vaihtoehto.value=laji;
                vaihtoehto.textContent=laji;
                jaatelovalinta.appendChild(vaihtoehto);
            }
            jaatelovalinta.addEventListener('change',valitse);
            jaatelolajit.value='';
        }
    } //muodostaJaatelovalinta loppu

    async function valitse(){
        const jaatelo=jaatelovalinta.value;
        if(jaatelo.length>0){
            try{
                const data = await fetch(`/jäätelö/${jaatelo}`);
                const tulos = await data.json();
                // console.log(tulos)
                paivita(tulos);
            }
            catch(err){
                tyhjennaTulos();
                naytaVirhe('Haku ei onnistunut');
            }
        }
        else {
            tyhjennaTulos();
        }
    } //valitse loppu


    function paivita(data){
        tyhjennaTulos();
        if(!data){
            naytaVirhe('ohjelmointivirhe. Anteeksi!');
        }
        else if(data.virhe){
           naytaVirhe(data.virhe)
        }
        else if(data.nimi && data.nimi.length>0){
            tulosalue.appendChild(muodostaTiedot(data));
        }
    } //paivita

    function naytaVirhe(viesti){
        tulosalue.appendChild(luoVirheViesti(viesti));
    }


    function luoVirheViesti(viesti){
        const virhe=div.cloneNode(true);
        virhe.setAttribute('class','virhe');
        const otsikko = h2.cloneNode(true);
        otsikko.textContent='Virhe';
        const kappale=p.cloneNode(true);
        kappale.textContent=viesti;
        virhe.appendChild(otsikko);
        virhe.appendChild(kappale);
        return virhe;
    }

    function tyhjennaTulos(){
        if(tulosalue.hasChildNodes()){
            tulosalue.removeChild(tulosalue.firstChild);
        }
    }


    function muodostaTiedot(data){
        const tiedot = div.cloneNode(true);
        tiedot.setAttribute('id','tiedot');
        const nimi = p.cloneNode(true);
        nimi.setAttribute('id','nimi');
        nimi.textContent=data.nimi;
        const hinta=p.cloneNode(true);
        hinta.setAttribute('id','hinta');
        hinta.textContent=`${data.hinta} €`;
        tiedot.appendChild(nimi);
        tiedot.appendChild(hinta);
        if (data.kuva && data.kuva.length > 0) {
            const kuva = img.cloneNode(true);
            kuva.setAttribute('id','kuva');
            kuva.src=`/kuvat/${data.kuva}`;
            tiedot.appendChild(kuva);
        }
        return tiedot;
    }

})();