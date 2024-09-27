const MONGOOSE = require('mongoose');
require('dotenv').config();

const DB_CONNECTION = async() => {
    try {
        console.log(process.env.MONGO_URL);
        await MONGOOSE.connect(process.env.MONGO_URL);
        console.log('Base de datos conectada con éxito');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = {
    DB_CONNECTION,
};