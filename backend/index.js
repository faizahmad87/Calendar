const {Sequelize} = require('sequelize');

// Set up a Sequelize connection to the MySQL database
// const sequelize = new Sequelize('sql12732604', 'sql12732604', 'dVpzTCHKs5', {
//  host: 'sql12.freesqldatabase.com',
//  dialect: 'mysql',
//  port: 3306
// });
const sequelize = require('./config/database');

// Test the connection
sequelize
 .authenticate()
 .then(() => console.log('Database connected'))
 .catch(err => console.error('Unable to connect to the database:', err));

sequelize
 .sync({force: false}) // Use 'force: true' if you want to drop and recreate tables every time
 .then(() => {
  console.log('Database synced');
 })
 .catch(err => console.log('Error syncing database:', err));

const express = require('express');
const cors = require('cors');
const app = express();
const eventRoutes = require('./routes/event'); // Add path to your event routes
const authRoutes = require('./routes/auth'); // Import authentication routes

app.use(cors());
app.use(express.json());

app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
