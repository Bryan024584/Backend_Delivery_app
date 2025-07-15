require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en el puerto ${PORT}`));