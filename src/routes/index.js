import{Router} from 'express'
const router = Router()


// rutas relaccionadas con la aplicacion es decir va estar conectada con el menu 

// cuando se haga la consulta de la pagina principal se muestra lo que esta en la funcion
router.get('/',(req,res)=>res.render('index',{title:'SPI'}))

router.get('/acercaNosotros',(req,res)=>res.render('acercaNosotros',{title:'SPI - Acerca de Nosotros'} ))

router.get('/propiedadesDisponibles',(req,res)=>res.render('propiedadesDisponibles',{title:'SPI - Propiedades Disponibles'}))

router.get('/preguntasFrecuentes',(req,res)=>res.render('preguntasFrecuentes',{title:'SPI - Preguntas Frecuentes'}))

router.get('/contactanos',(req,res)=>res.render('contactanos',{title:'SPI - Contactenos'}))


export default router