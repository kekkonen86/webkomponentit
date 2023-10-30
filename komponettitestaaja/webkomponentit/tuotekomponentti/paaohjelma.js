import { Tuotetiedot } from "./tuotekomponentti.js";

console.log(customElements.get('tuote-elementti'));
if(!customElements.get('tuote-elementti')){
    customElements.define('tuote-elementti', Tuotetiedot);
}
