# Vite + React

## Tarkemmin tietoa
-   React: https://react.dev
-   Vite: https://vitejs.dev

## Luo Vitellä uusi react-sovellus (komponentti/appi)

```shell
npm create vite@latest
```

ja vastaa kysymyksiin:

Tässä projektin (kansion) nimeksi on annettu `malliprojekti`
```shell
√ Project name: ... malliprojekti
√ Select a framework: » React
√ Select a variant: » JavaScript
```

Kun tämä on tehty seuraa ohjeita:

### Siirry projektikansioon
```shell
> cd malliprojekti
```
### Asenna rippuvuudet
```shell
> npm install
```

### Käynnistä kehityspalvelin
```shell
> npm run dev
```

### Avaa selain annettuun porttiin

tässä portti on 5173

```shell
 VITE v4.4.9  ready in 1070 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### muita operaatiota

#### Käännös (build)
```shell
> npm run build
```

Muodostaa staattisen sivun komponentteineen `dist` -kansioon. Jos kansiota ei ole, se luodaan.

#### Käännetyn version esikatselu
Tällä voi testata `dist`-kansioon muodostettua versiota

```shell
npm run preview
```

## Projektin rakenne

```
malliprojekti
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   vite.config.js
|
+---public
|       vite.svg
|
\---src
    |   App.css
    |   App.jsx
    |   index.css
    |   main.jsx
    |
    \---assets
            react.svg
```