markdown
Copiar código
# Colegio SENA - Sistema de Gestión de Estudiantes

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de estudiantes en un entorno educativo. Fue desarrollado con **React** y **Vite** y está diseñado para ser utilizado por un administrador para gestionar estudiantes en el **Colegio SENA**. El sistema permite agregar, leer, actualizar y eliminar registros de estudiantes a través de una interfaz de usuario simple e intuitiva.

## Requisitos

- **Node.js**: Se necesita tener instalado [Node.js](https://nodejs.org/) en tu máquina.
- **Vite**: Utiliza [Vite](https://vitejs.dev/) como entorno de desarrollo.
- **Backend**: Asegúrate de tener el backend del Colegio configurado que exponga las rutas para gestionar estudiantes. El backend debe estar especificado en el archivo `.env` como `VITE_APP_BACK`.

## Características

- **Agregar Estudiantes**: Permite al administrador agregar un nuevo estudiante con su nombre, correo electrónico y grado.
- **Listar Estudiantes**: Muestra una lista de los estudiantes registrados en el sistema.
- **Actualizar Estudiantes**: El administrador puede editar la información de un estudiante existente.
- **Eliminar Estudiantes**: Permite al administrador eliminar un estudiante del sistema.
- **Validaciones**: Cada formulario cuenta con validaciones básicas para asegurar que se ingresen datos válidos.

## Instalación

Sigue los siguientes pasos para ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. **Instala las dependencias:**
    ```bash
    cd tu_repositorio
    npm install
    ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con la siguiente variable:
    ```
    VITE_APP_BACK=http://localhost:5000
    ```
   Reemplaza `http://localhost:5000` por la URL de tu backend, levantado en algun servidor.

4. **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5. **Accede a la aplicación:**
   Abre tu navegador y visita `http://localhost:5173` para acceder a la aplicación.

## Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

## Scripts Disponibles

En este proyecto, puedes ejecutar los siguientes scripts:

- **`npm run dev`**: Ejecuta el servidor de desarrollo.
- **`npm run build`**: Crea una versión optimizada del proyecto para producción.
- **`npm run preview`**: Previsualiza la versión de producción localmente.

