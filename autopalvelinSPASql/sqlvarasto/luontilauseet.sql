drop database if exists autokanta;

create database autokanta;

use autokanta;

create table auto(
    numero integer not null primary key,
    nimi varchar(30) not null,
    `väri` varchar(20) not null,
    hinta decimal(8,2) not null,
    huomautuksia varchar(256),
    kuva varchar(256)
);

drop user if exists 'palvelin'@'localhost';
create user 'palvelin'@'localhost' identified by 'salainen';

grant all privileges on autokanta.* to 'palvelin'@'localhost';

insert into auto values(1,'Hoppa','sininen',5000,'loistoauto','pienikuva.png');
insert into auto values(
    2,'Kaara','oranssi',4000,'kahvi ei sisälly hintaan','pienikuva.png');