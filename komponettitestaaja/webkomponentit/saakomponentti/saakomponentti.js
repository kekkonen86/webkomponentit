const template = document.createElement('template');

template.innerHTML=`
<p></p>
`;

export class Lammot extends HTMLElement{
    #shadow
    #lampotilat

    constructor(){
        super();

        this.#shadow=this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#lampotilat=this.#shadow.querySelector('p');

    }

    static get observedAttributes(){
        return ['paikkakunta']
    }

    async attributeChangedCallback(attribuutti,vanha,uusi){
        console.log(attribuutti, vanha, uusi);

        if(uusi && uusi.length>0){
            const data = await fetch(`http://localhost:3006/säätilat/ehdolla?paikkakunta=${uusi}`,
                                    {mode:'cors'});
            const jsonData=await data.json();
            const arvot=jsonData.map(arvo=>arvo.lämpötila)
            this.#lampotilat.textContent=arvot.join(', ');
        }
    }
}

try{
    customElements.define('saa-lampotilat',Lammot);
}
catch(virhe){
    console.log(`Oli jo määritelty: ${virhe.message}`);
}

