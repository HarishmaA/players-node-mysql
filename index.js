const express = require('express');
const app = express();
const dbRoutes = require('./routes/db');
const authRoutes = require('./routes/auth');
const coachRoutes = require('./routes/coaches');
const teamRoutes = require('./routes/teams');
const playerRoutes = require('./routes/players');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use("/db", dbRoutes);
app.use("/api/user", authRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);



app.listen(3000, () => console.log('Server up and running'));
  