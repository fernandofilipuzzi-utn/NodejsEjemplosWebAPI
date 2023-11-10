const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas
app.use(cors());


// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

/**
 * @swagger
 * /api/hola-mundo:
 *   post:
 *     summary: Saluda al mundo
 *     description: Devuelve un saludo personalizado con el nombre proporcionado.
 *     tags:
 *       - Hola Mundo
 *     requestBody:
 *       description: Nombre para el saludo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Saludo generado con éxito
 *         content:
 *           application/json:
 *             example:
 *               saludo: "Hola {nombre}!"
 */
app.post('/api/hola-mundo', (req, res) => {
  try {
    console.log(req.body);
    const nombre = req.body.nombre;
    const saludo = `Hola ${nombre}!`;

    res.json({ saludo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Hola Mundo',
      version: '1.0.0',
      description: 'Una API para saludar al mundo',
    },
  },
  apis: [__filename], // Especifica el archivo donde tienes tus rutas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
