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

//8
  createEvento = async(body)=>{
    let resArray;
    let id_event_location = body.id_event_location;
    let start_date = body.start_date;
    let duraction_in_minutes = body.duraction_in_minutes;
    let price = body.price;
    let enabled_for_enrollment = body.enabled_for_enrollment;
    let max_assistance = body.max_assistance;
    let id_creator_user = body.id_creator_user;
    let id_event_category = body.id_event_category;
    let name = body.name;
    let description = body.description;

    const resultCapacity = await client.query(`SELECT max_capacity FROM event_locations WHERE id = $1`, [parseInt(id_event_location)]);
    const max_capacity = resultCapacity.rows[0].max_capacity;

    try{
        const sql = `
        INSERT INTO events (id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user, id_event_category, name, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        const values = [parseInt(id_event_location), start_date, parseInt(duraction_in_minutes), parseInt(price), parseInt(enabled_for_enrollment), parseInt(max_assistance), parseInt(id_creator_user), parseInt(id_event_category), name, description];
        const result = await client.query(sql, values);
       
        console.log(max_capacity);
        if(name.length<3 || description.length<3 || price<0 || duraction_in_minutes <0 || max_capacity<=parseInt(max_assistance))
        {
          resArray=["Bad request",400]
        
        }else{
          resArray=["created",200]

        }
      }
        catch (error){
          if (error.code === '23503' && error.constraint === 'events_id_creator_user_fkey') {
            resArray = ["El id del usuario que lo crea no existe no existe", 400];
          }
            else{
              resArray = ["Faltan datos",404];

            }

        }
    return resArray
  }



ModificarEvento = async(body) => {
  const client = new Client(config);
  await client.connect();
  let id = body.id;
  let id_event_location = body.id_event_location;
  let start_date = body.start_date;
  let duration_in_minutes = body.duration_in_minutes;
  let price = body.price;
  let enabled_for_enrollment = body.enabled_for_enrollment;
  let max_assistance = body.max_assistance;
  let id_creator_user = body.id_creator_user;
  let id_event_category = body.id_event_category;
  let name = body.name;
  let description = body.description;
  
  const resultCapacity = await client.query(`SELECT max_capacity FROM event_locations WHERE id = $1`, [parseInt(id_event_location)]);
  const max_capacity = resultCapacity.rows[0].max_capacity;

  const resultUsuario = await client.query(`SELECT id_creator_user FROM events WHERE Id = $1`, [parseInt(id)]);
  const usuario = resultUsuario.rows[0].id_creator_user; 
  console.log(usuario);
  try {
   
      if (name.length < 3 || description.length < 3 ||price < 0 || duration_in_minutes < 0 || max_assistance < 0 || max_assistance > parseInt(max_capacity)) {
          return ["Bad request", 400];
      }else if(parseInt(usuario)!=id_creator_user){
      return ["Usuario no autorizado", 400];

      }

      const query = `
          UPDATE events
          SET 
              id_event_location = $1,
              start_date = $2,
              duration_in_minutes = $3,
              price = $4,
              enabled_for_enrollment = $5,
              max_assistance = $6,
              id_creator_user = $7,
              id_event_category = $8,
              name = $9,
              description = $10

          WHERE Id = $11`;

      const values = [id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user, id_event_category, name, description, id];
      const result = await client.query(query, values);

      if (result.rowCount === 0) {
          throw new Error(`El evento con el ID ${id} no existe`);
      }

      return ["updated", 200];
  } catch (error) {
      console.error("Error updating event:", error);
      return [error.message, 400];  
  } finally {
      await client.end();
  }
}


EliminarEvento = async(id) => {
  const client = new Client(config);
    await client.connect();

    try {
      const deleteEvent_tags = `
        DELETE FROM event_tags
        WHERE id_event = $1`;

    const valuesEvent_tags = [id];
    const resultEvent_tags = await client.query(deleteEvent_tags, valuesEvent_tags);

    const deleteEvent_enrollments = `
        DELETE FROM event_enrollments
        WHERE id_event = $1`;

    const valuesEvent_enrollments = [id];
    const resultEvent_enrollments = await client.query(deleteEvent_enrollments, valuesEvent_enrollments);


        const deleteQuery = `
            DELETE FROM events
            WHERE id = $1`;

        const values = [id];
        const result = await client.query(deleteQuery, values);
        

        if (result.rowCount === 0) {
            return[`Evento con el id ${id} no encontrado`, 404 ];
        }

        return ["Evento eliminado correctamente", 200 ];
    } catch (error) {
        console.error("Error deleting event:", error);
        throw { message: error.message || "Internal server error", status: error.status || 500 };
    } finally {
        await client.end();
    }
}
}






