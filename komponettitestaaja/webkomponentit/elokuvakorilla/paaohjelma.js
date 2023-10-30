import { Elokuvakortti } from "../elokuvakomponentti/elokuvakomponentti.js";
import { Kori } from "../ostoskorikomponentti/korikomponentti.js";
import { Korinaytto } from "../korinayttokomponentti/korinaytto.js";
import { KasvattajaNaytolla } from "../kasvattajakomponenttikorinaytolla/kasvattajakomponenttikorinaytolla.js"
import { Elokuvakori } from "./elokuvakori.js";

document.addEventListener('DOMContentLoaded', alusta);

const leffakortit=[];

async function alusta(){
    const elokuvaDiv=document.getElementById('elokuvat');
    document.getElementById('valmis').addEventListener('click', valmis);

    try{
        const data = await fetch('http://localhost:3004/elokuvat',{mode:'cors'});
        const elokuvat=await data.json();

        for(const elokuva of elokuvat){
            // const leffa=Elokuvakori.luo(elokuva); //ilman päivitystä
            // const leffa=new Elokuvakori(); //päivityksen kanssa
            const leffa = document.createElement('elokuva-kori');
            leffa.paivita(elokuva);
            const kuvadata = await fetch(`http://localhost:3004/elokuvat/kuvat?nimi=${elokuva.kuva}`,
                                        {mode:'cors'});
            if(kuvadata.ok){
                const kuva = await kuvadata.blob();
                leffa.kuva=URL.createObjectURL(kuva);
            }
            else{
                leffa.kuva = '';
            }
            leffakortit.push(leffa);
            elokuvaDiv.appendChild(leffa);
        }
    }
    catch(virhe){
        console.log(virhe);
    }
}

function valmis(){
    console.log(leffakortit);
    const pre=document.querySelector('pre');
    pre.textContent=
        leffakortit.map(kortti=>`${kortti.nimi}: \t\t${kortti.lukumaara} kappaletta`).join('\n');
}