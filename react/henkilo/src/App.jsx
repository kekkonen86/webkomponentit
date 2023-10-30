import './App.css'
import Osoite from './Osoite'

function Henkilo({etunimi,sukunimi,ika}){
  return (
    <div className='App'>
      <p>Etunimi: {etunimi}</p>
      <p>Sukunimi: {sukunimi}</p>
      <p>ikä: {ika}</p>
    </div>
  )
}
function Henkilo2(tiedot) {
  return (
    <div className='App'>
      <p>Nimi: {tiedot.etunimi} {tiedot.sukunimi}</p>
      <p>ikä: {tiedot.ika}</p>
    </div>
  )
}

function HenkiloOsoitteella({etunimi, sukunimi, katu, postinumero,paikka}){
  return (
    <>
      <p>{etunimi} {sukunimi}</p>
      <Osoite katu={katu} postinumero={postinumero} toimipaikka={paikka}></Osoite>
    </>
  )
}

function App() {
  return (
    <>
      <Henkilo 
        etunimi="Leila" 
        sukunimi='Hökki'
        ika="30">
      </Henkilo>
      <Henkilo2
        etunimi="Matti"
        sukunimi="Puro"
        ika="40">
      </Henkilo2>
      <Osoite 
        katu="Koodikuja 3" 
        postinumero="00520"
        toimipaikka="Helsinki">
      </Osoite>
      <HenkiloOsoitteella 
        etunimi="Veera" 
        sukunimi="Virta"
        katu="Rantakatu 123"
        postinumero="00100"
        paikka="Helsinki">
      </HenkiloOsoitteella>
    </>
    
  )
   
}

export default App
