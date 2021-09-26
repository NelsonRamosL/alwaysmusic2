/**
* En este desafío deberás ocupar la clase Pool definiendo sus diferentes propiedades,
capturar los posibles errores en el proceso de conexión con la base de datos y realizar las
siguientes consultas, usando textos parametrizados y Prepared Statement:
*/
const { Pool } = require("pg");

/** 
1. Realizar la conexión con PostgreSQL, utilizando la clase Pool y definiendo un
máximo de 20 clientes, 5 segundos como tiempo máximo de inactividad de un
cliente y 2 segundos de espera de un nuevo cliente.
*/


// configuracion de los datos en .env
const dotenv = require("dotenv").config();
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    max: process.env.DB_max,
    min: process.env.DB_min,
    idleTimeoutMillis: process.env.DB_idleTimeoutMillis,
    connectionTimeoutMillis: process.env.DB_connectionTimeoutMillis,
};

// captura datos del terminal
const argumentos = process.argv.slice(2);
let opcion = argumentos[0];
let dato1 = argumentos[1];
let dato2 = argumentos[2];
let dato3 = argumentos[3];
let dato4 = Number(argumentos[4]);

// Instanciar pool 
const pool = new Pool(config);


//conectar
pool.connect((error_conexion, client, release) => {
    try {
        /**  
        2. Hacer todas las consultas con un JSON como argumento definiendo la propiedad
        name para el Prepared Statement.
        3. Hacer las consultas con texto parametrizado.
      
        5. Capturar los posibles errores en todas las consultas.
        */

        if (opcion == "nuevo") {
            console.log("entrando en nuevo");
            async function ingresar(dato1, dato2, dato3, dato4) {
                const SQLQuery = {
                    text: "insert into estudiantes (nombre,rut, curso, nivel) values ($1, $2, $3,$4) RETURNING *;",
                    values: [dato1, dato2, dato3, dato4],
                };
                console.log(SQLQuery);
                try {
                    const res = await client.query(SQLQuery);

                    console.log(res);
                    console.log(`Estudiante ${dato1} agregado con exito`);
                } catch (error) {
                    console.log(error);
                }

                // client.end();
            }
            ingresar(dato1, dato2, dato3, dato4);
        }



        if (opcion == "rut") {

            async function consultarRut(rut) {

                const SQLQuery = {
                    text: "SELECT * FROM estudiantes WHERE rut=$1 RETURNING *;",
                    values: [rut],
                };
                console.log(SQLQuery);
                try {
                    const res = await client.query(SQLQuery);
                    console.log(res.rows);
                } catch (error) {
                    console.log("en error");
                    console.log(error);
                }


            }
            consultarRut(dato1);
        }

        if (opcion == "consulta") {
            async function consulta() {
                try {
                    const res = await client.query(
                        "SELECT * FROM estudiantes"
                    );

                    console.log(res.rows);

                } catch (error) { console.log(error); }


            }
            consulta();
        }



        if (opcion == "editar") {
            async function editar(nombre, rut, curso, nivel) {
                const SQLQuery = {
                    text: "UPDATE estudiantes SET rut = $1, curso = $2, nivel = $3 WHERE nombre = $4 RETURNING *;",
                    values: [rut, curso, nivel, nombre],
                };

                try {
                    const res = await client.query(SQLQuery);
                    console.log(res.rows);
                    console.log(`Estudiante ${nombre} editado con éxito`);

                } catch (error) { console.log(error); }

            }
            editar(dato1, dato2, dato3, dato4);
        }


        if (opcion == "eliminar") {
            async function eliminar(rut) {
                const SQLQuery = {
                    text: "DELETE FROM estudiantes WHERE rut=$1 RETURNING *;",
                    values: [rut],
                };

                try {
                    const res = await client.query(SQLQuery);
                    console.log(`Registro de estudiante con rut ${rut} eliminado`);

                } catch (error) { console.log(error); }

            }
            eliminar(dato1);

        }


        /**
        7. Obtener el registro de los estudiantes registrados en formato de arreglos.
         */
        if (opcion == "consultaArreglo") {
            async function consultaArreglo() {
                const SQLQuery = {
                    rowMode: 'array',
                    text: "SELECT * FROM estudiantes",
                };
                try {
                    const res = await client.query(SQLQuery);
                    console.log(res.rows);

                } catch (error) { console.log(error); }

            }
            consultaArreglo();
        }




        // 6. Retornar por consola un mensaje de error en caso de haber problemas de conexión.
    } catch (error_conexion) { console.log(error_conexion); }

    /**
     *   4. Liberar a un cliente al concluir su consulta.
   */
    release();
})










