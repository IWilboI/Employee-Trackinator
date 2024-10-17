const { Client } = require('pg');

// Configure PostgreSQL connection
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',  // Change if your PostgreSQL username is different
  password: 'Awesome1!',  // Replace with your actual password
  database: 'Employee-Trackinator'
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

module.exports = client;
