const template = document.createElement('template');
template.innerHTML=`
    <div id="valinnat">
        <label>Valitse:</label>
        <select id="vaihtoehdot">
        </select>
    </div>`;

const optio=document.createElement('option');

export class Valintalista extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        console.log('valintalista lisätty sivun DOM:iin');
        this.shadowRoot.addEventListener('change', this.valitse.bind(this));
    }

    disconnectedCallback(){
        console.log('valintalista poistettu sivun DOM:sta');
    }

    get valittu(){
        return this.getAttribute('valittu');
    }

    set valittu(arvo){
        if(arvo){
            this.setAttribute('valittu',arvo);
        }
        else {
            this.removeAttribute('valittu');
        }
    }

    valitse(){
        const arvo = this.shadowRoot.querySelector('select').value;
        this.valittu=arvo;
        this.dispatchEvent(
            new Event('valittu',{bubbles:true,composed:true}));
    }

    static get observedAttributes(){
        return ['data-valinnat','valittu'];
    }

    attributeChangedCallback(attribuutti,vanha,uusi){
        console.log('listamuuttui', attribuutti, vanha, uusi);
        const valinta=this.shadowRoot.querySelector('select');
        if(attribuutti==='data-valinnat'){
            if(valinta){
                for(const lapsisolmu of valinta.children){
                    valinta.removeChild(lapsisolmu);
                }
                valinta.append(this.muodostaLista(valinta,uusi));
            }
        }
    }

    muodostaLista(elementti,valinnat){
        const tyhja=optio.cloneNode(true);
        tyhja.value='';
        elementti.appendChild(tyhja);
        if(valinnat && valinnat.length>0){
            const lista=valinnat.split(',');
            for(const alkio of lista){
                const vaihtoehto=optio.cloneNode(true);
                vaihtoehto.value=alkio.trim();
                vaihtoehto.textContent=alkio.trim();
                elementti.appendChild(vaihtoehto);
            }
        }
    }

} //luokka loppu

customElements.define('valinta-lista',Valintalista);