const template = document.createElement('template');
template.innerHTML=`
    <style>
        :host{
            display:block;
            max-width:fit-content;
        }
        div{
            display:grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto 1fr;
        }
        ostos-kori, p{
            grid-column: 1 / 2;
            grid-row: 1/ 2;
        }
        p{
            font-weight: bold;
            color:blue;
            font-size:6px;
            margin-left:12%;
            margin-top:22%;
            background-color:yellow;
            width: fit-content;
            height: fit-content;
           
            padding:2px;
        }
    </style>     
    <div>
        <ostos-kori></ostos-kori>
        <p>0</p>
    </div>`;

export class Korinaytto extends HTMLElement{
    #shadow;
    #arvokentta;
    #kori;

    constructor(){
        super();
        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#arvokentta = this.#shadow.querySelector('p');
        this.#kori=this.#shadow.querySelector('ostos-kori');
        this.#kori.leveys=30;

    }

    get leveys(){
        return this.getAttribute('leveys');
    }
    set leveys(uusiLeveys){
        this.setAttribute('leveys',uusiLeveys);
    }

    get arvo(){
        return this.getAttribute('arvo');
    }
    set arvo(uusiarvo){
        this.setAttribute('arvo', uusiarvo);
    }

    static get observedAttributes(){
        return ['arvo','leveys'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log(attribuutti, vanha, uusi);
        if(attribuutti==='arvo'){
            this.#arvokentta.textContent=uusi;
        }
        else if(attribuutti==='leveys'){
            this.#kori.leveys=uusi;
            this.#arvokentta.style.fontSize=`${0.2*uusi}px`;
            console.log(this.#kori.leveys, this.#arvokentta.style.fontSize);
        }
    }
}

try{
    customElements.define('kori-naytto',Korinaytto);
}
catch(virhe){
    console.log(`kori-naytto oli jo määritelty: ${virhe.message}`);
}