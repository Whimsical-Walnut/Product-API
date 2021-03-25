DROP DATABASE IF EXISTS productAPI;

CREATE DATABASE productAPI;

use productAPI;

CREATE TABLE product (
  product_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price VARCHAR(100) NOT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE feature_product (
  feature_product_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  feature VARCHAR(100) NOT NULL,
  value VARCHAR(100),
  FOREIGN KEY (product_id)
  REFERENCES product(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (feature_product_id)
);

CREATE TABLE related (
  related_id INT NOT NULL AUTO_INCREMENT,
  product1_id INT NOT NULL,
  product2_id INT NOT NULL,
  UNIQUE(product1_id, product2_id),
  FOREIGN KEY (product1_id)
  REFERENCES product(product_id)
  ON DELETE CASCADE,
  FOREIGN KEY (product2_id)
  REFERENCES product(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (related_id)
);

CREATE TABLE style (
  style_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  style_name VARCHAR(100) NOT NULL,
  sale_price VARCHAR(100) NOT NULL,
  original_price VARCHAR(50),
  default_bool BOOLEAN,
  FOREIGN KEY (product_id)
  REFERENCES product(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (style_id)
);

CREATE TABLE SKUS (
  SKU_id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  FOREIGN KEY (style_id)
  REFERENCES style(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (SKU_id)
);

CREATE TABLE photos (
  photos_id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  FOREIGN KEY (style_id)
  REFERENCES style(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (photos_id)
);

LOAD DATA LOCAL INFILE '/tmp/product.csv'
INTO TABLE product
FIELDS OPTIONALLY ENCLOSED BY '"'
TERMINATED BY ','
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE '/tmp/related.csv'
INTO TABLE related
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/tmp/styles.csv'
INTO TABLE style
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/tmp/skus.csv'
INTO TABLE SKUS
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/tmp/photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/tmp/features.csv'
INTO TABLE feature_product
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';