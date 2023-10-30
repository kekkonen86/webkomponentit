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
            const leffa=new Elokuvakori(elokuva); 

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
    const pre=document.querySelector('pre');
    pre.textContent=leffakortit
        .filter(alkio=>alkio.lukumaara>0)
        .map(kortti=>`${kortti.nimi}: \t\t${kortti.lukumaara} kappaletta`)
        .join('\n');
}