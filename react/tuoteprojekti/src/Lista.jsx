

function ListaAlkio(tiedot){
    return (
        <li>{tiedot.vari}</li>
    )
}

function Varilista(tiedot){
    return (
        <ul>
            {tiedot.varit.map(vari=> <ListaAlkio vari={vari}/>)}
        </ul>
    )
}

export default Varilista;