import { useState } from "react";
import Kuva from "./Kuva";

import {kuvaUrl} from './urlit';

function Taulukko({tiedot, muokkaa}){

    const [valittu,setValittu]=useState(0);

    function paivita(id){
        muokkaa(id);  
        setValittu(id);
    }
    return (
        <div className='Taulukko'>
            <table>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Nimi</th>
                        <th>väri</th>
                        <th>Hinta €</th>
                        <th>Huomautuksia</th>
                        <th>Kuvan nimi</th>
                        <th>Kuva</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tiedot.map(data=>
                            <tr key={data.numero} id={data.numero} 
                            className={valittu===data.numero?"valittu":""}
                                onClick={()=>paivita(data.numero)}>
                                    <td>{data.numero}</td>
                                    <td>{data.nimi}</td>
                                    <td>{data.väri}</td>
                                    <td>{data.hinta}</td>
                                    <td>{data.huomautuksia}</td>
                                    <td>{data.kuva}</td>
                                    <td>
                                        <Kuva kuvaSrc={kuvaUrl + data.kuva} 
                                          nimi={data.kuva} />
                                    </td>
                            </tr>
                            )
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Taulukko;