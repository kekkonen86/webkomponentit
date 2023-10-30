import './Osoite.css';

function Osoite(tiedot){
    return (
        <div className="Osoite">
            <p>{tiedot.katu}</p>
            <p>{tiedot.postinumero} {tiedot.toimipaikka}</p>
        </div>
    )    
}

export default Osoite;