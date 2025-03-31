  CREATE DATABASE IF NOT EXISTS RetroCollection;
  
  use RetroCollection;

  CREATE TABLE IF NOT EXISTS users(
    id INT(11) NOT NULL auto_increment,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    picture_url VARCHAR(100),
    PRIMARY KEY (id)
  );