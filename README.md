# API Performance Lab 03 - Database Indexing

This lab shows how a database index changes the performance of the same API query under load.

The app exposes a single endpoint that queries MySQL for the newest laptop products. You can run the query without an index, add the composite index, and compare the results with the included k6 script and saved output files.

## What’s Included

- [app/server.js](app/server.js) - Express API backed by MySQL
- [database/schema.sql](database/schema.sql) - products table schema
- [database/seed.sql](database/seed.sql) - bulk data generator
- [database/slow-query.sql](database/slow-query.sql) - baseline query plan
- [database/index.sql](database/index.sql) - index for the optimized run
- [database/optimized-query.sql](database/optimized-query.sql) - query plan after indexing
- [k6-test/slow-db-test.js](k6-test/slow-db-test.js) - load test script
- [results/](results) - sample benchmark and query-plan outputs

## Requirements

- Node.js
- MySQL
- k6

## Setup

Install the API dependencies:

```bash
cd app
npm install
```

Create a `.env` file in `app/` with your database settings:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000
```

## Database Setup

1. Create the table with [database/schema.sql](database/schema.sql).
2. Seed data with [database/seed.sql](database/seed.sql).
3. Run [database/slow-query.sql](database/slow-query.sql) to inspect the baseline execution plan.
4. Run [database/index.sql](database/index.sql) to create the composite index.
5. Run [database/optimized-query.sql](database/optimized-query.sql) to compare the optimized execution plan.

## Run the API

Start the server from the `app/` folder:

```bash
node server.js
```

The API serves:

- `GET /products`

Example response shape:

```json
{
	"count": 50,
	"data": []
}
```

## Run the Load Test

Use k6 against the running API:

```bash
k6 run k6-test/slow-db-test.js
```

The script sends requests to `http://localhost:3000/products` with 50 virtual users for 10 seconds.

## Compare Results

Compare the slow and optimized runs using the saved output files in [results/](results):

- `slow-api-k6.txt`
- `optimized-api-k6.txt`
- `slow-query-result.txt`
- `optimized-query-result.txt`

The main difference should be lower query cost and better latency after adding the index on `(category, created_at)`.

## Learning Goal

Understand how an index can reduce full table scans and improve response time, throughput, and consistency under load.