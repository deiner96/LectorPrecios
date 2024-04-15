 function ConsultarProducto(ean) {
    var ean = document.getElementById('Product').value;
    if (!ean) {
      console.log('Falta información obligatoria.');
      return;
    }else{
        try {
          send('FindProducto', ean);
        } catch (error) {
          console.error('Error al enviar la solicitud:', error);
          return;
        }
  
      electronAPI.receive('FindProductoResult', (data) => {
        
        if(data.error){
          console.log('El producto NO existe. ');
          return;
        }else if (data) {
          eanExiste = true;
          console.log('El producto  existe. ');
  
          const formattedData = JSON.stringify(data, null, 2);
          const parsedData = JSON.parse(formattedData);
         
          const producto = parsedData.producto;
          const descripcion = parsedData.descripcion;
          const precio = parsedData.precio;
          const cantidad = parsedData.cantidad;
          const id = parsedData.idProducto;
          $("#producto").html(producto);
          $("#cantProducto").html(cantidad);
          $("#costProducto").html(precio);
          $("#detalleProducto").html(descripcion);
        }
      });
    }    
     
  }