const template = document.createElement('template');

template.innerHTML=`
    <style>
        :host{
            display:block;
        }
        #rivi{
            display:flex;
        }
        #nimi{
            width:30%;
        }
        #hinta, #maara, #yht{
            width:15%;
        }
        span{
            color:blue;
        }
    </style>
    <div id="rivi" part="rivi">
        <div part="nimi" id="nimi"></div>
        <div part="arvo" id="hinta"><span part="hinta"></span> €</div>
        <div part="arvo" id="maara"><span part="maara"></span> kpl</div>
        <div part="yhteensa" id="yht">yhteensä <span part="yht"></span> €</div>
    </div>
`;

export class Tuoterivi extends HTMLElement{
    #shadow
    #nimi
    #hinta
    #maara
    #yht

    constructor(){
        super();

        this.#shadow=this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#nimi = this.#shadow.querySelector('#nimi');
        this.#hinta = this.#shadow.querySelector('#hinta span');
        this.#maara = this.#shadow.querySelector('#maara span');
        this.#yht = this.#shadow.querySelector('#yht span');
    }

    get nimi(){
        return this.getAttribute('nimi');
    }
    set nimi(uusi){
        this.setAttribute('nimi',uusi);
    }

    get hinta(){
        return this.getAttribute('hinta');
    }
    set hinta(uusi){
        this.setAttribute('hinta', uusi);
    }

    get maara() {
        return this.getAttribute('maara');
    }
    set maara(uusi) {
        this.setAttribute('maara', uusi);
    }

    static get observedAttributes(){
        return ['nimi','hinta','maara'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log('muuttui', attribuutti, vanha, uusi);
        if(attribuutti==='nimi'){
            this.#nimi.innerText=uusi;
        }
        else if(attribuutti==='hinta'){
            this.#hinta.innerText=uusi;
            this.#yht.innerText=(+this.getAttribute('maara')* +uusi);
        }
        else if (attribuutti === 'maara') {
            this.#maara.innerText = uusi;
            this.#yht.innerText = (+this.getAttribute('hinta') * +uusi);
        }
    }
} //luokan loppu

try{
    customElements.define('tuote-rivi',Tuoterivi);
}
catch(virhe){
    console.log('elementti oli jo määritelty:',virhe.message);
}