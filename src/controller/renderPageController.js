import Propiedad from '../models/registroPropiedades.js'



export const pageInicio = (req,res)=>res.render('index',{title:'SPI'});

export const pagePreguntasFrecuentes = (req,res)=>res.render('preguntasFrecuentes',{title:'SPI - Preguntas Frecuentes'});

export const pageAcercaNosotros = (req,res)=>res.render('acercaNosotros',{title:'SPI - Acerca de Nosotros'} );

export const pageContacto =  (req,res)=>res.render('contactanos',{title:'SPI - Contactenos'});

export const  pageFormularioPropiedades =  async (req, res) => {

    const propiedadListado = await Propiedad.find().lean()//devuelve una lista de objetos tipica  con lean

    res.render('formularioPropiedades', { propiedadListado: propiedadListado });

};




