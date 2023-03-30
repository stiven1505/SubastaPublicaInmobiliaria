import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import ejs from 'ejs';
// se utiliza para crear una ruta adsoluta
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
//inicializaciones

const app = express();
import './database.js'
import { default as indexRoutes } from './routes/index.js'



app.set('views', path.join(__dirname,'views')) //Se agrega la direccion donde estan las vistas 
app.set('view engine','ejs') //Para comunicarle al servidor que vamos a utilizar 
app.use(morgan('dev'));
app.use(express.json());//para que el servidor lea archivos json sin problemaas
app.use(express.urlencoded({extended:false}))//para que el servidor lea  datos no pesados del formulario, solo texto
const storage = multer.diskStorage({
    destination:path.join(__dirname,'uploads'), //crea una carpeta para guardar imagenes localmente 
    filename:(req, file, cb)=>{
        cb(null,new Date().getTime() + path.extname(file.originalname))//guarda la imagen con el la funcion Date con el tiempo de subida en milisegundo que lo vuelve en teoria un numero unico, ademas con su extencion se agrega con path.extname
    }
});
app.use(multer({storage}).array('image'));//revisa si cada vez que manden un dato tiene el nombre image
app.use(indexRoutes) //utilizar los routers 

export default app;


app.use(express.static(join(__dirname, "public")));
//app.use(morgan("dev"));// middlewares

app.listen(process.env.PORT || 3000)
console.log('server listening',process.env.PORT || 3000);
