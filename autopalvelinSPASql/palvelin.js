'use strict';

const path = require('path');
const express = require('express');
const app=express();

const cors=require('cors');

//asetukset
const {port,host,varastokansio}=require('./config.json');

const Tietovarasto= 
    require(path.join(__dirname,varastokansio,'tietovarastokerros'));

const varasto = new Tietovarasto();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>
    res.sendFile(path.join(__dirname,'public','index.html')));

app.get('/kaikki', (req,res)=>
    varasto.haeKaikki()
        .then(tulos=>res.json(tulos))
        .catch(virhe=>res.json(virhe))
);

app.get('/haeYksi/:id', (req, res) =>
    varasto.hae(req.params.id)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe))
);
app.delete('/poista/:id', (req, res) =>
    varasto.poista(req.params.id)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe))
);

app.put('/paivita', (req,res)=>
    varasto.paivita(req.body)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe))
)
app.post('/lisaa', (req, res) =>
    varasto.lisaa(req.body)
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe))
)

app.listen(port,host, ()=>console.log(`palvelin portissa ${port}`));
