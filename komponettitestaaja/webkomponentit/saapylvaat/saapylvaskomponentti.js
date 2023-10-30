const template = document.createElement('template');

template.innerHTML=`
<canvas width="850" height="200"></canvas>
`;

export class Lammot extends HTMLElement{
    #shadow
    #piirtoalusta
    #konteksti

    constructor(){
        super();

        this.#shadow=this.attachShadow({mode:'open'});
        this.#shadow.appendChild(template.content.cloneNode(true));
        this.#piirtoalusta=this.#shadow.querySelector('canvas');
        this.#konteksti=this.#piirtoalusta.getContext('2d');
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
            const arvot=jsonData.map(arvo=>({
                paiva:arvo.paiva,
                lampotila:arvo.lämpötila
            }));
            this.piirraKaikkiPylvaat(arvot);
        }
    }

    piirraKaikkiPylvaat(data) {
        this.#konteksti.clearRect(0,0,this.#piirtoalusta.width,this.#piirtoalusta.height);
        this.#konteksti.save();
        this.#konteksti.translate(10, 100);
        this.#konteksti.fillStyle = 'green';
        this.piirraViivat(this.#konteksti);
        let x = 10;
        for (let alkio of data) {
            this.piirraPylvas(this.#konteksti, x, alkio);
            x += 25;
        }
        this.#konteksti.restore();
    }

    piirraViivat(konteksti){
        konteksti.save()
        konteksti.strokeStyle = 'black';
        konteksti.lineWidth = 2;
        konteksti.beginPath();
        konteksti.moveTo(0, 0);
        konteksti.lineTo(this.#piirtoalusta.width - 50, 0);
        konteksti.stroke();
        konteksti.beginPath();
        konteksti.moveTo(0,-100);
        konteksti.lineTo(0,100);
        konteksti.stroke();
        konteksti.lineWidth = 1;
        for(let y=-100; y<100; y+=20){
            konteksti.beginPath();
            konteksti.moveTo(0, y);
            konteksti.lineTo(this.#piirtoalusta.width - 50, y);
            konteksti.stroke();
        }
        
        konteksti.restore();
    }

    piirraPylvas(konteksti, x, data) {
        konteksti.save();
        konteksti.fillRect(x, -data.lampotila, 20, data.lampotila);
        konteksti.fillStyle = 'black';
        konteksti.fillText(data.lampotila, x + 5, -data.lampotila - 5);
        konteksti.fillText(data.paiva, x + 5, 15);
        konteksti.restore();
    }

}

try{
    customElements.define('saa-pylvas',Lammot);
}
catch(virhe){
    console.log(`Oli jo määritelty: ${virhe.message}`);
}

