CREATE DATABASE performance_lab_03;
USE performance_lab_03;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(100),
  price DECIMAL(10,2),
  stock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);