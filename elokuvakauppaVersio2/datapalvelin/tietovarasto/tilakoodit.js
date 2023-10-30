'use strict';

const KOODIT ={
    OHJELMOINTIVIRHE: 0,
    EI_LOYTYNYT:1,
    LISAYS_OK:2,
    EI_LISATTY:3
}

const TYYPIT={
    VIRHE:'virhe',
    INFO:'info'
}

const VIESTIT={
    OHJELMOINTIVIRHE: ()=>({
        viesti:'Anteeksi! Ohjelmointivirhe',
        koodi: KOODIT.OHJELMOINTIVIRHE,
        tyyppi:TYYPIT.VIRHE
    }),
    EI_LOYTYNYT: (teksti,arvo)=>({
        viesti:`Ei löytynyt ${teksti} ${arvo}`,
        koodi:KOODIT.EI_LOYTYNYT,
        tyyppi:TYYPIT.INFO
    }),
    LISAYS_OK: ()=>({
        viesti:'Lisäys onnistui',
        koodi:KOODIT.LISAYS_OK,
        tyyppi:TYYPIT.INFO
    }),
    EI_LISATTY: ()=>({
        viesti:'Lisäys ei onnistunut',
        koodi:KOODIT.EI_LISATTY,
        tyyppi:TYYPIT.VIRHE
    })
}

module.exports = { KOODIT, TYYPIT, VIESTIT };