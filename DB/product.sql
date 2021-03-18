-- DROP DATABASE IF EXISTS productAPI;

-- CREATE DATABASE productAPI;

use productAPI;

-- CREATE TABLE product (
--   product_id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(100) NOT NULL DEFAULT '',
--   slogan VARCHAR(255) NOT NULL DEFAULT '',
--   description VARCHAR(500) NOT NULL DEFAULT '',
--   category VARCHAR(50) NOT NULL DEFAULT '',
--   default_price VARCHAR(100) NOT NULL DEFAULT '',
--   PRIMARY KEY (product_id)
-- );

-- CREATE TABLE feature_product (
--   feature_product_id INT NOT NULL AUTO_INCREMENT,
--   product_id INT NOT NULL,
--   feature VARCHAR(100) NOT NULL,
--   value VARCHAR(100),
--   FOREIGN KEY (product_id)
--   REFERENCES product(product_id)
--   ON DELETE CASCADE,
--   PRIMARY KEY (feature_product_id)
-- );

-- CREATE TABLE related (
--   related_id INT NOT NULL AUTO_INCREMENT,
--   product1_id INT NOT NULL,
--   product2_id INT NOT NULL,
--   UNIQUE(product1_id, product2_id),
--   FOREIGN KEY (product1_id)
--   REFERENCES product(product_id)
--   ON DELETE CASCADE,
--   FOREIGN KEY (product2_id)
--   REFERENCES product(product_id)
--   ON DELETE CASCADE,
--   PRIMARY KEY (related_id)
-- );

-- CREATE TABLE style (
--   style_id INT NOT NULL AUTO_INCREMENT,
--   product_id INT NOT NULL,
--   style_name VARCHAR(100) NOT NULL DEFAULT '',
--   sale_price VARCHAR(100) NOT NULL DEFAULT '',
--   original_price VARCHAR(50),
--   default_bool TINYINT,
--   FOREIGN KEY (product_id)
--   REFERENCES product(product_id)
--   ON DELETE CASCADE,
--   PRIMARY KEY (style_id)
-- );

-- CREATE TABLE SKUS (
--   SKU_id INT NOT NULL AUTO_INCREMENT,
--   style_id INT NOT NULL,
--   size VARCHAR(10) NOT NULL DEFAULT '',
--   quantity INT NOT NULL DEFAULT 0,
--   FOREIGN KEY (style_id)
--   REFERENCES style(style_id)
--   ON DELETE CASCADE,
--   PRIMARY KEY (SKU_id)
-- );

-- CREATE TABLE photos (
--   photos_id INT NOT NULL AUTO_INCREMENT,
--   style_id INT NOT NULL,
--   url VARCHAR(500) NOT NULL DEFAULT '',
--   thumbnail_url VARCHAR(500) NOT NULL DEFAULT '',
--   FOREIGN KEY (style_id)
--   REFERENCES style(style_id)
--   ON DELETE CASCADE,
--   PRIMARY KEY (photos_id)
-- );

-- LOAD DATA LOCAL INFILE './clean/product.csv'
-- INTO TABLE product
-- FIELDS OPTIONALLY ENCLOSED BY '"'
-- TERMINATED BY ','
-- LINES TERMINATED BY '\n';

-- LOAD DATA LOCAL INFILE './Assets/related.csv'
-- INTO TABLE related
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE './Assets/styles.csv'
-- INTO TABLE style
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE './Assets/skus.csv'
-- INTO TABLE SKUS
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE './clean/photos.csv'
-- INTO TABLE photos
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE './Assets/features.csv'
-- INTO TABLE feature_product
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n';