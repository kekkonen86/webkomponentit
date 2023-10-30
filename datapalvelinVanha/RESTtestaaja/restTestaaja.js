'use strict';

(function(){
    let metodi='GET';
    let urikentta;
    let jsonalue;
    let tulosalue;
    let kuva;

    document.addEventListener('DOMContentLoaded', alusta);

    function alusta(){
        urikentta = document.getElementById('urikentta');
        jsonalue = document.getElementById('jsonalue');
        tulosalue = document.getElementById('tulosalue');
        kuva=document.querySelector('img');

        document.getElementById('laheta')
            .addEventListener('click', laheta);

        document.getElementById('metodit')
            .addEventListener('change', valitse);

        document.querySelector('input[type="file"]')
            .addEventListener('change', e=>{
                const nimi=e.target.files[0].name;
                kuva.src=URL.createObjectURL(e.target.files[0]);
                lataaPalvelimelle(nimi, e.target.files[0]);
            });

        tyhjennaValinnat();

        urikentta.value='http://localhost:4000/rest/';
    }

    async function lataaPalvelimelle(nimi, data){
        const optiot={
            method:'POST',
            body:data,
            mode:'cors',
            headers:{
                'Datapalvelin-Tiedosto-nimi':nimi
            }
        };

        try{
            const vastaus=await fetch(urikentta.value, optiot);
            let tyyppi='virhe'
            let viesti='';
            if(vastaus.ok){
                tyyppi='info';
                viesti='tallennettu ';
            }
            viesti+=await vastaus.json();
            naytaViesti({ viesti, tyyppi })
        }
        catch(virhe){
            naytaViesti({ viesti: virhe.message, tyyppi: 'virhe' });
        }

    }

    function tyhjennaValinnat(){
        tulosalue.textContent='';
        metodi='GET';
        document.getElementById('get').checked=true;
    }

    function valitse(e){
        tulosalue.textContent='';
        metodi=e.target.value;
    }

    // function laheta(){
    //     const optiot={
    //         method:metodi,
    //         mode:'cors',
    //         headers:{'Content-Type':'application/json'}
    //     }

    //     if(metodi==='PUT' || metodi==='POST'){
    //         optiot.body=jsonalue.value;
    //     }

    //     fetch(urikentta.value, optiot)
    //     .then(data=>data.json())
    //     .then(tulos=>naytaViesti(tulos))
    //     .catch(virhe=>
    //         naytaViesti({ viesti: virhe.message, tyyppi: 'virhe'}));
    // } //laheta loppu

    async function laheta() {
        const optiot = {
            method: metodi,
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        }

        if (metodi === 'PUT' || metodi === 'POST') {
            optiot.body = jsonalue.value;
        }
        try{
            const data = await fetch(urikentta.value, optiot);
            const tulos=await data.json();
            naytaViesti(tulos);

        }
        catch(virhe){
            naytaViesti({ viesti: virhe.message, tyyppi: 'virhe' });
        }
        
                
    } //laheta loppu

    function naytaViesti(data){
        tulosalue.textContent=JSON.stringify(data,null,4);
    }

})();