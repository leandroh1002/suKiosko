const xlsx = require('xlsx');
const { Producto, Rubro, UnidadMedida } = require('../../db'); // Asegúrate de que db.js exporte los modelos

const uploadProductos = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const results = {
      updated: [],
      created: [],
      errors: [],
    };

    for (const row of data) {
      try {
        const {
          nombre,
          redondeo,
          precio_compra,
          stock,
          unidad_medida, // Nombre de la unidad de medida en el Excel
          rubro, // Nombre del rubro en el Excel
          codigo_barra,
          descripcion,
          vencimiento,
        } = row;

        if (!nombre || !precio_compra || !unidad_medida || !rubro) {
          results.errors.push({ row, message: 'Faltan campos obligatorios (nombre, precio_compra, unidad_medida, rubro).' });
          continue;
        }

        let existingProduct = null;
        if (codigo_barra) {
          existingProduct = await Producto.findOne({ where: { codigo_barra } });
        } else {
          existingProduct = await Producto.findOne({ where: { nombre } });
        }

        // Buscar o crear Rubro
        let rubroInstance = await Rubro.findOne({ where: { nombre: rubro } });
        if (!rubroInstance) {
          rubroInstance = await Rubro.create({ nombre: rubro });
        }

        // Buscar o crear UnidadMedida
        let unidadMedidaInstance = await UnidadMedida.findOne({ where: { nombre: unidad_medida } });
        if (!unidadMedidaInstance) {
          // Si no existe, se crea con valores por defecto. Podrías querer una lógica más robusta aquí.
          unidadMedidaInstance = await UnidadMedida.create({ nombre: unidad_medida, simbolo: unidad_medida.substring(0, 3).toUpperCase(), factor_conversion: 1.0 });
        }

        const productData = {
          nombre,
          redondeo: redondeo || 0, // Valor por defecto si no se proporciona
          precio_compra,
          stock: stock !== undefined && stock !== null && stock > 0 ? stock : (existingProduct ? existingProduct.stock : 0), // Lógica para el stock
          unidad_medida_id: unidadMedidaInstance.id,
          rubro_id: rubroInstance.id,
          codigo_barra: codigo_barra || null,
          descripcion: descripcion || null,
          vencimiento: vencimiento || null,
        };

        console.log(productData, "productData");
        

        if (existingProduct) {
          // Si el producto existe, actualizar
          if (stock !== undefined && stock !== null && stock > 0) {
            productData.stock = parseFloat(existingProduct.stock) + parseFloat(stock);
          } else {
            productData.stock = existingProduct.stock; // Mantener el stock existente si el del excel es 0 o vacío
          }
          await existingProduct.update(productData);
          results.updated.push(existingProduct);
        } else {
          // Si el producto no existe, crear uno nuevo
          const newProduct = await Producto.create(productData);
          results.created.push(newProduct);
        }
      } catch (error) {
        results.errors.push({ row, message: error.message });
      }
    }

    res.status(200).json({
      message: 'Procesamiento de productos completado.',
      summary: `Actualizados: ${results.updated.length}, Creados: ${results.created.length}, Errores: ${results.errors.length}`,
      details: results,
    });

  } catch (error) {
    console.error('Error al procesar el archivo Excel:', error);
    res.status(500).json({ message: 'Error interno del servidor al procesar el archivo.', error: error.message });
  }
};

module.exports = uploadProductos;
