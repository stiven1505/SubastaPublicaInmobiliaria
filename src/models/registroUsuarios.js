import mongoose, { Schema, model } from 'mongoose';






const usuario = new Schema({

  /*Datos para manejo de interesados por propiedades*/

    nombreInteresado: {type: String},
    telefonoInteresado: {type: String},
    correoInteresado: {type: String,
        lowercase: true,
        trim: true,
        validate: {
          validator: function(v) {
            // Validación de correo electrónico utilizando expresiones regulares
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: props => `${props.value} no es un correo electrónico válido!`
        }},
    codigoPropiedadInteres:{type:String},

    created_at: {type: Date, default: Date.now()},

},
{
  versionKey: false,
});






const Usuario = mongoose.model('Usuario', usuario);
export default Usuario;
