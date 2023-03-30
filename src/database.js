import mongoose from 'mongoose';
import dotenv from 'dotenv';// lee el archivo .env y la hace disponible entodo el proyecto
dotenv.config();


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true //no de errores por consola
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));