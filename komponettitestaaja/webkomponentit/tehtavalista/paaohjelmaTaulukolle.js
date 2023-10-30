import { Tehtava } from './tehtavakomponenttiV2.js';

document.addEventListener('DOMContentLoaded', aloita);

function aloita(){
    for(const rivi of document.querySelector('tbody').children){
        const solu=rivi.querySelector('td');
        const tk=solu.querySelector('tehtava-komponentti');
        rivi.querySelector('.tila').textContent=tk.getAttribute('state');
        solu.addEventListener('tilavaihtui', vaihda);
        solu.addEventListener('poistui', poista);
    }

    function vaihda(e){
        e.target.parentNode.parentNode.querySelector('.tila').textContent=
            e.target.getAttribute('state');
    }

    function poista(e){
        const tbody = e.target.parentNode.parentNode.parentNode;
        const rivi = e.target.parentNode.parentNode;
        tbody.removeChild(rivi);
    }
}