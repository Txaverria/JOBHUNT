# JOBHUNT

<p align="left">
      <img
        src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"
        alt="HTML5"
      />
      <img
        src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"
        alt="CSS3"
      />
      <img
        src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
        alt="JavaScript"
      />
      <br />
      <img
        src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
        alt="Node.js"
      />
      <img
        src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"
        alt="Redis"
      />
      <img
        src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"
        alt="Express.js"
      />
      <img
        src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"
        alt="MongoDB"
      />
      <img
        src="https://img.shields.io/badge/MongoDB%20Atlas-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white"
        alt="MongoDB Atlas"
      />
      <img
        src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white"
        alt="Mongoose"
      />
    </p>

## Descripción del Proyecto

El proyecto tiene como objetivo desarrollar una aplicación web utilizando tecnologías de back-end y front-end basadas en principios de programación orientada a objetos (POO). La plataforma conectará a empleadores con solicitantes de empleo, permitiendo la publicación de ofertas de trabajo y la búsqueda de oportunidades laborales.

## Características

- **Roles de Usuario**:

  - **Buscadores de Empleo**: Pueden buscar empleos, crear perfiles y postularse a ofertas de trabajo.
  - **Empleadores**: Pueden publicar ofertas de empleo, administrar candidatos y actualizar sus perfiles de empresa.
  - **Administradores**: Pueden gestionar todos los usuarios y moderar las publicaciones de trabajo.

- **Autenticación y Autorización**:

  - Registro de usuarios e inicio de sesión.
  - Control de acceso basado en roles.

- **Ofertas de Trabajo**:

  - Creación, edición y eliminación de ofertas de empleo.
  - Información detallada sobre cada oferta: título, descripción, salario, ubicación y tipo de trabajo (tiempo completo, tiempo parcial, etc.).

- **Búsqueda y Filtrado**:

  - Los solicitantes pueden buscar trabajos por título, ubicación, salario y tipo.
  - Opciones de filtrado para refinar resultados.

- **Proceso de Solicitud de Empleo**:

  - Carga de currículums y cartas de presentación.
  - Los empleadores pueden revisar y descargar solicitudes.

- **Perfiles de Usuario**:

  - Perfiles para solicitantes con datos básicos y preferencias laborales.
  - Perfiles para empleadores con detalles de la empresa.

- **Panel de Administración**:

  - Administración de usuarios y publicaciones.
  - Moderación de ofertas de trabajo.

- **Optimización con Redis:**
  - Cacheo de datos frecuentes como usuarios y ofertas de trabajo.
  - Mejora significativa del rendimiento en búsquedas y consultas repetitivas.

## Tecnologías Utilizadas

- **Front-end**:

  - HTML5
  - CSS3
  - JavaScript (POO)

- **Back-end**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Redis (caching)

## Instrucciones de Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/Txaverria/JOBHUNT.git
   cd Proyecto-TWEB-09
   ```

2. **Instalar las dependencias**:

   Asegúrate de tener **Node.js** y **npm** instalados. Luego, ejecuta:

   ```bash
   npm install
   ```

3. **Configuración de la base de datos**:

   - Crea una base de datos en **MongoDB** (puedes usar **MongoDB Atlas** para una base de datos en la nube).
   - Configura la URI de conexión en un archivo .env ubicado en /api/:

   ```env
   MONGO_URI=tu_cadena_de_conexion_mongodb
   ```

4. **Configurar Redis:**

- Instala Redis en tu máquina local o usa un servidor Redis en la nube.
- Asegúrate de que Redis esté corriendo. Si estás usando WSL:

```bash
 redis-server
```

- Opcionalmente, configura el host y puerto en el archivo .env:

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

5. **Ejecutar la aplicación:**:

Abre tu navegador y ve a http://localhost:3000 (o el puerto que hayas configurado).

```bash
cd api
npm start
```

6. **Acceder a la aplicación:**

Abre tu navegador y ve a http://localhost:3000 (o el puerto que hayas configurado).

7. **Uso**:

   Este proyecto ofrece las siguientes funcionalidades:

   - **Registro de usuarios**:  
     Los usuarios pueden registrarse y seleccionar su rol: **solicitante de empleo** o **empleador**.

   - **Publicar y buscar trabajos**:

     - Los **empleadores** pueden publicar ofertas de trabajo.
     - Los **solicitantes** pueden buscar ofertas y postularse a ellas.

   - **Panel de administración**:  
     Los **administradores** pueden gestionar usuarios y publicaciones de forma eficiente.

## Integrantes del Proyecto

- Isaac Chavarría
- Kevin Liu
- Triani Yuan

---

Proyecto para el curso **TWEB-09 - Programación Web Orientada a Objetos 2024 C3**.
