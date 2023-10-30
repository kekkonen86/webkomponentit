const template = document.createElement('template');
template.innerHTML=`
    <style>
        .virhe {
            border:solid red 2px;
            padding:1em;
            margin-top: 1em;
    }
    </style>
    <div class="virhe">
        <h2>Virhe</h2>
        <p></p>
    </div>`;

export class Virhe extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        console.log('virhekomponentti lisätty sivun Dom:iin');
    }

    disconnectedCallback(){
        console.log('virhekomponentti poistettu sivun DOM:sta');
    }

    static get observedAttributes(){
        return ['data-viesti'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log('virhemuuttui',attribuutti, vanha, uusi);
        const virhekappale=this.shadowRoot.querySelector('p');
        virhekappale.textContent=uusi;
    }
}

customElements.define('virhe-elementti',Virhe);