'use strict';

(function(){
    let jaatelovalinta;
    let tulosalue;
    let img;
    let option;
    let virhetemplate;
    let tietotemplate;

    document.addEventListener('DOMContentLoaded', alusta);

    async function alusta(){
        jaatelovalinta = document.getElementById('jaatelot');
        tulosalue = document.getElementById('tulosalue');
        virhetemplate = document.getElementById('virhetemplate');
        tietotemplate = document.getElementById('tietotemplate');
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
        const virhe = virhetemplate.content.cloneNode(true);
        const kappale=virhe.querySelector('p');
        kappale.textContent=viesti;
        return virhe;
    }

    function tyhjennaTulos(){
        for(const lapsisolmu of tulosalue.children){
            tulosalue.removeChild(lapsisolmu);
        }
    }


    function muodostaTiedot(data){
        const tiedot =tietotemplate.content.cloneNode(true);
        // const nimi=tiedot.querySelector('#nimi');
        // nimi.textContent=data.nimi; 
        //tai yhdellä rivillä:
        tiedot.querySelector('#nimi').textContent = data.nimi;
        const hinta=tiedot.querySelector('#hinta');
        hinta.textContent=`${data.hinta} €`;
    
        if (data.kuva && data.kuva.length > 0) {
            const kuva = img.cloneNode(true);
            kuva.setAttribute('id','kuva');
            kuva.src=`/kuvat/${data.kuva}`;
            tiedot.querySelector('div').appendChild(kuva);
        }
        return tiedot;
    }

})();