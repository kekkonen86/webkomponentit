const template = document.createElement('template');

template.innerHTML=`
    <style>
        div{
            border: solid black 1px;
            padding:0.5em;
            width: fit-content;
        }
        button, input{
             font-size: 16pt;
             font-weight: bold;
        }
        button{
            width:32px;
        }
        div{
            display:flex;
            align-items:center;
        }
        ostos-kori{
            margin-left:5px;
            margin-top:3px;
        }
    </style>

    <div>
        <button id="miinus">-</button>
        <input type="text" size="2">
        <button id="plus">+</button>
        <ostos-kori leveys="40"></ostos-kori>

    </div>
`;

const OLETUS_MAX=10000;

export class Kasvattaja extends HTMLElement{
    #shadow;
    #laskuri;
    #input;
    #plus;
    #miinus;
    #enter;
    

    #MAX_MAARA=OLETUS_MAX;

    constructor(){
        super();

        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#input=this.#shadow.querySelector('input');
        //käsittelijät
        this.#plus = ()=>this.#muuta(+1);
        this.#miinus = ()=>this.#muuta(-1);
        this.#enter = ()=>this.#muuta(0);

        //alkuarvot
        this.#laskuri=0;
        this.#input.value=0;
        
    }

    connectedCallback(){
        this.#shadow.getElementById('miinus').addEventListener('click',this.#miinus);
        this.#shadow.getElementById('plus').addEventListener('click',this.#plus);
        this.#input.addEventListener('input',this.#enter);
    }

    disconnectedCallback(){
        this.#shadow.getElementById('miinus').removeEventListener('click', this.#miinus);
        this.#shadow.getElementById('plus').removeEventListener('click', this.#plus);
        this.#input.removeEventListener('input', this.#enter);
    }

    #muuta(muutos){
        const arvo = +this.#input.value;
        if(!isNaN(arvo)){
            this.#laskuri = arvo + muutos; 
            if (this.#laskuri < 0) this.#laskuri = 0;
            if (this.#laskuri > this.#MAX_MAARA) this.#laskuri = this.#MAX_MAARA;
        }
        this.#input.value = this.#laskuri;
        this.määrä=this.#laskuri;
        this.max=this.#MAX_MAARA;
        this.dispatchEvent(new Event('muutettu',{bubbles:true,composed:true}));
    }

    get määrä(){
        return this.getAttribute('määrä');
    }

    set määrä(uusimäärä){
        this.setAttribute('määrä',uusimäärä);
    }

    get max(){
        return this.getAttribute('max');
    }

    set max(uusimaksimi){
        if(uusimaksimi){
            this.setAttribute('max',uusimaksimi);
        }
        else{
            this.#MAX_MAARA=OLETUS_MAX;
        }
    }

    static get observedAttributes(){
        return ['määrä','max'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log(attribuutti, vanha, uusi);
        if(attribuutti==='määrä'){
            if(uusi && !isNaN(+uusi)){
                let lukema=+uusi;
                if(lukema<0) {
                    lukema=0;
                }
                if(lukema>this.#MAX_MAARA){
                    lukema=this.#MAX_MAARA;
                }
                this.#laskuri=lukema;
            }
            else{
                this.#laskuri=0;
            }
            this.#input.value = this.#laskuri; 
        }
        else if(attribuutti==='max'){
            if(uusi && !isNaN(+uusi)){
                this.#MAX_MAARA=+uusi;
                if(this.#laskuri>this.#MAX_MAARA){
                    this.#laskuri=this.#MAX_MAARA;
                    this.#input.value = this.#laskuri;
                }
            }
            else{
                this.#MAX_MAARA=OLETUS_MAX;
            }
            console.log(this.#MAX_MAARA)
        }
    }

   

} //luokan loppu

try{
    customElements.define('kasvattaja-korilla',Kasvattaja);
}
catch(virhe){
    console.log(`Oli jo määritelty: ${virhe.message}`);
}