import pkg from 'pg'
import jwt from 'jsonwebtoken';
import {token} from '../repositories/user-repository.js';
import config from '../config/dbConfig.js';
const { Client } = pkg
const client = new Client(config);

await client.connect();
export default class EventLocationRepository {
    
    getAllAsync = async () => {
        try{
        
        const secretKey = "ClaveSecreta3000$";
        let validacionToken = token; 
        let payloadOriginal = null;
        payloadOriginal = await jwt.verify(validacionToken,secretKey);
        if(payloadOriginal != null){
        let sql = `SELECT el.id, l.* , el.name, el.full_address, el.max_capacity, el.latitude, el.longitude, u.*
        FROM public.event_locations el inner join locations l on l.id = el.id_location inner join users u on u.id = el.id_creator_user`;
        let result = await client.query(sql)
        const eventLocation = result.rows;
        return [eventLocation,200];
        }
        else{ 
            return ["Unauthorized",401]
        }
    }catch(e){
        console.log(e)
        return ["Unauthorized",401]
    }
    }

    getEventLocationByLocationId = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT EL.id, EL.name, EL.full_address, EL.max_capacity, EL.latitude, EL.longitude FROM event_locations EL where EL.id_location = $1`;
            const values = [id]
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }


    createAsync = async (body) => {
        try {
            console.log(body)
                
                let id_location = parseInt(body.Id_location);
                let name = body.name;
                let full_address = body.full_address;
                let max_capacity = parseInt(body.max_capacity);
                let latitude = parseFloat(body.latitude);
                let longitude = parseFloat(body.longitude);
                if(name.length > 3 && full_address.length > 3){
                    if(max_capacity > 0){
                        const sql2 = `
                        select Id from locations where Id = $1`;
                        const values2 = [id_location];
                        const result2 = await client.query(sql2, values2);
                        if(result2 != null){
                            const sql = `
                            INSERT INTO event_locations
                            (latitude,longitude, Id_creator_user,Id_location,name,full_address,max_capacity)
                            VALUES
                            ($1,$2,$3,$4,$5,$6,$7)`;
                            const values = [latitude,longitude,2,id_location,name,full_address,max_capacity];
                            const result = await client.query(sql, values);
                            return ["created", 200]; 
                        }
                        return ["El id_location es inexistente.",400]
                    }
                    else{
                        return ["El max_capacity es el número 0  o negativo.", 400];
                    }
                }
                else{
                    return ["El nombre  o la dirección  están vacíos o tienen menos de tres letras", 400];
                }
            }
            
         
        catch (error) {
          
            console.log(error);
            return [error.message, 401];
        }
    }; 
    putAsync = async (body) => {
        try {
            const secretKey = "ClaveSecreta3000$";
            let validacionToken = token; 
            let payloadOriginal = null;
            payloadOriginal = await jwt.verify(validacionToken,secretKey);
            if(payloadOriginal != null){
                console.log(payloadOriginal);
                let id = parseInt(body.id);
                let id_location = parseInt(body.id_location);
                let name = body.name;
                let full_address = body.full_address;
                let max_capacity = parseInt(body.max_capacity);
                let latitude = parseFloat(body.latitude);
                let longitude = parseFloat(body.longitude);
                console.log("llegue");
                if(name.length > 3 && full_address.length > 3){
                    console.log("llegue");
                    if(max_capacity > 0){
                        console.log("llegue");
                        const sql2 = `
                        select id from locations where id = $1`;
                        const values2 = [id];
                        const result2 = await client.query(sql2, values2);
                        if(result2 != null){
                            console.log("llegue");
                            const sql = `
                            UPDATE event_locations
                            SET id_location = $2, name = $3,full_address = $4, max_capacity = $5, latitude = $6, longitude= $7 
                            WHERE id = $1`;
                            const values = [id, id_location,name,full_address,max_capacity,latitude,longitude];
                            const result = await client.query(sql, values);
                            return ["update", 200]; 
                        }
                        return ["El id_location es inexistente.",400]
                    }
                    else{
                        return ["El max_capacity es el número 0 (cero) o negativo.", 400];
                    }
                }
                else{
                    return ["El nombre  (name) o la dirección (full_address) están vacíos o tienen menos de tres (3) letras", 400];
                }
            }
            else{
                return ["Unauthorized", 401];
            }
        } 
        catch (error) {
          
            console.log(error);
            return ["Unauthorized", 401];
        }
    };
    deleteAsync = async (id) => {
        let resArray;
        try {
        const valuesID = [parseInt(id)];
        const secretKey = "ClaveSecreta3000$";
            let validacionToken = token; 
            let payloadOriginal = null;
            payloadOriginal = await jwt.verify(validacionToken,secretKey);
            let sql = `SELECT *
            FROM public.event_locations WHERE id=$1`;
            const values = [id];
            let result = await client.query(sql, values);
            
            const eventLocation = result.rows;
            console.log(eventLocation);
        
            if(eventLocation[0].id_creator_user == payloadOriginal.id){
            if(payloadOriginal != null){
            let sql3 = `UPDATE events
            SET id_event_location = null
            WHERE id_event_location = $1`;
            let result3 = await client.query(sql3, valuesID);
    
          let sql2 = `DELETE FROM event_locations WHERE id=$1`;
          let result = await client.query(sql2, valuesID);
          resArray = ["Location de evento eliminada correctamente", 200];
            }
          else{
            resArray = ["Unauthorized", 400];
        }}
        else{
            resArray = ["Unauthorized", 400];
        }
        } catch (error) {
          resArray = ["Location de evento no encontrada", 404];
          console.log(error);
        
      };
      return resArray;
    }
 



}