const template=document.createElement('template');

template.innerHTML=`
    <style>
        :host{
            display:block;
            border: outset 6px grey;
            border-radius:0.5em;
            box-shadow:0.2em 0.2em 0.3em rgb(0,0,0);
            background-color:#302e2e;
            padding:0.5em;
            width:fit-content;
            color:white;
        }
        #leffa{
            display:grid;
            align-items: center;
            justify-items:left;
            margin:0.5em;
        }
        img{
            border-radius:0.5em;
        }

        .piiloon{
            width:200px;
            height:300px;
            background-color:grey;
            border-radius:0.5em;
        }
        #arvostelu{
            float:right;
        }

        #vuosi{
            width:100%
            float:left;
        }
        #vuosi, #nimi{
            font-weight:bold;
        }
        textarea::selection{
            background-color: transparent;
        }
        #nimi:focus{
            outline: none;
        }
        #nimi{
            resize:none;
            border:none;
            background-color: transparent;
            color:white;
            padding:0;
            font-size:14pt;
            word-wrap:break-word;
            width:100%;
            white-space:normal;
            owerflow-w
        }
    </style>

    <div id="leffa">
        <div>
            <p id="vuosi"></p>
        </div>
        <div id="kuva">
            <img src= alt="">
        </div>
        <div id="tiedot">
            <p><span id="tyyppi"></span> <span id="arvostelu"></span></p>
            <textarea id="nimi" readonly></textarea>
            <p>Ohjaus <span id="ohjaaja"></span></p>
        </div>
    </div>
`;

const TAHTI=`\u2b50`; //entiteetti &#x2b50;

export class Elokuvakortti extends HTMLElement{
    #nimikentta;
    #vuosikentta;
    #ohjaajakentta;
    #tyyppikentta;
    #arvostelukentta;
    #kuvakentta;
    #img;

    constructor(){
        super();

        this.shadow=this.attachShadow({mode:'open'});
        this.shadow.appendChild(template.content.cloneNode(true));
        this.#nimikentta=this.shadow.getElementById('nimi');
        this.#vuosikentta=this.shadow.getElementById('vuosi');
        this.#ohjaajakentta=this.shadow.getElementById('ohjaaja');
        this.#tyyppikentta=this.shadow.getElementById('tyyppi');
        this.#arvostelukentta=this.shadow.getElementById('arvostelu');
        this.#kuvakentta=this.shadow.getElementById('kuva');
        this.#img=this.shadow.querySelector('img');
    }

    //js rajapinta
    get nimi(){
        return this.getAttribute('nimi');
    }

    set nimi(uusi){
        this.setAttribute('nimi',uusi);
    }

    get vuosi(){
        return this.getAttribute('vuosi');
    }

    set vuosi(uusi){
        this.setAttribute('vuosi',uusi);
    }

    get ohjaaja(){
        return this.getAttribute('ohjaaja');
    }

    set ohjaaja(uusi){
        this.setAttribute('ohjaaja',uusi);
    }

    get tyyppi(){
        return this.getAttribute('tyyppi');
    }

    set tyyppi(uusi){
        this.setAttribute('tyyppi',uusi);
    }

    get arvostelu(){
        this.getAttribute('arvostelu');
    }

    set arvostelu(uusi){
        this.setAttribute('arvostelu', uusi);
    }

    get kuva(){
        return this.getAttribute('kuva');
    }

    set kuva(uusi){
        this.setAttribute('kuva',uusi);
    }

    paivita(elokuva){
        this.nimi=elokuva.nimi;
        this.vuosi=elokuva.vuosi;
        this.ohjaaja=elokuva.ohjaaja;
        this.tyyppi=elokuva.tyyppi;
        this.arvostelu=elokuva.arvostelu;
    }

    static luo(elokuva){
        const leffa=new Elokuvakortti();
        leffa.paivita(elokuva);
        return leffa;
    }

    //attribuuttirajapinta
    static get observedAttributes(){
        return ['nimi','vuosi','ohjaaja','tyyppi','arvostelu','kuva'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log(attribuutti, vanha, uusi);

        switch(attribuutti){
            case 'nimi':this.#nimikentta.textContent=uusi;break;
            case 'vuosi': this.#vuosikentta.textContent=uusi;break;
            case 'ohjaaja':this.#ohjaajakentta.textContent=uusi;break;
            case 'tyyppi':this.#tyyppikentta.innerText=uusi;break
            case 'arvostelu':this.#arvostelukentta.innerText=TAHTI.repeat(+uusi);break;
            case 'kuva':
                if(uusi && uusi.length>0){
                    this.#img.src=uusi;
                    this.#kuvakentta.removeAttribute('class');
                }
                else{
                    this.#img.src='';
                    this.#kuvakentta.setAttribute('class','piiloon');
                }
        }
    }
} //luokan loppu


try{
    customElements.define('elokuva-kortti',Elokuvakortti);
}
catch(virhe){
    console.log(`Oli jo määritelty: ${virhe.message}`);
}