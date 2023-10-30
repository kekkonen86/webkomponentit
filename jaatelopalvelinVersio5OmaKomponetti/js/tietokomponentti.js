'use strict';

const template = document.createElement('template');

template.innerHTML=`
<style>
    .piiloon{
        display:none;
    }
</style>

<div id="tiedot">
    <p id="nimi"></p>
    <p id="hinta"></p>
    <img id="kuva" class="kuva">
</div>
`;

export class Tiedot extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        console.log('tietokomponentti liitetty sivun DOM:iin');
    }

    disconnectedCallback(){
        console.log('tietokomponentti poistettu sivun DOM:sta');
    }
    
    static get observedAttributes(){
        return ['data-nimi','data-hinta','data-kuvapolku'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log('muuttui',attribuutti,vanha,uusi);
        if(attribuutti==='data-nimi'){
            const nimi=this.shadowRoot.getElementById('nimi');
            nimi.textContent=uusi;
        }
        else if(attribuutti==='data-hinta'){
            const hinta=this.shadowRoot.getElementById('hinta');
            hinta.textContent=`${uusi} €`;

        }
        else if(attribuutti==='data-kuvapolku'){
            const kuva=this.shadowRoot.getElementById('kuva');
            if(uusi.length===0){
                kuva.setAttribute('src','');
                kuva.classList.add('piiloon');
            }
            else{
                kuva.setAttribute('src',uusi);
                kuva.classList.remove('piiloon');
            }
        }
    }
}

customElements.define('tiedot-elementti',Tiedot)