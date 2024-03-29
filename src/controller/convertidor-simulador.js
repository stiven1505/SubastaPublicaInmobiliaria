export const convertirMoneda =  async (req, res) => {
    const monedaDe = req.body['moneda-de'];
    const monedaA = req.body['moneda-a'];
    const cantidadDe = parseFloat(req.body['cantidad-de']);
  
    // Hacer una solicitud a la API de conversión de moneda para obtener la tasa de conversión actual
    const url = `https://api.exchangerate-api.com/v4/latest/${monedaDe}`;
    const response = await fetch(url);
    const data = await response.json();
  
    // Obtener la tasa de conversión de la moneda de origen a la moneda de destino
    const tasaDeCambio = data.rates[monedaA];
  
    // Calcular la cantidad convertida
    const cantidadA = cantidadDe * tasaDeCambio;
  
    // Renderizar la vista de conversión de moneda con la cantidad convertida
    res.render('convertidor', { cantidadConvertida: cantidadA });
  }



  export const simuladorCredito =async (req, res) => {
    const monto =parseFloat( req.body['monto']);
    const interes = parseFloat(req.body['interes']);
    const plazoAnual= parseFloat(req.body['plazo']);
    const plazoMensual= plazoAnual*12;

    const TNA = interes/100;//TNA: tasa nominal anual
    const TEA = Math.pow(1 + TNA / 12, 12) - 1;
    const TEAporcentaje = TEA*100; //Tasa efectiva anual 
    const TEM = Math.pow(1 + TEA, 1/12) - 1; //TEM tasa efectiva mensual
    const TEMporcentaje = TEM*100;
  
    //const cuotaMensual =(monto *(TEM *(1+TEM)*plazoMensual))/((1+TEM)*plazoMensual)-1
  
    const cuotaMensual = monto * (TEM * Math.pow(1 + TEM, plazoMensual)) / (Math.pow(1 + TEM, plazoMensual) - 1);
    const pagoTotal=cuotaMensual*plazoMensual;
  
    
  
    // Renderizar la vista de conversión de moneda con la cantidad convertida
    res.render('simuladorCredito', { 
      monto:monto,
      interes:interes,
      plazoAnual:plazoAnual,
      plazoMensual:plazoMensual,
      TEA: TEAporcentaje,
      TEM: TEMporcentaje,
      pagoTotal:pagoTotal,
      pagoMensual: cuotaMensual,
    });
  }

  export const pageConvertidor = (req,res)=>res.render('convertidor',{title:'SPI - Convertidor'})

  export const pageSimulador = (req, res) => {
 res.render('simuladorCredito');
  }