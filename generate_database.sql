CREATE DATABASE IF NOT EXISTS projekti_nodevue;
USE projekti_nodevue;

CREATE TABLE Users (
    User_ID INT NOT NULL AUTO_INCREMENT,
    Username varchar(30) NOT NULL,
    Profile_picture varchar(255) DEFAULT 'Portrait_placeholder.png',
    Password varchar(255) NOT NULL,
    PRIMARY KEY (User_ID)
);

CREATE TABLE Listens (
    Listen_ID BIGINT NOT NULL AUTO_INCREMENT,
    Listen_timestamp TIMESTAMP NOT NULL,
    Artist TEXT NOT NULL,
    Album TEXT,
    Title TEXT,
    User_ID INT,
    PRIMARY KEY (Listen_ID),
    FOREIGN KEY (User_ID) REFERENCES Users (User_ID)
);

CREATE TABLE Profile_comments (
    Comment_ID INT NOT NULL AUTO_INCREMENT,
    Comment_text TEXT NOT NULL,
    Commenter_ID INT NOT NULL,
    User_ID INT NOT NULL,
    PRIMARY KEY (Comment_ID),
    FOREIGN KEY (User_ID) REFERENCES Users (User_ID),
    FOREIGN KEY (Commenter_ID) REFERENCES Users (User_ID)
);

INSERT INTO Users (Username, Profile_picture, Password) 
VALUES ('Jorma', 'Portrait_placeholder.png', 'salasana1');
INSERT INTO Users (Username, Profile_picture, Password) 
VALUES ('Raine', 'Portrait_placeholder.png', 'salasana2');

INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Eppu Normaali', 'Joku Levy', 'Joku Kappale', 1);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Apulanta', 'Heinola 10', 'Reunallat', 1);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Apulanta', 'Heinola 10', 'Reunallat', 1);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Apulanta', 'Heinola 10', 'Reunallat', 1);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Popeda', 'Biisi 1', 'Levy 1', 1);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Random Artisti', 'Random Levy', 'Random Kappale', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Random Artisti', 'Random Levy', 'Random Kappale', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Nigthwish', 'Joku Levy', 'Wishmaster', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Arcade Fire', 'Neon Bible', 'Intervention', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Arcade Fire', 'Neon Bible', 'Intervention', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Arcade Fire', 'Levy', 'Mato', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Apulanta', 'Heinola 10', 'Viivakoodit', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Apulanta', 'Heinola 10', 'Viivakoodit', 2);
INSERT INTO Listens (Artist, Album, Title, User_ID)
VALUES ('Apulanta', 'Levy', 'Mato', 2);

INSERT INTO Profile_comments (Comment_text, Commenter_ID, User_ID)
VALUES ('Tämä on kommentti', 2, 1);
INSERT INTO Profile_comments (Comment_text, Commenter_ID, User_ID)
VALUES ('Tämä on toinen kommentti', 2, 1);
INSERT INTO Profile_comments (Comment_text, Commenter_ID, User_ID)
VALUES ('uhtenohutenoa', 2, 1);
INSERT INTO Profile_comments (Comment_text, Commenter_ID, User_ID)
VALUES ('pgöcr,äåcpr,öägrpcöäå,', 2, 1);
INSERT INTO Profile_comments (Comment_text, Commenter_ID, User_ID)
VALUES ('jmkwvqmkjvzj.mz.qvjwjwvzq.', 1, 2);
INSERT INTO Profile_comments (Comment_text, Commenter_ID, User_ID)
VALUES ('unohunohunhounhonuhnouhnohun', 1, 2);
