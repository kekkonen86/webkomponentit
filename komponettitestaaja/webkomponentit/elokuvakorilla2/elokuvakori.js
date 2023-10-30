import { Elokuvakortti } from "../elokuvakomponentti/elokuvakomponentti.js";
import { Kori } from "../ostoskorikomponentti/korikomponentti.js";
import { Korinaytto } from "../korinayttokomponentti/korinaytto.js";
import { KasvattajaNaytolla } from "../kasvattajakomponenttikorinaytolla/kasvattajakomponenttikorinaytolla.js"


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

}

try{
    customElements.define('elokuva-kori',Elokuvakori);
}
catch(virhe){
    console.log(`Oli jo määritelty: ${virhe.message}`);
}