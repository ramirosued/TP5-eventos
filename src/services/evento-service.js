import EventosRepository from '../repositories/evento-repository.js';
export default class EventoService {
 
 

 getByIdAsync = async (name,category,date,tag) => {
    const repo = new EventosRepository();
    const entity = await repo.buscarEvento(name,category,date,tag);
    if(entity){
      return [entity,200];
  } else
    {
     return ["No se encontro ningun evento",404];
    }    
}

 getEventById = async (id) => {
    const repo = new EventosRepository();
    console.log(id);
    const createdEntity = await repo.buscarEventoById(id);
    
    if(createdEntity!=null){
      return [createdEntity,200];
    }else{
      return ["No se pudo encontrar el evento"];

    }
 }
 


 //hasta aca
 updateAsync = async (id, name, full_name, latitude, longitude, display_order) => {
    const repo = new ProvinceRepository();
    const updateEntity = await repo.updateAsync(id, name, full_name, latitude, longitude, display_order);
    if(updateEntity === 1){
      return ["Provincia actualizada exitosamente",200];
    }else if(updateEntity===2){
      return ["bad request",200];
    }else if(updateEntity===3){
      return ["No existe la provincia que queres modificar",200];

    }
 }

 deleteByIdAsync = async (id) => {
    const repo = new ProvinceRepository();
    const deleteEntity = await repo.deleteByIdAsync(id);
    if (deleteEntity === 1) { 
      return ["Se elimino correctamente", 200];
  } else {
      return["Provincia no encontrada", 404];
  }
}
}