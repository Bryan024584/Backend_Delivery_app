const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String, // Opcional, puedes usarlo más adelante
  role: { type: String, default: 'user' } // Para diferenciar admins en el futuro
});

module.exports = mongoose.model('User', userSchema);