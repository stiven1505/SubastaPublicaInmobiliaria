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
agregarPropiedades
} from '../controller/propiedadesController.js';

import {
    registroUsuario
} from '../controller/usuariosController.js'


const router = Router()

router.get('/',pageInicio)

router.get('/acercaNosotros',pageAcercaNosotros)

router.get('/propiedadesDisponibles',pagePropiedadesDisponibles )

router.get('/preguntasFrecuentes',pagePreguntasFrecuentes)

router.get('/contactanos',pageContacto)

router.get('/formularioPropiedades', pageFormularioPropiedades)

router.post('/agregar/propiedades',agregarPropiedades)

router.post('/registro/usuario',registroUsuario)

export default router;
