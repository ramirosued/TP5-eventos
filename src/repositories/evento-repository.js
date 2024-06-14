import config from '../config/dbConfig.js';
import pkg from 'pg'
const { Client } = pkg;
const client = new Client(config);

await client.connect();

export default class EventosRepository {
//3
    searchAsync = async (params) => {
            const client = new Client(config);
            await client.connect();
            
            try {
            let sql = `SELECT e.* FROM events as e INNER JOIN event_categories as ec ON e.id_event_category = ec.id INNER JOIN event_tags et ON e.id = et.id_event INNER JOIN tags as t on t.id = et.id_tag`;
            const values = [];
            const conditions = [];
            
            if (params.name) {
            conditions.push(`e.name ILIKE $${values.length + 1}`);
            values.push(`%${params.name}%`);
            }
                        
            if (params.category) {
            conditions.push(`ec.name ILIKE $${values.length + 1}
            `);
            values.push(`%${params.category}%`);
            }
            
            if (params.startdate) {
            conditions.push(`e.start_date = $${values.length + 1}`);
            values.push(params.startdate);
            
            }
            
            if (params.tag) {
            conditions.push(`t.name ILIKE $${values.length + 1} `);
            values.push(`%${params.tag}%`);
            }
            
            if (conditions.length > 0) {
            sql += ` WHERE ${conditions.join(' AND ')}`;
            }
            
            const result = await client.query(sql, values);
            return result.rows;
            } finally {
            await client.end();
            }
    }
    
//4
    buscarEventoById = async (id) => {
        let sql = 'SELECT * FROM events WHERE id = $1'; 
        const values = [id];
        let result = await client.query(sql, values); 
        await client.end(); 
        console.log(result.rows[0]);

        return (result.rows);
    }
    

}
