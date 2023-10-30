import { Elokuvakortti } from "./elokuvakomponentti.js";

document.addEventListener('DOMContentLoaded', alusta);

async function alusta(){
    const elokuvaDiv=document.getElementById('elokuvat');

    try{
        const data = await fetch('http://localhost:3004/elokuvat',{mode:'cors'});
        const elokuvat=await data.json();

        for(const elokuva of elokuvat){
            const leffa = Elokuvakortti.luo(elokuva);
            const kuvadata = 
                await fetch(`http://localhost:3004/elokuvat/kuvat?nimi=${elokuva.kuva}`,
                            {mode:'cors'});
            if(kuvadata.ok){
                const kuva = await kuvadata.blob();
                leffa.kuva=URL.createObjectURL(kuva);
            }
            else{
                leffa.kuva='';
            }
            elokuvaDiv.appendChild(leffa);
        }

    }
    catch(virhe){
        console.log(virhe);
    }

}