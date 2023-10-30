'use strict';

function muunna(muunnettavaOlio){
    return Object.assign(muunnettavaOlio, {
        tuotenumero: +muunnettavaOlio.tuotenumero,
        hinta: +muunnettavaOlio.hinta
    });
}

module.exports={muunna}