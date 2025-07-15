const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Registro
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'Correo ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al registrar usuario' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el inicio de sesión' });
  }
};