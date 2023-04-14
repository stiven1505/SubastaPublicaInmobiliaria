
import Usuario from '../models/registroUsuarios.js';
import nodemailer from 'nodemailer';


// Configuración del transporte SMTP para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD_GMAIL
    }
  });

export const registroUsuario = async(req,res)=>{
    // el try-catch se usa para envolver la promesa que hace cuando se llama fs.unlink 
    try{
       

        const datos = req.body;
        const newUsuario =  new Usuario({
        
        
        /*Datos Manejo interno*/
        nombreInteresado: datos.nombreInteresado,
        telefonoInteresado: datos.telefonoInteresado,
        correoInteresado: datos.correoInteresado,
        codigoPropiedadInteres : datos.codigoPropiedadInteres,
        
        });

await newUsuario.save();



const message = {
    from: datos.correoInteresado,
    to: process.env.MAIL,
    subject: 'Subasta Publica Inmobiliaira ',
    text: 'Me interesa esta propiedad \n\n Codigo de la propiedad:'
    +datos.codigoPropiedadInteres+
    '\n Nombre del interesado: '+datos.nombreInteresado+
    '\n Telefono del interesado: '+datos.telefonoInteresado+
    '\n Correo del interado: '+datos.correoInteresado
  };
  transporter.sendMail(message, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });


res.redirect("back");

    } catch (e){
        console.error('Error uploading or deleting local file:', e);
        res.status(500).send('Error uploading or deleting local file');
    }
}
