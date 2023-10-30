const template  = document.createElement('template');

template.innerHTML=`
    <style>
        :host{
            display:block;
            width:fit-content;
        }
        
        elokuva-kortti{
            margin:1em;
        }

        div{
            display: grid;
            justify-items: center;
            width:fit-content;
        }
    </style>

    <div>
        <elokuva-kortti></elokuva-kortti>
        <kasvattaja-korinaytolla></kasvattaja-korinaytolla>
    </div>
`;

export class Elokuvakori extends HTMLElement{
    constructor(){
        super();

        this.shadow = this.attachShadow({mode:'open'});
        this.shadow.appendChild(template.content.cloneNode(true));

        this.elokuvakortti = this.shadow.querySelector('elokuva-kortti');
        this.kasvattaja = this.shadow.querySelector('kasvattaja-korinaytolla');
    }

    set kuva(uusi){
        this.elokuvakortti.setAttribute('kuva',uusi);
    }

    get lukumaara(){
        return +this.kasvattaja.getAttribute('määrä');
    }

    get nimi(){
        return this.elokuvakortti.getAttribute('nimi');
    }

    paivita(elokuva){
        this.elokuvakortti.setAttribute('nimi', elokuva.nimi);
        this.elokuvakortti.setAttribute('vuosi', elokuva.vuosi);
        this.elokuvakortti.setAttribute('ohjaaja', elokuva.ohjaaja);
        this.elokuvakortti.setAttribute('tyyppi', elokuva.tyyppi);
        this.elokuvakortti.setAttribute('arvostelu', elokuva.arvostelu);
    }

    static luo(elokuva){
        const leffa=new Elokuvakori();
        leffa.paivita(elokuva);
        return leffa;
    }
}

try{
    customElements.define('elokuva-kori',Elokuvakori);
}
catch(virhe){
    console.log(`Oli jo määritelty: ${virhe.message}`);
}