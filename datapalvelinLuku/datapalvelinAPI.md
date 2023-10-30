# Datapalvelin API

Yleiskäyttöinen REST-palvelin tietojen hakuun. Vain haku (get) operaatio toteutettu.

Tiedot talletetaan json-tiedostoon. Tiedot ovat taulukossa olioina.

```json
[
    {
        "id":1,
        "nimi":"Mansikka",
        "hinta":2,
        "kuva":"mansikka.png"
    },
    {
        "id":2,
        "nimi":"Mustikka",
        "hinta":3,
        "kuva":"mustikka.png"
    }
]
```
Olion rakenne on vapaa. Vain ensimmäisen tason kenttiä voi käyttää tietojen hakemisessa.
Esimerkiksi olio voi sisältää kenttiä, joiden arvo on olio tai taulukko, mutta niiden arvoilla ei voi enää hakea.
```json
{
    "nimi":"eka",
    "tiedot":{
        "teksti":"tähän paljon tekstiä....",
        "huomautukset":["huom1","huom2"]
    }
}
```
Tästä oliosta voi hakea vain avaimilla `nimi` ja `tiedot`.

<div style="page-break-after:always;"></div>

## varastokerros API

### **haeKaikki()**
palauttaa kaikki oliot taulukkona. Jos olioita ei ole tai tulee virhe, palauttaa tyhjän taulukon []

### **hae(avain, arvo)**
palauttaa  taulukossa kaikki oliot, joiden avaimen arvo on annettu `arvo`, Jos ehdon täyttäviä olioita ei löydy palauttaa tyhjän taulukon. Myös virhetilanteessa palauttaa tyhjän taulukon.

### **haeArvot(kenttä,vainKerran=false)**
palauttaa taulukossa kaikki parametrina annetun kentän arvot. Jos arvoja ei löydy tai tulee virhe, palautta tyhjän taulukon. Jos vainKerran on `true`, niin arvo tulee taulukkoon vain kerran, muuten arvo voi olla taulukossa useampaan kertaan. Oletus on, että taulukkoon tulee kaikki arvot.

### **haeAvaimet()**
palauttaa taulukon, jossa on kaikki olioista lyötyvät kenttien nimet kertaalleen. Tutkii vain ensimmäisen tason kentät. Jos kenttiä ei löydy tai tulee virhe, palautetaan tyhjä taulukko.

Esimerkiksi edellisestä tieto-oliosta palutetaan
```json
["nimi","tiedot"]
```

### **haeKuva(kuvatiedostonNimi)**
palauttaa kuvan binäärimuodossa (blob). Jos kuvaa ei löydy, palauttaa `null`. Tunnistettavat kuvat ovat: png, jpeg, gif ja ico

### Vakiot

### **perusavain**
palauttaa asetustiedostossa olevan `perusavain` kentän arvon

### **hakuavaimet**
palauttaa asetustiedostossa olevan `hakuavaimet` kentän arvon

### **resurssi**
palauttaa asetustiedostossa olevan `resurssi` kentän arvon

<div style="page-break-after:always;"></div>

## varastokasittelijä API

### **lueVarasto(tiedostopolku)**
palauttaa JSON-taulukon. Virhetilanteessa palauttaa tyhjän taulukon.

### **lueKuva(kuvapolku)**
palauttaa kuvan binäärisenä tai null jos kuvaa ei löydy tai tulee virhe.

## Palvelimen asetukset

Palvelin on parametroitu siten, että palvelinta käynnistettäessä annetaan komentoriville käytettävän asetustiedoston nimi.

### palvelimen käynnistys
```shell
> node datapalvelin <asetustiedosto>
```
esimerkiksi jos asetustiedosto on `config.json`
```shell
> node datapalvelin config.json
```

### palvelimen asetustiedosto
asetustiedosto on muotoa:

```json
{
    "port":3001,
    "host":"localhost",
    "kirjasto":{
        "kansio":"kirjasto",
        "varastokerros":"varastokerros.js",
        "varastokasittelija":"varastokasittelija.js"
    },
    "varasto":{
        "kansio":"jaatelovarasto",
        "asetustiedosto":"asetukset.json"
    }
}
```
<div style="page-break-after:always;"></div>

### Tietovaraston asetustiedosto

Kullakin tietovarastolla on oma asetustiedosto, joka on muotoa:
```json
{
    "varastotiedosto":"jaatelot.json",
    "perusavain":"id",
    "hakuavaimet":["id", "nimi", "hinta"],
    "resurssi":"jäätelöt",
    "kuvakansio":"kuvat"
}
```

## REST-palvelin palvelee reiteissä:
-   `/`
    - palauttaa käytössä olevan resurssin nimen     
-   `/<ressurssi>`
    -   /jäätelöt
-   `/<ressurssi>/avaimet`
    -   /jäätelöt/avaimet
-   `/<ressurssi>/hakuavaimet`
    -   /jäätelöt/hakuavaimet
-   `/<ressurssi>/perusavain`
    -   /jäätelöt/perusavain
-   `/<ressurssi>/ehdolla?hakuavain=arvo`
    -   /jäätelöt/ehdolla?nimi=Mansikka
-   `/<ressurssi>/arvot?avain=avaimennimi & kertaalleen`
    -   /jäätelöt/arvot?avain=hinta&kertaalleen
    -   /jäätelöt/arvot?avain=hinta
-   `/<resurssi>/kuvat?nimi=kuvanNimi`
    -   /jäätelöt/kuvat?nimi=mansikka.png

Kaikki tiedot ovat json-muodossa, paitsi kuva palautetaan binäärimuodossa. Huomaa, että hakuehdoissa kirjainkoko on merkitsevä (case sensitive).

Jos aiheutuu virhe, palutuu olio, jossa on `virhe`-kenttä, jonka arvona on virheilmoitus merkkijonona.

Esimerkiksi:
```json
{"virhe":"Tietoja ei löydy"}
```
Palvelin tukee cors:is (cross origin)