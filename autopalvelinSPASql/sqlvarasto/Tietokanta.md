# Tietokanta -luokan API

Tietokantaluokka on yleiskäyttöinen luokka mariadb/mysql kantojen käyttöön.

Konstruktorille annetaan parametrina tietokannan avaamisessa tarvittavat tiedot oliona:

```json
{
    "host":"localhost",
    "port":3306,
    "user":"palvelin",
    "password":"salainen",
    "database":"autokanta"
}
```

Metodi suoritaKysely ottaa parametrinaan sql-lauseen merkkijonona ja sql-lauseen parametrit taulukkona. Tuloksen metodi palauttaa lupauksena.

Käyttö:

```js
const tulos = await kanta.suoritaKysely('select * from auto');
```

```js
const tulos= await kanta.suoritaKysely(
    'insert into auto values(?,?,?,?,?,?)',
    [1,'Hoppa','sininen',5000,'loistoauto','pienikuva.png']
);
```

Kysely palauttaa joko tulostaulukon (select)

```json
{
    kyselynTulos:[
        {
            "numero": 1,
            "nimi": "Kaara",
            "väri": "sininen",
            "hinta": 5000,
            "huomautuksia": "loistoauto",
            "kuva": "pienikuva.png"
        },
        {
            "numero": 2,
            "nimi": "Hoppa",
            "väri": "oranssi",
            "hinta": 4000,
            "huomautuksia": "kahvi ei sisälly hintaan",
            "kuva": "pienikuva.png"
        }, 
    ],
    tulosjoukko:true
}
```

tai statusolion (mm. insert, delete, update):
```json
{
    kyselynTulos:{muutetutRivitLkm:1, lisattyNro:0, status:0},
    tulosjoukko:false
}
```