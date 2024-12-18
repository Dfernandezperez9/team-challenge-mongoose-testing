const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = 4000;
const { DB_CONNECTION } = require('./config/config.js');
const ROUTES = require('./routes/routes.js');

APP.use(EXPRESS.json());

APP.use('/', ROUTES);

DB_CONNECTION();

APP.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));