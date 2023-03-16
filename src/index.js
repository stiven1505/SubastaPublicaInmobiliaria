import express from 'express'
import ejs from 'ejs'

// se utiliza para crear una ruta adsoluta
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
import indexRoutes from './routes/index.js'


app.set('views', join(__dirname,'views')) //Se agrega la direccion donde estan las vistas 
app.set('view engine','ejs') //Para comunicarle al servidor que vamos a utilizar 
app.use(indexRoutes) //utilizar los routers 
app.use(express.static(join(__dirname, "public")));
//app.use(morgan("dev"));// middlewares



app.listen(process.env.PORT || 3000)
console.log('server listening',process.env.PORT || 3000);
