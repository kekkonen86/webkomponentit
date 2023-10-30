'use strict';

function muunna(muunnettavaOlio){
    return Object.assign(muunnettavaOlio, {
        id: +muunnettavaOlio.id,
        hinta: +muunnettavaOlio.hinta
    });
}

module.exports={muunna}