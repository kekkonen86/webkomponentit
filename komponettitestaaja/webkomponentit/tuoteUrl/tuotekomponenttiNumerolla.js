const template = document.createElement('template');
template.innerHTML=`
<style>
    :host{
        display:block;
        background-color:var(--tausta-väri,oldlace);
    }
    h1{
        color:var(--otsikon-väri,black);
    }
    span{
        color:var(--tiedon-väri,orange);
    }
</style>
<div>
    <h1>Tuotetiedot</h1>
    <p part="avain">Tuotenumero: <span id="tuotenumero"></span></p>
    <p part="tieto">Nimi: <span id="nimi"></span></p>
    <p part="tieto">Väri: <span id="vari"></span></p>
    <p part="tieto">Hinta: <span id="hinta"></span></p>
    <p part="huom">Huomautuksia: <span id="huomautuksia"></span></p>
</div>
`

export class TuotetiedotNumerolla extends HTMLElement{
    constructor(){
        super();

        this.shadow=this.attachShadow({mode:'open'});
        this.shadow.appendChild(template.content.cloneNode(true));
        this.tuotenumero=this.shadow.getElementById('tuotenumero');
        this.nimi=this.shadow.getElementById('nimi');
        this.vari=this.shadow.getElementById('vari');
        this.hinta=this.shadow.getElementById('hinta');
        this.huomautuksia=this.shadow.getElementById('huomautuksia');
    }

    static get observedAttributes(){
        return ['tuotenumero'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        fetch(`http://localhost:3002/tuotteet/ehdolla?tuotenumero=${uusi}`,{mode:'cors'})
            .then(data=>data.json())
            .then(tulos=>{
                if(tulos.length>0){
                    this.tuotenumero.textContent=tulos[0].tuotenumero;
                    this.nimi.textContent=tulos[0].nimi;
                    this.vari.textContent=tulos[0].väri;
                    this.hinta.textContent=tulos[0].hinta;
                    this.huomautuksia.textContent=tulos[0].huomautuksia; 
                }
            })
            .catch(virhe=>{
                this.tuotenumero.textContent = '';
                this.nimi.textContent = '';
                this.vari.textContent = '';
                this.hinta.textContent = '';
                this.huomautuksia.textContent = '';
                console.log(virhe.message);
        });
    }
}

if(!customElements.get('tuote-numerolla')){
    customElements.define('tuote-numerolla',TuotetiedotUrl);
}