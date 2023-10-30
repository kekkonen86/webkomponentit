import Haku from './Haku';
// import Tuote from './Tuote';
import Kaikki from './Kaikki';

import './App.css';

function Appvanha(){
  // const tuote = {
  //   "tuotenumero": 1,
  //   "nimi": "Tietokone",
  //   "väri": "oranssi",
  //   "hinta": 100,
  //   "huomautuksia": "ei huomautettavaa",
  //   "kuva": "tuote1.png"
  // };
  // const kuvaUrl = 'http://localhost:3002/tuotteet/kuvat?nimi=';
 
  return (
    <>
      <Kaikki />
      <Haku />
    </>

    // <Tuote kuvaurl={kuvaUrl} tuotetiedot={tuote} />
  )
}

export default Appvanha;