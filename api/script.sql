DROP DATABASE IF EXISTS objet_connect2;
CREATE DATABASE objet_connect2;

DROP USER IF EXISTS 'usager'@'localhost';
CREATE USER 'usager'@'localhost' IDENTIFIED BY 'motdepasse1234
GRANT ALL PRIVILEGES ON objet_connect2.* TO 'usager'@'localhos
