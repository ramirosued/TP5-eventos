import config from '../config/dbConfig.js';
import pkg from 'pg'
const { Client } = pkg;
const client = new Client(config);

await client.connect();


export default class ProvinceRepository {
todasLasProvincias = async () => {
    let sql = `SELECT * FROM provinces`;
    let result = await client.query(sql);
    console.log(result.rows);
    return result.rows;
    
    }

    provinciaById = async (id) => {
        let sql = 'SELECT * FROM provinces WHERE id = $1'; 
        const values = [id];
        let result = await client.query(sql,values);
        return result.rows;
        
        }

        createProvincia = async (body) => {
          try{
            let name = body.name;
            let full_name = body.full_name;
            let latitude = body.latitude;
            let longitude = body.longitude;
            let display_order = body.display_order;
            let sql = `INSERT INTO provinces (latitude, longitude, display_order, name, full_name) 
            values($1, $2, $3, $4, $5)`; 
            const values = [latitude,longitude,display_order,name,full_name];
             const result = await client.query(sql,values);
             return ["Opercion exictosa",201]
            }catch(error){
                return["No se pudo crear",404];
            }
        }
        
           
}
