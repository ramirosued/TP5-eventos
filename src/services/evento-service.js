import ProvinceRepository from '../repositories/evento-repository';
export default class EventoService {
 
 getAllAsync = async () => {
 const repo = new ProvinceRepository();
 const returnArray = await repo.getAllAsync();
 return [returnArray,200];
 }
 
 getByIdAsync = async (id) => {
    const repo = new ProvinceRepository();
    const entity = await repo.getByIdAsync(id);
    if(entity){
      return [entity,200];
  } else
    {
     return ["No se encontro la provincia",404];
    }    
}
 createAsync = async (name, full_name, latitude, longitude, display_order) => {
    const repo = new ProvinceRepository();
    const createdEntity = await repo.createAsync(name, full_name, latitude, longitude, display_order);
    if(createdEntity!=null){
      return ["Operacion exitosa",200];
    }else{
      return ["No se pudo crear la provincia", 404];

    }
 }
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