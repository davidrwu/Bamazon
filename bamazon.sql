-- Delete the database called 'bamazon_DB' --
DROP DATABASE bamazon_DB;

-- Create a database called 'bamazon_DB' and USE it --
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

-- Create a table called 'products' for our store inventory --
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('iPad', 'Electronics', 300, 50),
		('Echo Dot', 'Electronics', 30, 100),
		('Micro USB charger', 'Electronics', 10, 100),
		('Shampoo', 'Beauty', 4, 1000),
		('Conditioner', 'Beauty', 5, 500),
		('Toothpaste', 'Beauty', 3, 100),
		('Toothbrush', 'Beauty', 5, 1000),
		('Bed sheets', 'Home', 40, 20),
		('3 Shelf Drawer', 'Home', 80, 5),
		('Pillow', 'Home', 2, 30);