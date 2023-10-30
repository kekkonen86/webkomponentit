import {Tiedot} from "./tietokomponentti.js";
import {Virhe} from "./virhekomponentti.js";
import {Valintalista} from "./valintalistakomponentti.js";


    let jaatelovalinta;
    let tulosalue;
    let option;
    let virheElementti;
    let tiedot;

    document.addEventListener('DOMContentLoaded', alusta);

    async function alusta(){
        jaatelovalinta = document.querySelector('#jaatelovalinta');
        tulosalue = document.getElementById('tulosalue');
        virheElementti = document.createElement('virhe-elementti');
        tiedot=document.createElement('tiedot-elementti');
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
            jaatelovalinta.setAttribute('data-valinnat',jaatelolajit.join());
            jaatelovalinta.addEventListener('valittu',valitse);
            jaatelolajit.value='';
        }
    } //muodostaJaatelovalinta loppu

    async function valitse(){
        const jaatelo=jaatelovalinta.valittu;
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
            paivitaTiedot(data);
            if(!tiedot.isConnect){
                tyhjennaTulos();
                tulosalue.appendChild(tiedot);
            }
        }
    } //paivita

    function naytaVirhe(viesti){
        virheElementti.setAttribute('data-viesti',viesti);
        if(!virheElementti.isConnect){
            tyhjennaTulos();
            tulosalue.appendChild(virheElementti);
        }
        
    }

    function tyhjennaTulos(){
        for(const lapsisolmu of tulosalue.children){
            tulosalue.removeChild(lapsisolmu);
        }
    }

    function paivitaTiedot(data){
        tiedot.setAttribute('data-nimi',data.nimi);
        tiedot.setAttribute('data-hinta', data.hinta);
        if(data.kuva && data.kuva.length>0){
            tiedot.setAttribute('data-kuvapolku',`/kuvat/${data.kuva}`);
        }
        else{
            tiedot.setAttribute('data-kuvapolku','');
        }  
    }

