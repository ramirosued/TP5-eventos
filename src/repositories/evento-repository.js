import config from '../config/dbConfig.js';
import pkg from 'pg'
const { Client } = pkg;
const client = new Client(config);

await client.connect();

export default class EventosRepository {
    buscarEvento = async (name, category, date, tag) => {

        let sql = 'SELECT * FROM events '; // Inicializa la consulta SQL

        // Agrega condiciones a la consulta SQL basadas en los parámetros proporcionados
        const params = [];
        if (name) {
            sql += ' AND name ILIKE $1';
            params.push(`%${name}%`);
        }
        if (category) {
            sql += ' AND category ILIKE $2';
            params.push(`%${category}%`);
        }
        if (date) {
            sql += ' AND start_date = $3';
            params.push(date);
        }
        if (tag) {
            sql += ' AND tags ILIKE $4';
            params.push(`%${tag}%`);
        }

        // Ejecuta la consulta SQL con los parámetros correspondientes
        const result = await client.query(sql, params);
        console.log('Consulta SQL:', sql, 'Parámetros:', params);

        // Devuelve los resultados de la consulta
        return result.rows;
    }

    buscarEventoById = async (id) => {
        let sql = 'SELECT * FROM events WHERE id = $1'; 
        const values = [id];
        console.log(id);
        let result = await client.query(sql, values); 
        await client.end(); 
        console.log(result.rows[0]);

        return (result.rows);
    }
    

}
