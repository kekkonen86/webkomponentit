import { Kasvattaja } from "./kasvattajakomponentti.js";

document.addEventListener('DOMContentLoaded', alusta);

let kasvattajaA;
let kasvattajaB;
let kori;
let kori2;

function alusta(){
    kasvattajaA = document.getElementById('kasvattajaA');
    kasvattajaB = document.getElementById('kasvattajaB');
    kasvattajaA.addEventListener('muutettu', muuttui);
    kori=document.getElementById('kori');
    kori2 = document.getElementById('kori2');
    document.querySelector('button').addEventListener('click',summaa);
}

function muuttui(){
    // console.log('muuttui',kasvattaja.määrä);
    kori.textContent = kasvattajaA.määrä;
}

function summaa(){
    const summa=+kasvattajaA.määrä + +kasvattajaB.määrä;
    kori2.textContent=summa;
}