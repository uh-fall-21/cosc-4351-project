/*
# The statement below, which creates the database schema needs 
# to be run alone first if it does not already exist.
#
# CREATE SCHEMA IF NOT EXISTS `restaurant`;
#
*/


CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';
FLUSH PRIVILEGES;

USE restaurant;

CREATE TABLE IF NOT EXISTS `Login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
