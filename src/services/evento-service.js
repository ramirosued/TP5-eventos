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
    const entity = await repo.buscarEventoById(id);
    
    if(entity!=''){
      return [entity,200];
    }else{
      return ["No se pudo encontrar el evento", 404];

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