const db = require('../config/db');

function findProducto(ean, callback) {
  
  db.getConnection((error, connection) => {
    if (error) {
      console.error("Error al obtener conexión de la base de datos:", error);
      return callback(error, null);
    }

    const query = `SELECT idProducto, producto, descripcion, precio, cantidad FROM LPRECIOS WHERE idProducto = ?`;

    connection.query(query, [ean], (error, results) => {
      if (error) {
        console.error("Error al ejecutar la consulta:", error);
        connection.release(); // Release the connection in case of an error
        return callback(null, true);
      }

      if (results.length > 0) {        
        console.log("Producto existente. CONSULTADO.");
        const producto = results[0].producto;
        const descripcion = results[0].descripcion;
        const precio = results[0].precio;
        const cantidad = results[0].cantidad;
        const idProducto = results[0].idProducto;

        return callback(null, true, producto, descripcion, precio, cantidad, idProducto);
      
      }else{
        connection.release();
        return callback(error, null)

      }
    });
  });
}

module.exports = { findProducto };
