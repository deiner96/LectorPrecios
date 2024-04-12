 function ConsultarProducto(ean, callback) {
    var ean = document.getElementById('Product').value;
    if (!ean) {
      console.log('Falta información obligatoria.');
      callback(null);
      return;
    }else{
        try {
          send('FindProducto', ean);
        } catch (error) {
          console.error('Error al enviar la solicitud:', error);
          callback(null);
          return;
        }
  
      electronAPI.receive('FindProductoResult', (data) => {
        
        if(data.error){
          console.log('El producto NO existe. ');
          InputValue.value = '';
          eanExiste = false;
          isAddingProduct = false;
          callback(null);
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
          const idProducto = parsedData.idProducto;
  
          callback({
            producto: producto,
            descripcion: descripcion,
            precio: precio,
            cantidad: cantidad,
            idProducto:idProducto
          });
        }
      });
    }    
     
  }