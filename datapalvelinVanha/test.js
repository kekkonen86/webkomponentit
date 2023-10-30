
const data=
[
    {
        "id": 1,
        "nimi": "Mansikka",
        "hinta": 2,
        "kuva": "mansikka.png"
    },
    {
        "id": 2,
        "nimi": "Mustikka",
        "hinta": 3,
        "kuva": "mustikka.png",
        "x":1
    }
];

const apu=data.map(alkio=>Object.keys(alkio));
console.log(apu);
const apu2=apu.flat();
console.log(apu2);

const fmap=data.flatMap(alkio=>Object.keys(alkio));
console.log(fmap);
const s=new Set(fmap);
console.log([...s]);

const nimet=new Set(data.flatMap(alkio=>Object.keys(alkio)));
console.log(nimet)
console.log([...nimet])
