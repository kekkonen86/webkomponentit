# Kirjaolion rakenne

## kirjat.json
```json
[
    {
        "id":1,
        "nimi":"Node & React ABC",
        "tekijä":{
            "etunimi":"Leila",
            "sukunimi":"Hökki"
        },
        "julkaisuvuosi":2000,
        "sivut":233,
        "kustantaja":"Kustannus Oy Hökki ja kumppanit",
        "sidosasu":"kovakantinen",
        "isbn":"999-999-99-9999-9",
        "hinta":34.90,
        "tuoteryhmä":["tietokirja"],
        "avainsanat":["Ohjelmointi","Node", "React"],
        "kieli":"suomi",
        "kuvaus":["Perustiedot node ja react ohjelmoinnista.",
                    "Ehdottoman tarpeellinen kaikille."
                ],
        "varastotilanne":7,
        "kuva":"NodeReactABC.png"
    },
    {
        "id":2,
        "nimi":"Node Basics",
        "tekijä":{
            "etunimi":"Basil",
            "sukunimi":"Nodeson"
        },
        "julkaisuvuosi":2022,
        "sivut":533,
        "kustantaja":"Node Publications",
        "sidosasu":"pehmeäkantinen",
        "isbn":"998-998-98-9998-8",
        "hinta":45,
        "tuoteryhmä":["tietokirja"],
        "avainsanat":["Ohjelmointi","Node", "React"],
        "kieli":"englanti",
        "kuvaus":["Tunnetun englantilaisen Node-asiantuntijan",
        "mestariteos."],
        "varastotilanne":2,
        "kuva":"NodeBasics.png"
    },{
        "id":3,
        "nimi":"Reactia retkeilijöille",
        "tekijä":{
            "etunimi":"Orvokki",
            "sukunimi":"Keto"
        },
        "julkaisuvuosi":2023,
        "sivut":33,
        "kustantaja":"Altair Oy",
        "sidosasu":"kovakantinen",
        "isbn":"997-997-97-9997-7",
        "hinta":20,
        "tuoteryhmä":["tietokirja"],
        "avainsanat":["Retkeily", "elämäntapaopas"],
        "kieli":"suomi",
        "kuvaus":["Mainio kirja mukaan telttaretkelle.",
            "Kun kännykän kenttä loppuu, tästä löytyy apu."],
        "varastotilanne":12,
        "kuva":"Retkireact.png"
    }
]
  ```
## perusavain
  id (ei tarvitse näyttää sivulla, mutta yksilöi kirjan kirjavarastossa)
## näytettävät perustiedot
  nimi,
  tekijä,
  hinta,
  kuvaus,
  kuva

## lisätiedot
  julkaisuvuosi,
  sivut,
  kieli,
  kustantaja,
  sidosasu,
  isbn,
  tuoteryhmä,
  avainsanat,
  varastotilanne

# Tilaukset
## hakuavaimet"
        tilausnumero
        tilauspvm
        
## tilaukset.json
```json
[
    {
        "tilausnumero": 1,
        "tilauspvm": "2023-08-03",
        "tilaaja": {
            "etunimi": "Meri",
            "sukunimi": "Myrskylä",
            "katuosoite": "Tyrskykatu 23",
            "postitoimipaikka": "04054 Kallioluoto"
        },
        "tuotteet": [
            {
                "tuotenumero": 1,
                "nimi": "Node & React ABC",
                "määrä": 2,
                "hinta": 34.9
            },
            {
                "tuotenumero": 2,
                "nimi": "Node Basics",
                "määrä": 1,
                "hinta": 45
            },
            {
                "tuotenumero": 3,
                "nimi": "Reactia retkeilijöille",
                "määrä": 1,
                "hinta": 20
            }
        ]
    },
    {
        "tilausnumero": 2,
        "tilauspvm": "2023-09-23",
        "tilaaja": {
            "etunimi": "Matti",
            "sukunimi": "Puro",
            "katuosoite": "Rantakatu 3",
            "postitoimipaikka": "00120 Helsinki"
        },
        "tuotteet": [
            {
                "tuotenumero": 1,
                "nimi": "Node & React ABC",
                "määrä": 3,
                "hinta": 34.9
            },
            {
                "tuotenumero": 2,
                "nimi": "Node Basics",
                "määrä": 5,
                "hinta": 45
            },
            {
                "tuotenumero": 3,
                "nimi": "Reactia retkeilijöille",
                "määrä": 1,
                "hinta": 20
            }
        ]
    },
    {
        "tilausnumero": 3,
        "tilauspvm": "2023-09-15",
        "tilaaja": {
            "etunimi": "Aapeli",
            "sukunimi": "Aakkonen",
            "katuosoite": "Merikatu 3",
            "postitoimipaikka": "00100 Helsinki"
        },
        "tuotteet": [
            {
                "tuotenumero": 1,
                "nimi": "Node & React ABC",
                "hinta": 34.9,
                "määrä": 2
            },
            {
                "tuotenumero": 3,
                "nimi": "Reactia retkeilijöille",
                "hinta": 20,
                "määrä": 1
            }
        ]
    },
    {
        "tilausnumero": 4,
        "tilauspvm": "2023-09-15",
        "tilaaja": {
            "etunimi": "Veera",
            "sukunimi": "Virta",
            "katuosoite": "Jokikatu 12",
            "postitoimipaikka": "12345 Takamaa"
        },
        "tuotteet": [
            {
                "tuotenumero": 1,
                "nimi": "Node & React ABC",
                "hinta": 34.9,
                "määrä": 2
            },
            {
                "tuotenumero": 2,
                "nimi": "Node Basics",
                "hinta": 45,
                "määrä": 5
            },
            {
                "tuotenumero": 3,
                "nimi": "Reactia retkeilijöille",
                "hinta": 20,
                "määrä": 1
            }
        ]
    }
]
```

