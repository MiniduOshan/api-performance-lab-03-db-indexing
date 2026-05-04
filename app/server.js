const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/products", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, name, category, price, stock, created_at
      FROM products
      WHERE category = 'Laptop'
      ORDER BY created_at DESC
      LIMIT 50
    `);

    res.json({
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database query failed",
      error: error.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});