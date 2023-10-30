'use strict';

(function(){
    let metodi='GET';
    let urikentta;
    let jsonalue;
    let tulosalue;

    document.addEventListener('DOMContentLoaded', alusta);

    function alusta(){
        urikentta = document.getElementById('urikentta');
        jsonalue = document.getElementById('jsonalue');
        tulosalue = document.getElementById('tulosalue');

        document.getElementById('laheta')
            .addEventListener('click', laheta);

        document.getElementById('metodit')
            .addEventListener('change', valitse);

        tyhjennaValinnat();

        urikentta.value='http://localhost:3000/api/';
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