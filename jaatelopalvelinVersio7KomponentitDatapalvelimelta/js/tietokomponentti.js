'use strict';

const template = document.createElement('template');

template.innerHTML=`
<style>
  .piiloon{
    display:none;
  }
</style>

<div>
    <p id="nimi"></p>
    <p id="hinta"></p>
    <img id="kuva">
</div>`;

export class Tiedot extends HTMLElement{
    #shadow;
    #nimielementti;
    #hintaelementti;
    #kuvaelementti;
    constructor(){
        super();

        this.#shadow=this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#nimielementti=this.#shadow.getElementById('nimi');
        this.#hintaelementti=this.#shadow.getElementById('hinta');
        this.#kuvaelementti=this.#shadow.getElementById('kuva');
    }

    connectedCallback(){
        console.log('tietokomponenttin lisätty DOMiin');
    }

    disconnectedCallback(){
        console.log('tietokomponentti poistettiin DOMista');
    }

    //js rajapinta
    get nimi(){
        return this.getAttribute('nimi');
    }
    set nimi(uusinimi){
        this.setAttribute('nimi',uusinimi?uusinimi:'');  
    }

    get hinta(){
        return this.getAttribute('hinta');
    }

    set hinta(uusihinta){
        this.setAttribute('hinta', uusihinta?uusihinta:'');
    }

    get kuvapolku(){
        return this.getAttribute('kuvapolku');
    }
    set kuvapolku(uusikuvapolku){
        this.setAttribute('kuvapolku',uusikuvapolku?uusikuvapolku:'');
    }

    static get observedAttributes(){
        return ['nimi','hinta','kuvapolku']
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log(attribuutti, vanha, uusi);
        if(attribuutti==='nimi'){
            this.#nimielementti.textContent=uusi;
        }
        else if(attribuutti==='hinta'){
            this.#hintaelementti.textContent=uusi;
        }
        else if(attribuutti==='kuvapolku'){
            if(uusi.length===0){
                this.#kuvaelementti.setAttribute('src','');
                this.#kuvaelementti.classList.add('piiloon');
            }
            else{
                this.#kuvaelementti.setAttribute('src',uusi);
                this.#kuvaelementti.classList.remove('piiloon');
            }
        }
    }
    //vain demoa varten
    tausta(vari){
        this.#nimielementti.style.backgroundColor=vari;
    }

    set taustaVari(vari){
        this.#hintaelementti.style.backgroundColor = vari;
    }
}