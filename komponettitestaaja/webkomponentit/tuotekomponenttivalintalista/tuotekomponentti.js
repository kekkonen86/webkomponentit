const template=document.createElement('template');

template.innerHTML=`
<style>
    :host{
        display:block;
        background-color:var(--tausta-väri,oldlace);
    }
    h1{
        color:var(--otsikon-väri,black);
    }
    span{
        color:var(--tiedon-väri,orange);
    }
</style>
<div>
    <h1>Tuotetiedot</h1>
    <p part="avain">Tuotenumero: <span id="tuotenumero"></span></p>
    <p part="tieto">Nimi: <span id="nimi"></span></p>
    <p part="tieto">Väri: <span id="vari"></span></p>
    <p part="tieto">Hinta: <span id="hinta"></span></p>
    <p part="huom">Huomautuksia: <span id="huomautuksia"></span></p>
</div>
`;

export class Tuotetiedot extends HTMLElement{
    #shadow;
    #tuotenumero;
    #nimi;
    #vari;
    #hinta;
    #huomautuksia;
    constructor(){
        super();
        
        this.#shadow=this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#tuotenumero=this.#shadow.getElementById('tuotenumero');
        this.#nimi=this.#shadow.getElementById('nimi');
        this.#hinta=this.#shadow.getElementById('hinta');
        this.#vari=this.#shadow.getElementById('vari');
        this.#huomautuksia=this.#shadow.getElementById('huomautuksia');
    }

    static get observedAttributes(){
        return ['tuotenumero', 'nimi', 'väri','hinta','huomautuksia'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log(attribuutti, vanha, uusi);
        if(attribuutti==='tuotenumero'){
            this.#tuotenumero.textContent=uusi;
        }
        else if(attribuutti==='nimi'){
            this.#nimi.textContent=uusi;
        }
        else if(attribuutti==='hinta'){
            this.#hinta.textContent=`${uusi} €`;
        }
        else if(attribuutti==='väri'){
            this.#vari.textContent=uusi;
        }
        else if(attribuutti==='huomautuksia'){
            this.#huomautuksia.textContent=uusi;
        }
    }
}


try{
    customElements.define('tuote-elementti', Tuotetiedot);
}
catch(virhe){
    console.log('"tuote-elementti" oli jo lisätty: '+virhe.message);
}


