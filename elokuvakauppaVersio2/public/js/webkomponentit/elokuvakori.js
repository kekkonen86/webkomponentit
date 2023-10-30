import { Elokuvakortti } from "/js/webkomponentit/elokuvakomponentti.js";
import { Kori } from "/js/webkomponentit/korikomponentti.js";
import { Korinaytto } from "/js/webkomponentit/korinaytto.js";
import { KasvattajaNaytolla } from "/js/webkomponentit/kasvattajakomponenttikorinaytolla.js"


export class Elokuvakori extends HTMLElement{
    constructor(elokuva){
        super();

        this.shadow = this.attachShadow({mode:'open'});
      
        this.elokuvakortti=Elokuvakortti.luo(elokuva);
        this.elokuvakortti.style.margin='1em';
        this.kasvattaja=new KasvattajaNaytolla();
        const div=document.createElement('div');
        div.style.display='grid';
        div.style.justifyItems='center';
        div.style.width='fit-content';
        div.appendChild(this.elokuvakortti);
        div.appendChild(this.kasvattaja);

        this.shadow.appendChild(div);
    }

    set kuva(uusi){
        this.elokuvakortti.kuva=uusi;
    }

    get lukumaara(){
        return +this.kasvattaja.määrä;
    }

    get nimi(){
        return this.elokuvakortti.nimi;
    }
    get hinta(){
        return this.elokuvakortti.hinta;
    }

    get numero(){
        return this.elokuvakortti.numero;
    }

}

try{
    customElements.define('elokuva-kori',Elokuvakori);
}
catch(virhe){
    console.log(`Oli jo määritelty: ${virhe.message}`);
}