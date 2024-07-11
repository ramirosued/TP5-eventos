import pkg from 'pg'
import config from '../config/dbConfig.js';
import jwt from 'jsonwebtoken';
import {token} from '../repositories/user-repository.js';
const { Client } = pkg
const client = new Client(config);

await client.connect();
export default class LocationRepository {
    
    getAllLocations = async () => {
    const client = new Client(config);
    await client.connect();  
        try{
        let sql = `select l.Id,l.name,p.*,l.latitude,l.longitude from locations l inner join provinces p on l.Id_province = p.Id`;
        let result = await client.query(sql)
        const Location = result.rows;
        return  [Location,200];
       }catch(error){
        return  ["No se encontraron ubicaciones",400];
       }
       
    }
    getByIdAsync = async (id) => {
    const client = new Client(config);
    await client.connect();  
        try{
            let sql = `select locations.* , provinces.* from locations 
            inner join provinces on locations.Id_province = provinces.Id 
            where locations.Id=$1`;
            const values = [id];
            let result = await client.query(sql, values)
            if(result.rows==''){
                return["Ubicacion no encontrada", 400]
            }else{
                return[result.rows,200]
            }
        }catch(error) {
            return [error.message,400]
        }
    }
    getLocationByIdAsync = async (id) => {
        
        const secretKey = "ClaveSecreta3000$";
        let validacionToken = token; 
        let payloadOriginal = null;
        let resArray;
        try{
            payloadOriginal = await jwt.verify(validacionToken,secretKey);
            if(payloadOriginal != null){
                let sql = `select event_locations.* from locations inner join event_locations on locations.id = event_locations.id_location WHERE locations.id=$1`;
                const values = [id];
                let result = await client.query(sql, values)
                const Location = result.rows;
                if (Location != '') {
            
                    resArray = [Location,200];;
                } else {
                resArray = ["Ubicacion no encontrada",404];
                }
            }
            else{
                console.log("hola");
            resArray = ["Unauthorized",401];
            }
            
        }catch(e){
            console.log("holaaaaa");
            resArray = ["Unauthorized",401];
        }
        
        return resArray;
        
    }
}