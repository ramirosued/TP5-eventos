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
        let sql = `
        SELECT 
            e.id, 
            e.name, 
            e.description, 
            json_build_object (
                'id', ec.id,
                'name', ec.name) 
                AS event_category,
            json_build_object (
                'id', el.id,
                'name', el.name,
                'full_address', el.full_address,
                'latitude', el.latitude,
                'longitude', el.longitude,
                'max_capacity', el.max_capacity,
                'location', json_build_object (
                    'id', l.id,
                    'name', l.name,
                    'latitude', l.latitude,
                    'longitude', l.longitude,
                    'max_capacity', el.max_capacity,
                    'province', json_build_object (
                        'id', p.id,
                        'name', p.name,
                        'full_name', p.full_name,
                        'latitude', p.latitude,
                        'longitude', p.longitude,
                        'display_order', p.display_order
                    )
                )
            ) AS event_location,
            e.start_date, 
            e.duration_in_minutes, 
            e.price, 
            e.enabled_for_enrollment, 
            e.max_assistence, 
            json_build_object (
                'id', u.id,
                'username', u.username,
                'first_name', u.first_name,
                'last_name', u.last_name
            ) AS creator_user,
            (
                SELECT json_agg(json_build_object('id', t.id, 'name', t.name))
                FROM event_tags et
                INNER JOIN tags t ON et.id_tag = t.id
                WHERE et.id_event = e.id
            ) AS tags
        FROM 
            events e 
        INNER JOIN 
            event_categories ec ON e.id_event_category = ec.id 
        LEFT JOIN 
            event_locations el ON e.id_event_location = el.id
        INNER JOIN
            locations l ON el.id_location = l.id
        INNER JOIN
            provinces p ON l.id_province = p.id
        INNER JOIN
            users u ON e.id_creator_user = u.id
        INNER JOIN 
            event_tags et on et.id_event = e.id
        INNER JOIN
            tags t on et.id_tag = t.id  WHERE e.id = $1
        `;
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

    try {
        let sql = `
            SELECT 
                e.id, e.id_event, e.id_user, e.description, 
                e.registration_date_time, e.attended, e.observations, e.rating,
                u.id AS user_id, u.first_name, u.last_name, u.username, u.password
            FROM 
                event_enrollments AS e
            INNER JOIN 
                users AS u ON e.id_user = u.id
            INNER JOIN 
                events AS ev ON e.id_event = ev.id
            WHERE 
                ev.id = $1`;

        const values = [enrollment.event_id];

        if (enrollment != null) {
            if (enrollment.first_name !== undefined) {
                sql += ` AND u.first_name ILIKE $${values.length + 1}`;
                values.push(`%${enrollment.first_name}%`);
            }
            if (enrollment.username !== undefined) {
                sql += ` AND u.username ILIKE $${values.length + 1}`;
                values.push(`%${enrollment.username}%`);
            }
            if (enrollment.attended !== undefined) {
                sql += ` AND e.attended = $${values.length + 1}`;
                values.push(enrollment.attended);
            }
            if (enrollment.rating !== undefined) {
                sql += ` AND e.rating >= $${values.length + 1}`;
                values.push(enrollment.rating);
            }
        }

        const result = await client.query(sql, values);
        const enrollments = result.rows;

        const collection = enrollments.map((enrollment) => ({
            id: enrollment.id,
            id_event: enrollment.id_event,
            id_user: enrollment.id_user,
            user: {
                id: enrollment.user_id,
                first_name: enrollment.first_name,
                last_name: enrollment.last_name,
                username: enrollment.username,
                password: enrollment.password,
            },
            description: enrollment.description,
            registration_date_time: enrollment.registration_date_time,
            attended: enrollment.attended,
            observations: enrollment.observations,
            rating: enrollment.rating,
        }));

        const pagination = {
            limit: 0,
            offset: 0,
            nextPage: "",
            total: collection.length,
        };

        return { collection, pagination };
    } catch (e) {
        console.log(e);
    } finally {
        await client.end();
    }
};

//8
  createEvento = async(body)=>{
    console.log(body);
    let resArray;
    let id_event_location = body.Id_event_location;
    let start_date = body.start_date;
    let duraction_in_minutes = body.duraction_in_minutes;
    let price = body.price;
    let enabled_for_enrollment = body.enabled_for_enrollment;
    let max_assistence = body.max_assistence;
    let id_creator_user = body.id_creator_user;
    let id_event_category = body.id_event_category;
    let name = body.name;
    let description = body.description;

    const resultCapacity = await client.query(`SELECT max_capacity FROM event_locations WHERE id = $1`, [id_event_location]);
    const max_capacity = resultCapacity.rows[0].max_capacity;
    console.log(max_capacity);

    try{
        const sql = `
        INSERT INTO events (id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistence, id_creator_user, id_event_category, name, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        const values = [parseInt(id_event_location), start_date, parseInt(duraction_in_minutes), parseInt(price), parseInt(enabled_for_enrollment), parseInt(max_assistence), parseInt(id_creator_user), parseInt(id_event_category), name, description];
        const result = await client.query(sql, values);
       
        console.log(max_capacity);
        if(name.length<3 || description.length<3 || price<0 || duraction_in_minutes <0 || max_capacity<=parseInt(max_assistence))
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
  let id = body.Id;
  let id_event_location = body.Id_event_location;
  let start_date = body.start_date;
  let duration_in_minutes = body.duraction_in_minutes;
  let price = body.price;
  let enabled_for_enrollment = body.enabled_for_enrollment;
  let max_assistence = body.max_assistence;
  let id_creator_user = body.id_creator_user;
  let id_event_category = body.id_event_category;
  let name = body.name;
  let description = body.description;
  console.log(body);

  const resultCapacity = await client.query(`SELECT max_capacity FROM event_locations WHERE Id = $1`, [parseInt(id_event_location)]);
  const max_capacity = resultCapacity.rows[0].max_capacity;

  const resultUsuario = await client.query(`SELECT id_creator_user FROM events WHERE Id = $1`, [parseInt(id)]);
  const usuario = resultUsuario.rows[0].id_creator_user; 
  console.log(usuario);
  try {
   
      if (name.length < 3 || description.length < 3 ||price < 0 || duration_in_minutes < 0 || max_assistence < 0 || max_assistence > parseInt(max_capacity)) {
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
              max_assistence = $6,
              id_creator_user = $7,
              id_event_category = $8,
              name = $9,
              description = $10

          WHERE Id = $11`;

      const values = [id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistence, id_creator_user, id_event_category, name, description, id];
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

//10
RatingEvento = async (eventId,eventRating,bodyDescripcion) => {
  const client = new Client(config);
  await client.connect();    
  const resultFecha = await client.query(`SELECT start_date FROM events WHERE id = $1`, [parseInt(eventId)]);
  const fechaEvento = resultFecha.rows[0].start_date;
//busco que el id 
  const fechaActual = new Date();

  if (fechaEvento < fechaActual) {
    console.log(fechaEvento)
    if(eventRating>=0 && eventRating<=10)
    {
        try 
        {
          let sql = `
          INSERT INTO event_enrollments (id_user,registration_date_time,attended,rating,id_event,description,observations) 
          VALUES (1, now()::timestamp, 0,$3,$1,'Registered for ' ||(select name from events where events.id = $1),$2)`
  
          const values = [eventId,bodyDescripcion,eventRating];
         const result = await client.query(sql, values);
        
          return ["Evento rankeado correctamente",200]
        } catch(error) {
          return [error.message,400]
      }
    }
    else{
      return["Mal ingresado el rating",400]
    }
 
}else{
  return["El evento no ha finalizado aun",400]
}
};

//9
postInscribeEvent = async (idEvent, idUser) => {
  let response = null;
  const client = new Client(config);
  await client.connect();    
  try {
      const sql = `INSERT INTO event_enrollments (Id_user, registration_date_time, attended, rating, Id_event, description, observations)
      values( $2, now(), 0, 0, $1, ' ', ' ')`
      const values = [idEvent, idUser];
      const result = await client.query(sql, values);
      await client.end();
      response = result.rowCount;
  } catch (error) {
      console.log(error);
  }
  return response;
}


getQuantInscriptions = async (idEvent) => {
  let response = null;
  const client = new Client(config);
  try {
      await client.connect();
      const sql = `SELECT COUNT(*) FROM event_enrollments WHERE id_event = $1;`
      const values = [idEvent];
      const result = await client.query(sql, values);
      await client.end();
      response = result.rows;
  } catch (error) {
      console.log(error);
  }
  return response;
}


getEventStartDate = async (idEvent) => {
  let response = null;
  const client = new Client(config);
  try {
      await client.connect();
      const sql = `SELECT start_date FROM events WHERE Id = $1`
      const values = [idEvent];
      const result = await client.query(sql, values);
      await client.end();
      response = result.rows;
      console.log(response)

  } catch (error) {
      console.log(error);
  }
  return response;
}

getEventoById = async (id) => {
  let response = null;
  const client = new Client(config);
  try {
      await client.connect();
      const sql = 'SELECT * FROM events WHERE id=$1'
      const values = [id];
      const result = await client.query(sql, values);
      await client.end();
      response = result.rows;
  } catch (error) {
      console.log(error);
  }
  return response;
}

}




