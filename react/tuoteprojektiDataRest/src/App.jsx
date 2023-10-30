// import Appvanha from "./Appvanha";
import {useState} from 'react';
import Haku from './Haku';
import Kaikki from './Kaikki';
import KaikkiTaulukko from './KaikkiTaulukko';

function App(){

    const [onHaku, setOnHaku]= useState(false);

    return (
        <>
            <button onClick={()=>setOnHaku(true)}>Hae</button>
            <button onClick={()=>setOnHaku(false)}>Kaikki</button>

            {
                onHaku ? 
                (
                    <Haku />
                ):
                (
                    <KaikkiTaulukko />
                )
            }
        </>
        // <Appvanha />
    )
}

export default App;