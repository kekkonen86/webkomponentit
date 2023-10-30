import { Kori } from "../ostoskorikomponentti/korikomponentti.js";
import { Korinaytto } from "./korinaytto.js";
import { Kasvattaja } from "../kasvattajakomponenttikorilla/kasvattajakomponenttikorilla.js";

document.addEventListener('DOMContentLoaded', alusta);

let kasvattaja;
let naytto;

function alusta(){
    naytto = document.querySelector('kori-naytto');
    kasvattaja = document.querySelector('kasvattaja-korilla');

    kasvattaja.addEventListener('muutettu',paivita);
}

function paivita(){
    naytto.arvo=kasvattaja.määrä;
}