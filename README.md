# DesafioSecretariaSn

Este es un proyecto de login y registro desarrollado con Node.js, Express y React. Permite a los usuarios registrarse, iniciar sesión y acceder a una página de bienvenida.

## Características

- Registro de usuarios con validación de campos.
- Inicio de sesión con autenticación de contraseñas encriptadas.
- Roles de usuario: "Usuario" y "Administrador".

## Requisitos previos

-Node.js (v14.17.0 o superior)
-NPM (v7.20.0 o superior)
-MySQL (v8.0 o superior)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega a la carpeta raíz del proyecto.

### Configuración del servidor

3. En la carpeta `backend`, crea un archivo `.env` y configura las siguientes variables de entorno:

DB_HOST=localhost
DB_USER=tu_usuario_de_mysql
DB_PASSWORD=tu_contraseña_de_mysql
DB_DATABASE=login-register

4. instala las dependencias:
"npm install"
    
5. Inicia el servidor:
"npm start"
El servidor estará disponible en http://localhost:5000.

## Configuración del cliente
6. En la carpeta frontend, crea un archivo .env y configura la variable de entorno:

REACT_APP_API_URL=http://localhost:5000

7. instala las dependencias:
"npm install"

9. Inicia la aplicación de React:
"npm start"
La aplicación de React estará disponible en http://localhost:3000.

### Uso
Abre tu navegador y accede a http://localhost:3000 para ver la interfaz de usuario.


### Script para la creacion de la base de datos:
Script de la base de datos
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(100) DEFAULT NULL,
  `rol` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

