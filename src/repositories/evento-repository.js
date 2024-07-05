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
            let sql = `SELECT Distinct e.* FROM events as e INNER JOIN event_categories as ec ON e.id_event_category = ec.id INNER JOIN event_tags et ON e.id = et.id_event INNER JOIN tags as t on t.id = et.id_tag`;
            const values = [];
            const conditions = [];
            
            if (params.name) {
            conditions.push(`e.name ILIKE $${values.length + 1}`);
            values.push(`%${params.name}%`);
            }
                        
            if (params.category) {
            conditions.push(`ec.name ILIKE $${values.length + 1}`);
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
    buscarEventoById = async (params) => {
        const client = new Client(config);
        await client.connect();
        let sql = 'SELECT * FROM events WHERE id = $1'; 
        const values = [params];
        let result = await client.query(sql, values); 
        await client.end(); 
        console.log(result.rows[0]);
        return (result.rows);
    }
    
//5


getEventEnrollment = async (enrollment) => {
    const client = new Client(config);
    await client.connect();

    let returnEntity = null;
    try {
      var sql = `select ev.id,ev.name as Evento, u.first_name as Nombre, u.last_name as Apellido, u.username, ee.attended, ee.rating from events ev 
      inner join event_enrollments ee on ev.id=ee.id_event 
      inner join users u on ev.id_creator_user = u.id 
      where ev.id=$1 and `;
      var index = 2;
      const values = [enrollment.event_id];

      if (enrollment.nombreEv != null) {
        sql += ` ev.name=$${index} and`;
        values.push(enrollment.nombreEv)
        index++;
      }
      if (enrollment.firstName != null) {
        sql += ` u.first_Name=$${index} and`;
        values.push(enrollment.firstName)
        index++;
      }
      if (enrollment.lastName != null) {
        sql += ` u.last_name=$${index} and`;
        values.push(enrollment.lastName)
        index++;
      }
      if (enrollment.username != null) {
        sql += ` u.username=$${index} and`;
        values.push(enrollment.username)
        index++;
      }
      if (enrollment.attended != null) {
        sql += ` ee.attended=$${index} and`;
        values.push(enrollment.attended)
        index++;
      }
      if (enrollment.rating != null) {
        sql += ` ee.rating=$${index} and`;
        values.push(enrollment.attended)
        index++;
      }



      if (sql.endsWith(" and ")) {
        sql = sql.slice(0, -5);
      }
      if (sql.endsWith(" and where")) {
        sql = sql.slice(0, -10);
      }

      const result = await client.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows;
      }
    } catch (error) {
      console.log(error);
    }

    return returnEntity;
  }


  createEvento = async(body)=>{
    let resArray;

    try{
        let id_event_location = body.id_event_location;
        let start_date = body.start_date;
        let duraction_in_minutes = body.duraction_in_minutes;
        let price = body.price;
        let enabled_for_enrollment = body.enabled_for_enrollment;
        let max_assistence = body.max_assistence;
        let id_creator_user = body.id_creator_user;
        let id_event_category = body.name;
        let name = body.id_event_category;
        let description = body.id_event_category;


        const sql = `
            INSERT INTO provinces
                (id_event_location, start_date, duraction_in_minutes, price, enabled_for_enrollment,max_assistence,id_creator_user,id_event_category,name,description)
            VALUES
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
        const values = [id_event_location, start_date, duraction_in_minutes, price,enabled_for_enrollment,max_assistence,id_creator_user,id_event_category,name,description];
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

}




