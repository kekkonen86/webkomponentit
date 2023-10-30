'use strict';

function muunna(muunnettavaOlio){
    return Object.assign(muunnettavaOlio, {
        numero: +muunnettavaOlio.numero,
        hinta: +muunnettavaOlio.hinta
    });
}

module.exports={muunna}