const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countries = require('./Country.js');
const activities = require('./Activity.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/Countries', countries);
router.use('/Activities', activities);

module.exports = router;

//---> Request ----> Server ----> Index.JS ---->
//                                                \
//                                                 \
//                                                /  \
//                                               /    \
//                                          /Country   /Activity
