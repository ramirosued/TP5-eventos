import config from '../config/dbConfig.js';
import pkg from 'pg'
const { Client } = pkg;
const client = new Client(config);
await client.connect();


export default class ProvinceRepository {
todasLasProvincias = async () => {
    let sql = `SELECT * FROM provinces`;
    let result = await client.query(sql);
    await client.end();
    console.log(result.rows);
    return result.rows;
    
    }


}
