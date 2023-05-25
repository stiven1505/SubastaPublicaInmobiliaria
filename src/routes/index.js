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
pagePropiedadesDisponiblesPermuta,
pagePropiedadesDisponiblesSubasta,
pageBusquedaPropiedades,
agregarPropiedades,
eliminarPropiedad,
actualizarPropiedadGet,
actualizarPropiedadPost
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

router.get('/propiedadesDisponiblesSubasta',pagePropiedadesDisponiblesSubasta )

router.get('/propiedadesDisponiblesPermuta',pagePropiedadesDisponiblesPermuta )

router.get('/preguntasFrecuentes',pagePreguntasFrecuentes)

router.get('/contactanos',pageContacto)

router.get('/formularioPropiedades', pageFormularioPropiedades)

router.get('/eliminar/:id', eliminarPropiedad)

router.get('/actualizar/:id', actualizarPropiedadGet)

router.get('/convertidor',pageConvertidor);

router.get('/simuladorCredito',pageSimulador);

router.post('/agregar/propiedades',agregarPropiedades)

router.post('/registro/usuario',registroUsuario)

router.post('/busqueda/propiedades',pageBusquedaPropiedades)

router.post('/convertir', convertirMoneda);

router.post('/simuladorCredito', simuladorCredito);

router.post('/actualizar/:id', actualizarPropiedadPost);



export default router;
