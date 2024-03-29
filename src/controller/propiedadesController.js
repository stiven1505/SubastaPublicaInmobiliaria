import Propiedades from '../models/registroPropiedades.js';
import fs from 'fs-extra';
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// listar Propiedades disponibles para la venta
export const pagePropiedadesDisponibles =  async (req,res)=>{
    //consulta en mongoDB para mostrar resultados
    const propiedad = await Propiedades.find({ tipo : "Propiedad en venta", estado : "Activo"}).sort({created_at: -1});
   
    
    res.render('propiedadesDisponibles',{propiedad,title:'SPI - Propiedades Disponibles'})
};

// listar Propiedades disponibles para la venta
export const pagePropiedadesDisponiblesSubasta =  async (req,res)=>{
    //consulta en mongoDB para mostrar resultados
    const propiedad = await Propiedades.find({ tipo : "Propiedad en subasta", estado : "Activo"}).sort({created_at: -1});
   
    
    res.render('propiedadesDisponiblesSubasta',{propiedad,title:'SPI - Propiedades Disponibles'})
};

// listar Propiedades disponibles para la venta
export const pagePropiedadesDisponiblesPermuta =  async (req,res)=>{
    //consulta en mongoDB para mostrar resultados
    const propiedad = await Propiedades.find({ tipo : "Propiedad en permuta", estado : "Activo"}).sort({created_at: -1});
   
    
    res.render('propiedadesDisponiblesPermuta',{propiedad,title:'SPI - Propiedades Disponibles'})
};

export const pageBusquedaPropiedades=  async (req,res)=>{
    //consulta en mongoDB para mostrar resultados

    const datos = req.body;
    let query = {};

    if (datos.titulo && datos.titulo.trim() !== '' && Propiedades.schema.paths.hasOwnProperty('titulo')
    && datos.ciudad && datos.ciudad.trim() !== '' && Propiedades.schema.paths.hasOwnProperty('ciudad')
    && datos.departamento && datos.departamento.trim() !== '' && Propiedades.schema.paths.hasOwnProperty('departamento')) {
    
        query = {
       
        $and: [
            { titulo: { $regex: datos.titulo, $options: 'i' } },
            { departamento: { $regex: datos.departamento, $options: 'i' } },
            { ciudad: { $regex: datos.ciudad, $options: 'i' } },
            { precio: { $gte: datos.precioMin, $lte: datos.precioMax } },
            { area: { $gte: datos.areaMin, $lte: datos.areaMax } }

        ],
       
    };
} else {
    query = {};
}
 
    

    const propiedadBusqueda = await Propiedades.find(query)

    res.render('busquedaPropiedadesDisponibles',{propiedadBusqueda,title:'SPI - Busqueda Propiedades Disponibles'})
};






export const  agregarPropiedades = async(req,res)=>{
    // el try-catch se usa para envolver la promesa que hace cuando se llama fs.unlink 
    try{
        const imagenes = [];
        const zonasComunesSeleccionadas = req.body.zonasComunes;

        const datos = req.body;

        const precioFormateado = Number(datos.precio).toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          });

        // se hace un bucle donde va a guardar cada una de la imagenes en cloudinary y se ira guardando en el arreglo imagenes con sus respetivos datos y luego se enviaran a la base de datos 
        for (const file of req.files) {
        const imagen = await cloudinary.v2.uploader.upload(file.path, { width:1600, height:900 });//subida a cloudinary
        imagenes.push({//guarda en arreglo 
            url: imagen.secure_url,
            public_id: imagen.public_id,
            size: imagen.bytes
        });
        }

            const newPropiedad =  new Propiedades({
            /*Datos para vista publica*/
            tipo : datos.tipo ,
            estado : datos.estado,
            titulo : datos.titulo ,
            departamento : datos.departamento , 
            ciudad :  datos.ciudad ,
            direccion :  datos.direccion ,
            barrio :  datos.barrio ,
            precio :  datos.precio ,
            area :  datos.area ,
            habitaciones :  datos.habitaciones ,
            banos :  datos.banos ,
            parqueadero :  datos.parqueadero ,
            estrato :  datos.estrato ,
            zonasComunes :  zonasComunesSeleccionadas ,
            descripcion : datos.descripcion ,
            /* Manejo de imagenes */
            image: imagenes,
            /*Datos Manejo interno*/
            cedulaPropietario: datos.cedulaPropietario,
            nombrePropietario: datos.nombrePropietario,
            telefonoPropietario: datos.telefonoPropietario,
            correoPropietario: datos.correoPropietario,
            });

            await newPropiedad.save();
            for (const file of req.files) {
            await fs.unlink(file.path);
            }

            res.redirect("back");

                } catch (e){
                    console.error('Error uploading or deleting local file:', e);
                    res.status(500).send('Error uploading or deleting local file');
                }
            }



            export const eliminarPropiedad = async(req,res)=>{
                const { id } = req.params;
            
                await Propiedades.findByIdAndDelete(id)
            
                res.redirect("/formularioPropiedades")
            };



            export const actualizarPropiedadPost = async (req, res) => {

                try {
                    const {id}= req.params //id que se va actualizar
                   await Propiedades.findByIdAndUpdate(id, req.body)
            
                    res.redirect("/formularioPropiedades")
                } catch (error) {
                    console.log(error)
                }
            
            
            }
            
            export const actualizarPropiedadGet = async(req, res) => {
            
                try {
                    const propiedadActualizado = await Propiedades.findById(req.params.id).lean()//lean vuelve un obj de js
                res.render('actualizar', {propiedadActualizado});
            
                } catch (error) {
                    console.log(error.message)
                }
                
            
            }

