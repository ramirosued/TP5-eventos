import config from '../config/dbConfig.js';
import pkg from 'pg'
const { Client } = pkg;
const client = new Client(config);

await client.connect();


export default class ProvinceRepository {
    // 7
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
        let resArray;

        try{
            let nombre = body.name;
            let full_nombre = body.full_name;
            let latitud = body.latitude;
            let longitud = body.longitude;
            let display_orden = body.display_order;
            const sql = `
                INSERT INTO provinces
                    (name, full_name, latitude, longitude, display_order)
                VALUES
                    ($1,$2,$3,$4,$5)`;
            const values = [nombre, full_nombre, latitud, longitud,display_orden];
            const result = await client.query(sql, values);
            if(result.rowCount) resArray=["created",200]
            else{
                resArray=["No se pudo crear",404]
            }
            }
            catch (error){
                resArray = ["No se pudo crear la provincia",404];

            }
        return resArray
    }

        
        ModificarProvincia = async (body) => {
            let result;
            let resArray;
            
            const sql1 = `SELECT id from provinces WHERE id=$1`;
            const valuesID = [body.id];
            const resultID = await client.query(sql1, valuesID);
        
            if (body.name === "" || body.name.length <= 3 || body.full_name === undefined || body.latitude === undefined || body.longitude === undefined || body.display_order === undefined) {
                resArray = ["No cumple con las reglas de negocio", 400];
            } else if (resultID.rows.length < 1) { 
                resArray = ["Provincia no encontrada", 404];
            } else {
                const { name, full_name, latitude, longitude, display_order } = body;
                const id = body.id; 
                const sql = `UPDATE provinces 
                             SET latitude = $1, longitude = $2, display_order = $3, name = $4, full_name = $5 
                             WHERE id = $6`;
                const values = [latitude, longitude, display_order, name, full_name, id];
                result = await client.query(sql, values);
                resArray = ["Provincia actualizada correctamente", 200];
            }
            
            return resArray;
        }

    
        elimianrProvincia = async (id) => {
            let resArray;
            const valuesID = [parseInt(id)];
            try
            {
                let sql2 = `DELETE FROM provinces WHERE id=$1`
                let result = await client.query(sql2, valuesID)
                if(result.rowCount) resArray = ["Provincia eliminada correctamente",200];
                else {
                    resArray = ["Provincia no encontrada",404];
                }
            }
            catch(error)
            {
                resArray = ["Provincia no encontrada",404];
                console.log(error);
            }
            
            return resArray;
        
        }
    }        
     

