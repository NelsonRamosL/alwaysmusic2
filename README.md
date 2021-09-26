Readme 

Base de datos!!!

CREATE DATABASE musica;
\c musica;

CREATE TABLE estudiantes(
id  SERIAL PRIMARY KEY,
nombre VARCHAR(50),
rut VARCHAR(20),
curso VARCHAR(50),
nivel VARCHAR(50)
);


Comandos iguales al ejercicio anterior alwaysmusic y se agrega Consultar listado de alumnos en formato arreglo....


ejemplo 

para ingresar dato por consola
node .\index.js 'nuevo' 'Nelson Ramos' '132334443-4' 'guitarra' 3


para buscar por rut
node .\index.js 'rut' '132334443-4'


para consultar todos los datos de la tabla
node .\index.js consulta


para modificar por nombre
node .\index.js 'editar' 'nelson' '666666-4' 'poker' 3


para eliminar 
node .\index.js 'eliminar' '132334443-4'


Consultar listado de alumnos en formato arreglo
node .\index.js consultaArreglo