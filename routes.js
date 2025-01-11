const express = require('express');
const middlewares = require('./middlewares');

const router = express.Router();

router.get('/', middlewares.setup);

router.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <p>¡Has ingresado la palabra correcta!</p>
    <form method="post" action="/logout">
      <button type="submit">Cerrar Sesión</button>
    </form>
  `);
});

router.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <p>Bienvenido de nuevo.</p>
    <form method="post" action="/logout">
      <button type="submit">Cerrar Sesión</button>
    </form>
  `);
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});

module.exports = router;