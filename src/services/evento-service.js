import EventosRepository from '../repositories/evento-repository.js';

export default class EventoService {

getEvents = async()=>{

}
 
//3
 getByIdAsync = async (params) => {
    const repo = new EventosRepository();
    const entity = await repo.searchAsync(params);
    let resArray;
        if (entity != '') {
            resArray = [entity, 200];
        } else {
            resArray = ["No se encuentran eventos", 404];
        }
        return resArray;
}
//4
 getEventById = async (id) => {
    const repo = new EventosRepository();
    console.log(id);
    try {
      const entity = await repo.buscarEventoById(id);
      console.log(entity)
      if(entity!=''){
        return [entity,200];
      }else{
        return ["No se pudo encontrar el evento", 404];
      }
    } catch {
      return ['Error', 400]
    }
 }
 

 
//5
  getEventEnrollment = async(enrollment) => {
  const repo = new EventosRepository();
  try {
    const eventoEnrollment = await repo.getEventEnrollment(enrollment);
    console.log(eventoEnrollment)
    if(eventoEnrollment!=null){
      return [eventoEnrollment,200];
    }else{
      return ["No se pudo encontrar el evento", 404];
    }
  } catch {
    return ['Error', 400]
  }
}


//8
createEventAsync = async(body)=>{
  const repo = new EventosRepository();
  const returnArray = await repo.createEvento(body);
  return returnArray;
}

UpdateEventAsync = async(body)=>{
  const repo = new EventosRepository();
  const returnArray = await repo.ModificarEvento(body);
  return returnArray;
}

DeleteEventAsync = async(id)=>{
  const repo = new EventosRepository();
  const returnArray = await repo.EliminarEvento(id);
  return returnArray;
}

RatingEvento = async(eventId,eventRating,bodyDescripcion) =>
{
    const repo = new EventosRepository();
    const enrollments = await repo.RatingEvento(eventId,eventRating,bodyDescripcion);
    return enrollments;
};

}

 //hasta aca
 