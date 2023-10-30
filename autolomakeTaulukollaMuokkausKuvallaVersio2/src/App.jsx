import { useState, useEffect } from 'react';

import './App.css'

import Autolomake from './Autolomake'
import Taulukko from './Taulukko';


import { kaikkiUrl, haeYksRestUrl } from './urlit';

function App(){

    const [tulos,setTulos]=useState([]);
    const [haeYksi, setHaeYksi]=useState({});

    const haeKaikki = async ()=>{
        const data = await fetch(kaikkiUrl,{mode:'cors'});
        const hakutulos=await data.json();

        setTulos(hakutulos);
    }

    const hae = async id =>{
        const data = await fetch(`${haeYksRestUrl}${id}`, {mode:'cors'});
        const hakuYksitulos = await data.json();
        console.log(hakuYksitulos)
        if(hakuYksitulos){
            setHaeYksi(hakuYksitulos);
        }
    }

    useEffect(()=>{
        haeKaikki();
    } ,[]);

    function paivitaTiedot(){
        haeKaikki();
    }
    function haeMuokattava(id){
        console.log('haeMuokattava',id)
        hae(id);
    }


    return (
        <>
            <Taulukko tiedot={tulos} muokkaa={haeMuokattava} />
            <Autolomake data={haeYksi} paivita={paivitaTiedot}/>
        </>
        
    );
}


export default App;