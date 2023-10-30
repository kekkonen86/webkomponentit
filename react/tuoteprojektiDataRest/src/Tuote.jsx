import './Tuote.css';

function Tuote({kuvaurl, tuotetiedot}){

    return (
        <div className='Tuote'>
            <h1>Tuote</h1>
            <p><span>Tuotenumero:</span> {tuotetiedot.tuotenumero}</p>
            <p><span>Nimi:</span> {tuotetiedot.nimi}</p>
            <p><span>Väri:</span> {tuotetiedot.väri}</p>
            <p><span>Hinta:</span> {tuotetiedot.hinta} €</p>
            <p><span>Huomautuksia:</span> {tuotetiedot.huomautuksia}</p>
            <img src={kuvaurl+tuotetiedot.kuva} alt={tuotetiedot.kuva} />
        </div>
    )
}

export default Tuote;