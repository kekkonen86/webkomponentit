# Jäätelöpalvelin

Tehdään palvelin, jolla voidaan tarkastella jäätelön tietoja. Jäätelöt ovat json tiedostossa muodossa

```json
{
    "mansikka":{
        "nimi":"Mansikka",
        "hinta":2,
        "kuva":"mansikka.png"
    },
     "suklaa":{
        "nimi":"Suklaa",
        "hinta":3,
        "kuva":"suklaa.png"
    }
}
```

## palvelin

Palvelin lähettää selaimeen datan lisäksi kotisivun (same origin).  

Data haetaan fetch:llä

Reitit /lajit palauttaa taulukon, jossa on jäätelölajit

```json
["mansikka","suklaa"]
```

/jäätelöt/mansikka

palauttaa 
```json
{
    "nimi":"Mansikka",
    "hinta":2,
    "kuva":"mansikka.png"
}
```