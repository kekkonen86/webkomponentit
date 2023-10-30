import {useState, useEffect} from 'react';

import Tuoterivi from './Tuoterivi';

import './KaikkiTaulukko.css';

function KaikkiTaulukko(){
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
                    <table>
                        <thead>
                            <tr>
                                <th>tuotenumero</th>
                                <th>nimi</th>
                                <th>Väri</th>
                                <th>Hinta</th>
                                <th>Huom</th>
                                <th>Kuva</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            tulos.map(tuote=>
                                (
                                    <Tuoterivi key={tuote.tuotenumero} kuvaurl={kuvaUrl}
                                    tuotetiedot={tuote} />
                                )
                            )
                        }
                        </tbody>
                    </table>
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

export default KaikkiTaulukko;
