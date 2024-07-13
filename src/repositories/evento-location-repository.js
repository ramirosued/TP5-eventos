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
        
        let sql = `SELECT el.id, l.* , el.name, el.full_address, el.max_capacity, el.latitude, el.longitude, u.*
        FROM public.event_locations el inner join locations l on l.id = el.id_location inner join users u on u.id = el.id_creator_user`;
        let result = await client.query(sql)
        const eventLocation = result.rows;
        return [eventLocation,200];
        
    }catch(e){
        console.log(e)
        return [e.message,401]
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
    async UpdateEvLoc(e){
        try {
          const values = [e.id]
          var sql = `UPDATE event_locations SET`;
          var index = 2;
  
          if (e.name != null) {
            sql += ` name=$${index},`;
            values.push(e.name)
            index++;
          }
  
          if (e.full_address != null) {
            sql += ` full_address=$${index},`;
            values.push(e.full_address)
            index++;
          }
  
          if (e.max_capacity != null) {
            sql += ` max_capacity=$${index},`;
            values.push(e.max_capacity)
            index++;
          }
  
          if (e.latitude != null) {
            sql += ` latitude=$${index},`;
            values.push(e.latitude)
            index++;
          }
          if (e.longitude != null) {
            sql += ` longitude=$${index},`;
            values.push(e.longitude)
            index++;
          }
          if (e.id_creator_user != null) {
            sql += ` id_creator_user=$${index},`;
            values.push(e.id_creator_user)
            index++;
          }
  
          if (sql.endsWith(",")) {
            sql = sql.slice(0, -1);
          }
  
          sql += " where id=$1"
  
  
          await this.client.query(sql,values);
          
          return["sss",200]
        } catch (error) {
            
          console.log(error);
          return[error.message,400]

        }
    }
  
      async deleteEvLoc(id){
        try{
        var sql = `DELETE FROM event_locations WHERE id=$1`;
        const values=[id]
        await this.client.query(sql,values);
        }catch(error){
          console.log(error);
        }
      }
  
      async cantEvLoc(id){
        try {
          var sql = "SELECT COUNT(*) FROM event_locations WHERE id_creator_user=$1"
          const values=[id]
          const result = await this.client.query(sql,values)
          return result.rows[0].count
        } catch (error) {
          return error;
        }
      }
  
      async cantEvLocByLocation(id){
        try {
          var sql = "SELECT COUNT(*) FROM event_locations WHERE id_location=$1"
          const values=[id]
          const result = await this.client.query(sql,values)
          return result.rows[0].count
        } catch (error) {
          return error;
        }
      }
  



}