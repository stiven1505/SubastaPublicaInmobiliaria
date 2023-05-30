import Propiedad from '../models/registroPropiedades.js';
import dotenv from 'dotenv';// lee el archivo .env y la hace disponible entodo el proyecto
dotenv.config();



export const pageInicio = (req,res)=>res.render('index',{title:'SPI'});

export const pagePreguntasFrecuentes = (req,res)=>res.render('preguntasFrecuentes',{title:'SPI - Preguntas Frecuentes'});

export const pageAcercaNosotros = (req,res)=>res.render('acercaNosotros',{title:'SPI - Acerca de Nosotros'} );

export const pageContacto =  (req,res)=>res.render('contactanos',{title:'SPI - Contactenos'});

export const  pageFormularioPropiedades =  async (req, res) => {

    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const devIP = req.ip;
   

    // Verificar si la dirección IP es la permitida
    if (clientIP === process.env.IP_ADMIN || devIP === process.env.IP_DEV) {
      
      const propiedadListado = await Propiedad.find().lean()//devuelve una lista de objetos tipica  con lean

      res.render('formularioPropiedades', { propiedadListado: propiedadListado });
  

    } else {
      res.status(403).send('Acceso denegado');
    }
  };




