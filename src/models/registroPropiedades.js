import mongoose, { Schema, model } from 'mongoose';

const propiedades = new Schema({

  /*Datos para vista publica*/
    estado:{type:String},
    tipo:{type:String},
    titulo:{type:String},
    departamento: {type: String},
    ciudad: {type: String},
    direccion: {type: String},
    barrio: {type: String},
    precio: {type: String},
    area: {type: String},
    habitaciones: {type: String},
    banos: {type: String},
    parqueadero: {type: String},
    estrato: {type: String},
    
    zonasComunes: {
      type: [{
        type: String,
        enum: ['ascensor', 'azotea', 'gimnasio', 'bodega', 'lavanderia', 'piscina', 'sala reuniones', 'salon de ventas', 'zona juegos', 'zona de BBQ', 'Sin información']
      }],
      default: ['Sin información']
    },

    descripcion: {type: String},

    
    /* Manejo de imagenes */

    image: [
      {
        url: String,
        public_id: String,
        size: Number,
      },
    ],



    /*Datos Manejo interno*/
    
    cedulaPropietario: {type: String},
    nombrePropietario: {type: String},
    telefonoPropietario: {type: String},
    correoPropietario: {type: String,
        lowercase: true,
        trim: true,
        validate: {
          validator: function(v) {
            // Validación de correo electrónico utilizando expresiones regulares
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: props => `${props.value} no es un correo electrónico válido!`
        }},

    
    created_at: {type: Date, default: Date.now()},
    
  
    
},
{
  versionKey: false,
});






const Propiedades = mongoose.model('Propiedades', propiedades);
export default Propiedades;
