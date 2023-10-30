const template = document.createElement('template');
template.innerHTML=`
    
<style>

        :host{
            display:block;
            --oletusfonttikoko:12pt;
            --oletustausta:white;
            --oletusreuna:solid 1px black;
            --vihjetausta:bisque;
            --vihjevari:black;
            --napin-oletusvari:Gainsboro;
            --oletus-padding:1em;
        }
        #pallo{
            border:solid 1px black;
            background-color: red;
            border-radius: 50%;
            height: var(--fonttikoko, var(--oletusfonttikoko));
            aspect-ratio: 1/1;
        }
        #rivi{
            width:80%;
            display: grid;
            grid-template-columns: auto 5% 5%;
            align-items:center;
            gap:0.5em;
            padding:var(--tyhjareunus, var(--oletus-padding));
            border:var(--reunus, var(--oletusreunus));
        }
        .vihje{
            position:relative;
            display: inline-block;
        }
        .vihje .vihjeteksti{
            visibility:hidden;
            width:100%;
            background-color: var(--vihjetausta);
            color:var(--vihjevari);
            text-align:center;
            padding:5px;
            border-radius:4px;
            position:absolute;
            z-index:1;
            top:-5px;
            left:120%;
        }

        .vihje:hover .vihjeteksti{
            visibility: visible;
            width:max-content;
        }

        input{
            background-color: var(--tausta, var(--oletustausta));
            font-size:var(--fonttikoko, var(--oletusfonttikoko));
            border-top-style:hidden;
            border-right-style:hidden;
            border-left-style:hidden;
            border-bottom-style:hidden;
        }

        input[readonly]:focus{
            background-color:rgb(213,250,213);
            outline:none;
        }
        input:placeholder-shown{
            background-color:var(--oletustausta);
        }

        button{
            display:inline-flex;
            justify-content:center;
            align-items:center;
            font-size:var(--fonttikoko, var(--oletusfonttikoko));
            height:var(--fonttikoko, var(--oletusfonttikoko));
            aspect-ratio: 1/1;
            background-color:var(--nappivari, var(--napin-oletusvari));
            color:red;
            border-radius:4px;
        }
    </style>

    <div id="rivi">
        <input type="text" placeholder="-- lisää tehtävä --">
        <div id="pallo" class="vihje">
            <span class="vihjeteksti">Aloittamatta</span>
        </div>
        <button>X</button>
    </div>
`;

export class Tehtava extends HTMLElement{
    #shadow
    #pallo
    #tooltipteksti
    #input
    #tila
    #poistokasittelija
    #paivittaja
    #vaihtaja

    static #tilat=[
        {vari:'red', teksti:'Aloittamatta'},    //#tila=0
        { vari: 'yellow', teksti: 'Tekeillä' }, //#tila=1
        { vari: 'green', teksti: 'Valmis' }     //#tila=2
    ];

    constructor(){
        super();

        this.#shadow = this.attachShadow({mode:'closed'});
        this.#shadow.appendChild(template.content.cloneNode(true));

        this.#pallo = this.#shadow.querySelector('#pallo');
        this.#tooltipteksti=this.#shadow.querySelector('.vihjeteksti');
        this.#input = this.#shadow.querySelector('input');
        this.#tila=0;

        this.#poistokasittelija = () => this.#poista();
        this.#paivittaja = ()=> this.#paivita();
        this.#vaihtaja = ()=> this.#vaihdaTila();
    }

    connectedCallback(){
        this.#pallo.addEventListener('click', this.#vaihtaja);
        this.#input.addEventListener('focusout', this.#paivittaja);
        this.#input.addEventListener('change', this.#paivittaja);
        this.#shadow.querySelector('button')
            .addEventListener('click',this.#poistokasittelija);
        this.#state=Tehtava.#tilat[this.#tila].teksti;
    }

    disconnectedCallback() {
        this.#pallo.removeEventListener('click', this.#vaihtaja);
        this.#input.removeEventListener('focusout', this.#paivittaja);
        this.#input.removeEventListener('change', this.#paivittaja);
        this.#shadow.querySelector('button')
            .removeEventListener('click', this.#poistokasittelija);
    }

    #paivita(){
        this.text=this.#input.value;
    }

    #poista(){
        this.dispatchEvent(
            new Event('poistui',{bubbles:true, composed:true})
        );
        this.remove();
    }

    #vaihdaTila(){
        if(this.#input.placeholder.length==0){
            this.#tila = ++this.#tila;
            if(this.#tila===3) this.#tila=2;
            const valinta=Tehtava.#tilat[this.#tila];
            this.#pallo.style.backgroundColor=valinta.vari;
            this.#tooltipteksti.innerText=valinta.teksti;
            this.#input.removeAttribute('placeholder');
            this.#state = valinta.teksti;
            if(this.#tila===2){
                this.#input.setAttribute('readonly',true);
            }
            this.dispatchEvent(
                new Event('tilavaihtui',{bubbles:true,composed:true})
            );
        }
    }

    get text(){
        this.getAttribute('text');
    }
    set text(arvo){
        if(arvo){
            this.setAttribute('text',arvo);
        }
        else{
            this.removeAttribute('text');
        }
    }

    get state(){
        this.getAttribute('state');
    }

    set #state(arvo){
        if(arvo){
            this.setAttribute('state', arvo)
        }
        else{
            this.removeAttribute('state');
        }
    }

    static get observedAttributes(){
        return ['text'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        if(uusi && uusi.trim().length>0){
            this.#input.value=uusi.trim();
            this.#input.removeAttribute('placeholder');
        }
    }
}

try{
    customElements.define('tehtava-komponentti', Tehtava);
}
catch(virhe){
    console.log('On jo määritelty:',virhe.message);
}
