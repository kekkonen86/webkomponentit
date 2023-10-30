select etunimi,sukunimi from asiakas
inner join tilaus on asiakasnumero=tilaaja
where tilausnumero=1;


select tilausnumero,etunimi,sukunimi from asiakas
inner join tilaus on asiakasnumero=tilaaja;

select etunimi,sukunimi,tilausnumero from asiakas
left join tilaus on asiakasnumero=tilaaja;

select tilausid,nimi,tilausmaara,hinta, tilausmaara*hinta as yht from elokuva
inner join tilausrivi on elokuvanro=id
where tilausid=1
order by nimi asc;

select asiakasnumero,etunimi,sukunimi from asiakas
where etunimi='Leila' and sukunimi='Hökki';

select tilausnumero from tilaus where tilaaja=?

select tilausid, etunimi, sukunimi, nimi, tilausmaara,hinta from elokuva
inner join tilausrivi on elokuvanro=id
inner join tilaus on tilausid=tilausnumero
inner join asiakas on asiakasnumero=tilaaja
where asiakasnumero=?
order by tilausid asc, nimi asc;

select tilausid, nimi, tilausmaara,hinta from elokuva
inner join tilausrivi on elokuvanro=id
inner join tilaus on tilausid=tilausnumero
inner join asiakas on asiakasnumero=tilaaja
where etunimi=? and sukunimi=?
order by tilausid asc, nimi asc;
