import './Tuoterivi.css';

function Tuoterivi({kuvaurl, tuotetiedot}){

    return (
        <tr className='Tuoterivi'>
            <td>{tuotetiedot.tuotenumero}</td>
            <td>{tuotetiedot.nimi}</td>
            <td>{tuotetiedot.väri}</td>
            <td>{tuotetiedot.hinta} €</td>
            <td> {tuotetiedot.huomautuksia}</td>
            <td><img src={kuvaurl + tuotetiedot.kuva} alt={tuotetiedot.kuva} /></td>
        </tr>
    )
}

export default Tuoterivi;