'use strict';

function muunna(muunnettavaOlio){
    return Object.assign(muunnettavaOlio, {
        id: +muunnettavaOlio.id,
        vuosi: +muunnettavaOlio.vuosi,
        arvostelu: +muunnettavaOlio.arvostelu
    });
}

module.exports={muunna}