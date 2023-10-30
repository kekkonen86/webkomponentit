import {useState} from 'react';

function Lataaja({paivita}){
    const [nimi, setNimi]=useState('');

    function esikatsele(e){
        if(e.target.files && e.target.files[0]){
            const kuvaData = e.target.files[0]
            const nimi=kuvaData.name;
            const kuvaSrc=URL.createObjectURL(kuvaData);
            setNimi(nimi);
            paivita({nimi,kuvaData,kuvaSrc})
        }
    }

    return (
        <div className='Lataaja'>
            <label className='selite' htmlFor="tiedosto">
                Kuva: <input name="kuva" value={nimi} readOnly />
                <span>Selaa...</span>
            </label>
            <input id="tiedosto" type="file" onChange={esikatsele} />
        </div>
    )
}

export default Lataaja;