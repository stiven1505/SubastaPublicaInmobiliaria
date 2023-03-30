import mongoose, { Schema, model } from 'mongoose';






const propiedades = new Schema({

  /*Datos para vista publica*/
   
    titulo:{type:String},
    ciudad: {type: String},
    direccion: {type: String},
    barrio: {type: String},
    precio: {type: String},
    area: {type: String},
    habitaciones: {type: String},
    banos: {type: String},
    parqueadero: {type: String},
    estrato: {type: String},
    zonasComunes: {type: String},
    descripcion: {type: String},

    
    /* Manejo de imagenes */

      imageURL:{type:String},
      public_id:{type:String},
      size: { type: Number},



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


// Agregar el campo autoincrementable a la propiedad "codigo"



const Propiedades = mongoose.model('Propiedades', propiedades);
export default Propiedades;
