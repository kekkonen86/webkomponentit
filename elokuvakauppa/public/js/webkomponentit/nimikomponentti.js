const template = document.createElement('template');

template.innerHTML=`
<style>
    :host{
        display:block;
    }
</style>
<div >       
    <p><label>Etunimi: <input type="text" id="etunimi"></label></p>
    <p><label>Sukunimi: <input type="text" id="sukunimi"></label></p>
    <p><button id="valmis">Lähetä</button></p>
</div>
`;

export class Nimilomake extends HTMLElement{
    #shadow
    #etunimisyote
    #sukunimisyote
    #valmis

    constructor(){
        super();

        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#etunimisyote = this.#shadow.querySelector('#etunimi');
        this.#sukunimisyote = this.#shadow.querySelector('#sukunimi');
        this.#valmis = this.#shadow.querySelector('#valmis');
    }

    connectedCallback(){
        this.#valmis.addEventListener('click', this.#laheta);
    }

    disconnectedCallback() {
        this.#valmis.removeEventListener('click', this.#laheta);
    }

    #laheta(){
        this.dispatchEvent(new Event('valmis',{
            bubbles:true,
            composed:true
        }));
    }

    get etunimi(){
        return this.#etunimisyote.value;
    }

    get sukunimi(){
        return this.#sukunimisyote.value;
    }

    tyhjennaKentat(){
        this.#etunimisyote.value='';
        this.#sukunimisyote.value='';
    }
}

try{
    customElements.define('nimi-lomake',Nimilomake);
}
catch(virhe){
    console.log('elementti oli jo määritelty:', virhe.message);
}