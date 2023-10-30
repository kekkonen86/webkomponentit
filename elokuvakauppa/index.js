'use strict';

const path = require('path');
const express = require('express');
const app =express();

//npm install node-fetch@2
const fetch = require('node-fetch');

const {port,host} = require('./config.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'sivut'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res)=>res.sendFile(path.join(__dirname,'valikko.html')));

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

app.listen(port,host,()=>console.log(`${host}:${port} kuuntelee...`));