drop database if exists elokuvadb;
create database elokuvadb;

use elokuvadb;

create table elokuva(
    id integer unsigned not null primary key,
    nimi varchar(100) not null,
    hinta decimal(5,2) not null, -- maksimissaan 999.99 --
    vuosi integer,
    arvostelu varchar(5),
    ohjaaja varchar(50),
    tyyppi varchar(15),
    kuva varchar(256)
);

insert into elokuva values(1,'Kadonneen koodaajan etsijät',10,2000,5,'Seppo Pelivuori','seikkailu','kadonnut.png');
insert into elokuva values(2,'Vain muutaman koodarin tähden',5,2000,5,'S. Erkki Leijona','scifi','koodari.png');
insert into elokuva values(3,'Javascriptiä etsimässä',15,2023,3,'Olli Kivi','komedia','etsijat.png');

create table asiakas(
    asiakasnumero integer unsigned not null primary key,
    etunimi varchar(20) not null,
    sukunimi varchar(30) not null
    -- plus muut tarvittava tiedot --
);

insert into asiakas values(1, 'Leila', 'Hökki');
insert into asiakas values(2, 'Matti', 'Puro');
insert into asiakas values(3, 'Meri', 'Myrskylä');

create table tilaus(
    tilausnumero integer unsigned not null primary key,
    tilaaja integer unsigned not null,
    -- plus muita tarpeellisia tietoja (esim. päiväys ym.) --
    foreign key (tilaaja) references asiakas(asiakasnumero)
);

insert into tilaus values(1,1);
insert into tilaus values(2,3);

create table tilausrivi(
    tilausid integer unsigned not null,
    elokuvanro integer unsigned not null,
    tilausmaara integer not null,
    -- voisi olla myös tilaushetken hinta ym. --
    primary key(tilausid,elokuvanro),
    foreign key (tilausid) references tilaus(tilausnumero),
    foreign key (elokuvanro) references elokuva(id)
);

-- tilauksen 1 rivit --
insert into tilausrivi values(1,2,1);
-- tilauksen 2 rivit --
insert into tilausrivi values(2,1,2);
insert into tilausrivi values(2,2,1);

drop user if exists 'filmaaja'@'localhost';
create user 'filmaaja'@'localhost' identified by '12345';

grant all privileges on elokuvadb.* to 'filmaaja'@'localhost';