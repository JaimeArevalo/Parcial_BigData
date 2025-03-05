# 🏆 Visualización de Premios Nobel

[![Node.js](https://img.shields.io/badge/Node.js-v14.0%2B-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/cloud/atlas)
[![Chart.js](https://img.shields.io/badge/Chart.js-v3.7.1-blue.svg)](https://www.chartjs.org/)

Aplicación web para visualizar estadísticas sobre los ganadores del Premio Nobel, utilizando una API pública, MongoDB y Chart.js.

![Vista previa de la aplicación](https://via.placeholder.com/800x400?text=Vista+Previa+Nobel+Prizes)

## ✨ Características

- **Obtención de datos**: Extrae información actualizada desde la API oficial de Premios Nobel.
- **Almacenamiento en MongoDB**: Guarda los datos en una base de datos MongoDB (local o Atlas).
- **Visualizaciones interactivas**:
  - 📊 Distribución de Premios Nobel por categoría (gráfico circular)
  - 🌍 Top 10 países con más Premios Nobel (gráfico de barras)
  - 📈 Evolución de Premios Nobel por década (gráfico de línea)
- **Interfaz responsive**: Adaptable a diferentes tamaños de pantalla.

## ⚙️ Requisitos previos

- [Node.js](https://nodejs.org/) (v14 o superior)
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o instalación local de MongoDB
- Un navegador web moderno

## 📂 Estructura del proyecto

```
proyecto-nobel/
│
├── app.js                   # Archivo principal con la lógica del servidor y MongoDB
│
├── package.json             # Configuración de dependencias
│
├── node_modules/            # Carpeta generada al instalar dependencias (no incluida en el repositorio)
│
└── public/                  # Carpeta para archivos estáticos
    └── index.html           # Página web con las visualizaciones
```

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/visualizacion-nobel.git
cd visualizacion-nobel
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar la conexión a MongoDB**

Edita `app.js` y actualiza la URI de conexión según corresponda:

```javascript
// Para MongoDB Atlas
const uri = "mongodb+srv://usuario:contraseña@cluster.mongodb.net/?retryWrites=true&w=majority";

// Para MongoDB local
// const uri = "mongodb://localhost:27017";
```

## ▶️ Uso

1. Iniciar la aplicación:

```bash
node app.js
```

2. Abrir en el navegador:

```
http://localhost:3000
```

**Acciones automáticas:**
- Conexión a la API de Premios Nobel
- Obtención y procesamiento de datos
- Almacenamiento en MongoDB
- Visualización interactiva en el navegador

## 🔌 API y endpoints

- **GET /** → Página principal con visualizaciones
- **GET /api/nobel-data** → Endpoint que proporciona estadísticas procesadas para las gráficas

## 🛠️ Tecnologías utilizadas

### Backend
- Node.js
- Express
- MongoDB (driver oficial de Node.js)
- Axios (para peticiones HTTP)

### Frontend
- HTML5 / CSS3
- Chart.js (para visualizaciones)
- JavaScript vanilla

## 🎨 Personalización

### Cambiar el estilo visual
Edita la sección `<style>` en `public/index.html`.

### Añadir más visualizaciones
1. Agrega un nuevo contenedor en `public/index.html`
2. Crea una nueva función de agregación en `app.js` dentro de `getNobelStatistics()`
3. Implementa la visualización en el JavaScript de `index.html`

### Cambiar la fuente de datos
Modifica la función `fetchNobelData()` en `app.js` para conectarla a otra API.

## ❓ Resolución de problemas

### No se conecta a MongoDB
- Verifica la URI de conexión
- Asegúrate de que tu IP esté permitida en MongoDB Atlas
- Comprueba los permisos del usuario

### No se muestran los gráficos
- Revisa la consola del navegador en busca de errores
- Confirma que la API de Premios Nobel está activa
- Verifica la estructura de los datos en MongoDB
