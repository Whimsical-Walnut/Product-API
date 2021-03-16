DROP DATABASE IF EXISTS productAPI;

CREATE DATABASE productAPI;

use productAPI;

CREATE TABLE category (
  category_id INT NOT NULL AUTO_INCREMENT,
  category VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (category_id)
);

CREATE TABLE product (
  product_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL DEFAULT '',
  slogan VARCHAR(500) NOT NULL DEFAULT '',
  description VARCHAR(500) NOT NULL DEFAULT '',
  category_id INT NOT NULL,
  FOREIGN KEY (category_id)
  REFERENCES category(category_id)
  ON DELETE CASCADE,
  PRIMARY KEY (product_id)
);

-- CREATE TABLE category_product (
--   category_product_id INT NOT NULL AUTO_INCREMENT,
--   category_id INT NOT NULL,
--   product_id INT NOT NULL,
--   FOREIGN KEY (category_id)
--   REFERENCES category(category_id)
--   ON DELETE CASCADE,
--   FOREIGN KEY (product_id)
--   REFERENCES product(product_id)
--   ON DELETE CASCADE,
--   PRIMARY KEY (category_product_id)
-- );

CREATE TABLE features (
  feature_id INT NOT NULL AUTO_INCREMENT,
  feature VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (feature_id)
);

CREATE TABLE feature_product (
  feature_product_id INT NOT NULL AUTO_INCREMENT,
  feature_id INT NOT NULL,
  product_id INT NOT NULL,
  value VARCHAR(100),
  FOREIGN KEY (feature_id)
  REFERENCES features(feature_id)
  ON DELETE CASCADE,
  FOREIGN KEY (product_id)
  REFERENCES product(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (feature_product_id)
);

CREATE TABLE related (
  related_id INT NOT NULL AUTO_INCREMENT,
  product1_id INT NOT NULL,
  product2_id INT NOT NULL,
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
  sale_price VARCHAR(50) NOT NULL DEFAULT '',
  default_bool BOOLEAN,
  FOREIGN KEY (product_id)
  REFERENCES product(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (style_id)
);

CREATE TABLE SKUS (
  SKU_id INT NOT NULL AUTO_INCREMENT,
  size VARCHAR(10) NOT NULL DEFAULT '',
  quantity INT NOT NULL DEFAULT 0,
  style_id INT NOT NULL,
  FOREIGN KEY (style_id)
  REFERENCES style(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (SKU_id)
);

CREATE TABLE photos (
  photos_id INT NOT NULL AUTO_INCREMENT,
  thumbnail_url VARCHAR(500) NOT NULL DEFAULT '',
  url VARCHAR(500) NOT NULL DEFAULT '',
  style_id INT NOT NULL,
  FOREIGN KEY (style_id)
  REFERENCES style(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (photos_id)
);