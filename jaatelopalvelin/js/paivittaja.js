'use strict';

(function(){
    let jaatelovalinta;
    let tulosalue;

    document.addEventListener('DOMContentLoaded', alusta);

    async function alusta(){
        jaatelovalinta = document.getElementById('jaatelot');
        tulosalue = document.getElementById('tulosalue');

        try{
            const data = await fetch('/lajit');
            const tulos = await data.json();
            // console.log(tulos);
            muodostaJaatelovalinta(tulos);
        }
        catch(err){
            naytaVirhe(err.message);
        }
    } //alustus loppuu

    function muodostaJaatelovalinta(jaatelolajit){
        if(!jaatelolajit || jaatelolajit.virhe){
            naytaVirhe('jäätelöä ei löytynyt');
        }
        else{
            for(const laji of jaatelolajit){
                const option = document.createElement('option');
                option.value=laji;
                option.textContent=laji;
                jaatelovalinta.appendChild(option);
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
                naytaVirhe('Haku ei onnistunut');
            }
        }
        else {
            tyhjennaTulos();
        }
    } //valitse loppu


    function paivita(data){
        console.log(data)
        if(!data){
            naytaVirhe('ohjelmointivirhe. Anteeksi!');
        }
        else if(data.virhe){
           naytaVirhe(data.virhe)
        }
        else if(data.nimi && data.nimi.length===0){
            tyhjennaTulos();
        }
        else{
            let tiedot=`
            <div id="tiedot">
            <p id="nimi">${data.nimi}</p>
            <p id="hinta">${data.hinta} €</p>
            </div>
            `;
            if(data.kuva && data.kuva.length>0){
                tiedot+=`<img id="kuva" src="/kuvat/${data.kuva}" />`
            }
            tulosalue.innerHTML=tiedot;
        }
    } //paivita

    function naytaVirhe(viesti){
        tulosalue.innerHTML=`
        <div class="virhe">
          <h2>Virhe</h2>
          <p>${viesti}</p>
        </div>`;
    }

    function tyhjennaTulos(){
        tulosalue.innerHTML='';
    }

})();