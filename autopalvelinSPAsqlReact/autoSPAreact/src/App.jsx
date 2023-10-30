import { useState, useEffect } from 'react'

import './App.css'
import Taulukko from './Taulukko';

const kaikkiUrl='/kaikki';

function App() {
  const [tulos, setTulos] = useState([]);

  async function haeKaikki(){
    const data=await fetch(kaikkiUrl,{mode:'cors'});
    const hakutulos=await data.json();

    setTulos(hakutulos);
  }

  useEffect(()=>{
    haeKaikki();
  },[]);

  return (
    <Taulukko tiedot={tulos}/>
  )
}

export default App
