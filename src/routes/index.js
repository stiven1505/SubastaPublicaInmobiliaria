import { Router } from 'express';

import {
pageInicio,
pagePreguntasFrecuentes,
pageAcercaNosotros,
pageContacto,
pageFormularioPropiedades

} from '../controller/renderPageController.js';

import {
pagePropiedadesDisponibles,
pageBusquedaPropiedades,
agregarPropiedades
} from '../controller/propiedadesController.js';

import {
    registroUsuario
} from '../controller/usuariosController.js'

import {
 simuladorCredito,
 convertirMoneda,
 pageConvertidor,
 pageSimulador
} from '../controller/convertidor-simulador.js'


const router = Router()

router.get('/',pageInicio)

router.get('/acercaNosotros',pageAcercaNosotros)

router.get('/propiedadesDisponibles',pagePropiedadesDisponibles )

router.get('/preguntasFrecuentes',pagePreguntasFrecuentes)

router.get('/contactanos',pageContacto)

router.get('/formularioPropiedades', pageFormularioPropiedades)

router.post('/agregar/propiedades',agregarPropiedades)

router.post('/registro/usuario',registroUsuario)

router.post('/busqueda/propiedades',pageBusquedaPropiedades)

// Renderizar la vista de conversión de moneda
router.get('/convertidor',pageConvertidor);

  router.post('/convertir', convertirMoneda);


  // Renderizar la vista de conversión de moneda
router.get('/simuladorCredito',pageConvertidor);

router.post('/simuladorCredito', simuladorCredito);

export default router;
