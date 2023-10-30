
function Taulukko({tiedot}){
    return (
        <div className='Taulukko'>
            <table>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Nimi</th>
                        <th>väri</th>
                        <th>Hinta €</th>
                        <th>Huomautuksia</th>
                        <th>Kuvan nimi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tiedot.map(data=>
                            <tr key={data.numero}>
                                    <td>{data.numero}</td>
                                    <td>{data.nimi}</td>
                                    <td>{data.väri}</td>
                                    <td>{data.hinta}</td>
                                    <td>{data.huomautuksia}</td>
                                    <td>{data.kuva}</td>
                            </tr>
                            )
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Taulukko;