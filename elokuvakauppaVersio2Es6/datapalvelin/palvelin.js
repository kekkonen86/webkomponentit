'use strict';

import cors from 'cors';
import Tietovarasto from './tietovarasto/tietovarastokerros.js';
import express from 'express';

//määritellään require
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { port, host } = require('./palvelinConfig.json');

const app = express();
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

app.post('/tilaa',(req,res)=>{
    const tilaus=req.body;
    varasto.lisaaTilaus(tilaus)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe));
});

app.all('*', (req,res)=>res.json('ei tuettu'));

app.listen(port,host, ()=>console.log(`Palvelin ${host}:${port} palvelee...`));