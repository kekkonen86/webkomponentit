import {useState, useEffect} from 'react';

import Tuote from './Tuote';

import './App.css';

function Kaikki(){
    const [tulos, setTulos] = useState([]);

    const perusUrlKaikki = 'http://localhost:3002/tuotteet';
    const kuvaUrl = 'http://localhost:3002/tuotteet/kuvat?nimi=';

    useEffect(()=>{
        const haeKaikki = async ()=>{
            const data = await fetch(perusUrlKaikki,{mode:'cors'});
            const tuotteet= await data.json();

           setTulos(tuotteet);
        }

        haeKaikki();
    },[]);

    return (
        <div className='Kaikki'>
            {
                tulos?.length>0 ?
                (
                    <div>
                        {
                            tulos.map(tuote=>
                                (
                                    <Tuote key={tuote.tuotenumero} kuvaurl={kuvaUrl}
                                    tuotetiedot={tuote} />
                                )
                            )
                        }
                    </div>
                ):
                (
                    <div>
                        <h2>Tuotteita ei löytynyt</h2>
                    </div>
                )
            }

        </div>
    )
}

export default Kaikki;
