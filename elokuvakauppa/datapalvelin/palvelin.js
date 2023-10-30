'use strict';

const path = require('path');
const cors = require('cors');

const express = require('express');
const app = express();

const {port,host}=require('./palvelinConfig.json');

const Tietovarasto = require('./tietovarasto/tietovarastokerros');
const varasto = new Tietovarasto();

app.use(cors());
app.use(express.json());

app.get('/elokuvat', (req,res)=>
    varasto.haeKaikki()
        .then(tulos => res.json(tulos))
        .catch(virhe=>res.json(virhe)));

app.get('/tilaukset/:id', (req,res)=>
    varasto.haeTilausnumerolla(req.params.id)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe)));

app.get('/asiakkaantilaukset/:id', (req,res)=>
    varasto.haeAsiakkaanTilaukset(req.params.id)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe)));

app.get('/tilauksetnimella/:etunimi/:sukunimi', (req, res) =>
    varasto.haeAsiakkaanNimella(req.params.etunimi,req.params.sukunimi)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe)));

// app.get('/lisaa/:etunimi/:sukunimi/:eloId/:lkm', (req,res)=>{
//     const tilaus={
//         etunimi:req.params.etunimi,
//         sukunimi:req.params.sukunimi,
//         tilaukset:[
//             {numero:req.params.eloId, lkm:req.params.lkm}
//         ]
//     };

//     varasto.lisaaTilaus(tilaus)
//         .then(tulos => res.json(tulos))
//         .catch(virhe => res.json(virhe));
// });

app.post('/tilaa',(req,res)=>{
    const tilaus=req.body;
    varasto.lisaaTilaus(tilaus)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe));
});

app.all('*', (req,res)=>res.json('ei tuettu'));

app.listen(port,host, ()=>console.log(`Palvelin ${host}:${port} palvelee...`));