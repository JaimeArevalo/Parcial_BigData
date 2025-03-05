// PARCIAL PRIMER CORTE BIGDATA

// 1. Obtener datos de la API pública de Premios Nobel
// 2. Guardar los datos en MongoDB
// 3. Crear una visualización con los datos


const axios = require('axios');
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

// Configuración de la conexión a MongoDB Atlas
const uri = "mongodb+srv://jajserman3521:MJsXfxlt5TiboXIE@cluster0.5pckf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const dbName = "nobel_prizes";
const collectionName = "laureates";

// Función para obtener datos de la API de Premios Nobel
async function fetchNobelData() {
  try {
    // Usamos la API pública de nobelprize.org que proporciona datos oficiales
    const response = await axios.get('http://api.nobelprize.org/v1/laureate.json');
    return response.data.laureates;
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    throw error;
  }
}

// Función para guardar datos en MongoDB
async function saveToMongoDB(data) {
  try {
    await client.connect();
    console.log('Conectado correctamente a MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Limpiamos la colección antes de insertar nuevos datos
    await collection.deleteMany({});
    
    // Insertamos los datos
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documentos insertados en MongoDB`);
    
    return result;
  } catch (error) {
    console.error('Error al guardar en MongoDB:', error);
    throw error;
  }
}

// Función para obtener estadísticas para la visualización
async function getNobelStatistics() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Agregación para contar premios por categoría
    const categoryCounts = await collection.aggregate([
      { $unwind: "$prizes" },
      { $group: { _id: "$prizes.category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    
    // Agregación para contar premios por país
    const countryCounts = await collection.aggregate([
      { $match: { "bornCountry": { $exists: true, $ne: "" } } },
      { $group: { _id: "$bornCountry", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 } // Top 10 países
    ]).toArray();
    
    // Agregación para contar premios por década
    const decadeCounts = await collection.aggregate([
      { $unwind: "$prizes" },
      { $match: { "prizes.year": { $exists: true, $ne: "" } } },
      { 
        $group: { 
          _id: { 
            $concat: [
              { $substr: ["$prizes.year", 0, 3] }, 
              "0s"
            ] 
          }, 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    
    return {
      categoryCounts,
      countryCounts,
      decadeCounts
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
}

// Crear servidor express para servir la visualización
const app = express();
app.use(cors());
app.use(express.static('public'));

// Ruta para obtener los datos para la visualización
app.get('/api/nobel-data', async (req, res) => {
  try {
    const statistics = await getNobelStatistics();
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Añadir redirección para la ruta /cases
app.get('/cases', (req, res) => {
  res.redirect('/');
});

// Función principal
async function main() {
  try {
    console.log('Obteniendo datos de la API de Premios Nobel...');
    const nobelData = await fetchNobelData();
    console.log(`Obtenidos ${nobelData.length} laureados de Premios Nobel`);
    
    console.log('Guardando datos en MongoDB...');
    await saveToMongoDB(nobelData);
    
    // Iniciar el servidor para la visualización
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
      console.log('Accede a http://localhost:3000 para ver la visualización');
    });
  } catch (error) {
    console.error('Error en la ejecución principal:', error);
  } finally {
    // No cerramos la conexión porque la necesitamos para el servidor
  }
}

// Ejecutar el programa
main();