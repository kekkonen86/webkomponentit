import { useState } from 'react'
import Poistonappi from './Poistonappi';
import Kuva from './Kuva';
import Lataaja from './Lataaja';
import { tallennaData, tallennaKuva } from './tallennus';


function Autolomake({data, paivita}) {

  const [kuva, setKuva] = useState({ nimi: '', kuvaData: '', kuvaSrc: '' });


  function valitse(data){
    setKuva(data);
  }

  

  async function laheta(e){
    e.preventDefault();
    const lomakeData=new FormData(e.target);
    const dataJson=Object.fromEntries(lomakeData.entries());
    try{
      const tulos = await tallennaData(dataJson);
      const kuvatulos=await tallennaKuva(kuva);
      console.log(tulos,kuvatulos);
    }
    catch(virhe){
      console.log(virhe);
    }

    paivita();
  }
 
  return (
    <div className='Autolomake'>
      <form onSubmit={laheta} >
       <div className='kentat'>
          <label>Numero: <input name="numero" defaultValue={data.numero}/></label>
          <label>Nimi: <input name="nimi" defaultValue={data.nimi}  /></label>
          <label>Väri: <input name="väri" defaultValue={data.väri}  /></label>
          <label>Hinta €: <input name="hinta" defaultValue={data.hinta}  /></label>
          <label>Huomautuksia: <input name="huomautuksia" defaultValue={data.huomautuksia}  /></label>
          <Lataaja paivita={valitse}/>
          <Kuva kuvaSrc={kuva.kuvaSrc} nimi={kuva.nimi} />
       </div>
       <div className='napit'>
          <button type="submit">Lähetä</button>
          <Poistonappi id={data.numero} paivita={paivita} />
       </div>
        
     </form>
    </div>
  )
}

export default Autolomake
