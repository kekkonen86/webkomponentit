import {useState} from 'react';

import Tuote from './Tuote';

function Haku(){

    const [hakutulos, setHakutulos]=useState([]);
    const [hakuehto, setHakuehto] = useState('');

    const perusUrl ='http://localhost:3002/tuotteet/ehdolla?tuotenumero=';
    const kuvaUrl ='http://localhost:3002/tuotteet/kuvat?nimi=';

    async function hae(ehto){
        const data = await fetch(`${perusUrl}${ehto}`,{mode:'cors'});
        const tuotteet=await data.json();
        // console.log(tuotteet)
        setHakutulos(tuotteet);
        setHakuehto('');
    }

    return (
        <>
            <div className='Haku'>
                <h1>Tuotehaku</h1>
                <input placeholder="Anna tuotenumero"
                value={hakuehto}
                onChange={e=>setHakuehto(e.target.value)}
                onKeyUp={e=>{
                    if(e.key==='Enter'){
                        setHakuehto(e.target.value);
                        hae(hakuehto);
                    }
                }}/>

                <button onClick={()=>hae(hakuehto)}>Hae</button>
            </div>
            {
                hakutulos?.length>0 ?
                (
                    <div>
                        <Tuote kuvaurl={kuvaUrl} tuotetiedot={hakutulos[0]} />
                    </div>
                ):
                (
                    <div>
                        <h2>Tuotetta ei löydy</h2>
                    </div>
                )
            }
        </>
    )
}

export default Haku;