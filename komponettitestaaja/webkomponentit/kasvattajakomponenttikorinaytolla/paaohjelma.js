import { Kori } from "../ostoskorikomponentti/korikomponentti.js";
import { Korinaytto } from "../korinayttokomponentti/korinaytto.js";
import { KasvattajaNaytolla } from "./kasvattajakomponenttikorinaytolla.js";


document.addEventListener('DOMContentLoaded',alusta);

let naytto;
let kasvattaja;

function alusta(){
    naytto = document.querySelector('kori-naytto');
    kasvattaja = document.querySelector('kasvattaja-korinaytolla');

    kasvattaja.addEventListener('muutettu', paivita);
}

function paivita(){
    naytto.arvo=kasvattaja.määrä;
}