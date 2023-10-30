import './App.css';
import Varilista from './Lista';
import tuotekuva from './assets/react.svg'

const tuote={
  tuoteID:1,
  nimi:"AI XL",
  tyyppi: "älypuhelin",
  hinta:123,
  valmistaja:"Leila Hökki Oy",
  varit:["vihreä","musta","keltainen","pinkki"],
  tietoja:{
    energialuokka:"AAA",
    arvostelu:"***"
  }
}

function Tuote(tuotetiedot){
  return (
    <div className="Tuote">
      <h1>Tuote</h1>
      <p><span>TuoteID:</span> {tuotetiedot.tuoteID}</p>
      <p><span>Nimi:</span> {tuotetiedot.nimi}</p>
      <p><span>Tyyppi:</span> {tuotetiedot.tyyppi}</p>
      <p><span>Hinta:</span> {tuotetiedot.hinta}</p>
      <p><span>Valmistaja:</span> {tuotetiedot.valmistaja}</p>
      <h2>Lisätiedot:</h2>
      <p>Energialuokka: {tuotetiedot.tietoja.energialuokka}</p>
      <p className='arvostelu'>{tuotetiedot.tietoja.arvostelu}A</p>
      <h2>Värivaihtoehdot:</h2>
      <Varilista varit={tuote.varit} />
      <img src={tuotekuva} alt="tuotekuva" />
    </div>
  )
}

function App(){
  return (
    <>
      <Tuote {...tuote} />
    </> 
  )
}

export default App;