/*
# The statement below, which creates the mySQL database schema needs 
# to be run alone first if it does not already exist.
#
# CREATE SCHEMA `reservationdb`;
#
*/


CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';
FLUSH PRIVILEGES;