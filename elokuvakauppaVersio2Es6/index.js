'use strict';

import * as path from 'path';
import fetch from 'node-fetch';
import express from 'express';

//määritellään require
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//määritellään __dirname
import {fileURLToPath} from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const { port, host } = require('./config.json');

const app =express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'sivut'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const tilausSivuPolku=path.join(__dirname,'public','sivut','tilaus.html');
const hakuSpaPolku = path.join(__dirname, 'public', 'sivut', 'hakunimella.html');

app.get('/', (req,res)=>res.sendFile(path.join(__dirname,'valikko.html')));

app.get('/tilaaspa', (req, res) => res.sendFile(tilausSivuPolku));
app.get('/haespa', (req, res) => res.sendFile(hakuSpaPolku));

app.get('/kaikkielokuvat', (req,res)=>
    fetch('http://localhost:3004/elokuvat', { mode: 'cors' })
        .then(data=>data.json())
        .then(tulos=>res.json(tulos))
        .catch(virhe=>res.json(virhe))
);

app.post('/lisaatilaus', async (req,res)=>{
    try{
        const optiot = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        };
        const data = await fetch('http://localhost:3004/tilaa', optiot);
        const tulos = await data.json();
        res.json(tulos);
    }
    catch(virhe){
        res.json(virhe);
    }
})

app.get('/tilaushaku', (req,res)=>res.render('hakulomake',{
    otsikko:'Tilauksen tiedot',
    toiminto:'/tilaustiedot',
    teksti:'tilausnumero'
}));

app.post('/tilaustiedot', async (req,res)=>{
    try{
        const reitti =`http://localhost:3004/tilaukset/${req.body.nro}`;
        const data = await fetch(reitti,{mode:'cors'});
        const tilaukset=await data.json();
        res.render('tilaustiedot',{tilaukset});
    }
    catch(virhe){
        res.render('virhe',{teksti:virhe.message});
    }
});

app.get('/asiakkaantilaushaku', (req, res) => res.render('hakulomake', {
    otsikko: 'Asiakkaan tilaukset',
    toiminto: '/asiakkaantilaushaku',
    teksti: 'asiakasnumero'
}));

app.post('/asiakkaantilaushaku', async (req, res) => {
    try {
        const reitti = `http://localhost:3004/asiakkaantilaukset/${req.body.nro}`;
        const data = await fetch(reitti, { mode: 'cors' });
        const tilaukset = await data.json();
        res.render('astilaukset', { tilaukset });
    }
    catch (virhe) {
        res.render('virhe', { teksti: virhe.message });
    }
});

app.post('/haenimella', (req, res) =>
    fetch(`http://localhost:3004/tilauksetnimella/${req.body.etunimi}/${req.body.sukunimi}`,{ mode: 'cors' })
        .then(data => data.json())
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe)))

app.listen(port,host,()=>console.log(`${host}:${port} kuuntelee...`));