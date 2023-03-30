import { Router } from 'express';
import Propiedades from '../models/imagen.js'
import cloudinary from 'cloudinary'
const router = Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});






import fs from 'fs-extra';
// rutas relaccionadas con la aplicacion es decir va estar conectada con el menu 

// cuando se haga la consulta de la pagina principal se muestra lo que esta en la funcion
router.get('/',(req,res)=>res.render('index',{title:'SPI'}))

router.get('/acercaNosotros',(req,res)=>res.render('acercaNosotros',{title:'SPI - Acerca de Nosotros'} ))

router.get('/propiedadesDisponibles', async (req,res)=>{
    const propiedad = await Propiedades.find();
    console.log(propiedad);
    
    res.render('propiedadesDisponibles',{propiedad})
})




router.get('/preguntasFrecuentes',(req,res)=>res.render('preguntasFrecuentes',{title:'SPI - Preguntas Frecuentes'}))

router.get('/contactanos',(req,res)=>res.render('contactanos',{title:'SPI - Contactenos'}))

router.get('/formularioPropiedades',(req,res)=>res.render('formularioPropiedades',{title:'SPI - Administracion'}))

router.post('/agregar/propiedades',async(req,res)=>{
    // el try-catch se usa para envolver la promesa que hace cuando se llama fs.unlink 
    try{
        const imagenes = []
        const datos = req.body;
        // se hace un bucle donde va a guardar cada una de la imagenes en cloudinary y se ira guardando en el arreglo imagenes con sus respetivos datos y luego se enviaran a la base de datos 
        for (const file of req.files) {
        const imagen = await cloudinary.v2.uploader.upload(file.path, { width:1600, height:750 });//subida a cloudinary
        imagenes.push({//guarda en arreglo 
            url: imagen.secure_url,
            public_id: imagen.public_id,
            size: imagen.bytes
        });
        }

const newPropiedad =  new Propiedades({
  /*Datos para vista publica*/
  titulo : datos.titulo ,
  ciudad :  datos.ciudad ,
  direccion :  datos.direccion ,
  barrio :  datos.barrio ,
  precio :  datos.precio ,
  area :  datos.area ,
  habitaciones :  datos.habitaciones ,
  banos :  datos.banos ,
  parqueadero :  datos.parqueadero ,
  estrato :  datos.estrato ,
  zonasComunes :  datos.zonasComunes ,
  descripcion : datos.descripcion ,
  /* Manejo de imagenes */
  image: imagenes,
  /*Datos Manejo interno*/
  cedulaPropietario: datos.cedulaPropietario,
  nombrePropietario: datos.nombrePropietario,
  telefonoPropietario: datos.telefonoPropietario,
  correoPropietario: datos.correoPropietario,
});

await newPropiedad.save();
for (const file of req.files) {
  await fs.unlink(file.path);
}

res.redirect("back");

    } catch (e){
        console.error('Error uploading or deleting local file:', e);
        res.status(500).send('Error uploading or deleting local file');
    }
}
)
export default router;
