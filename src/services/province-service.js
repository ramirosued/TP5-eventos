import ProvinceRepository from '../repositories/province-repository.js';
export default class PropvinceService {
 
 getAllAsync = async () => {
 const repo = new ProvinceRepository();
 const returnArray = await repo.todasLasProvincias();
 return [returnArray,200];
 }

 getByIdAsync = async (id) => {
    const repo = new ProvinceRepository();
    const returnArray = await repo.provinciaById(id);
    if (returnArray.length>0){
        return [returnArray,200];
    }else{
        return ["Provincia no encontrada",404];

    }
    }

    //7-Post
    createAsync = async (body) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.createProvincia(body);
        return returnArray;
    }


    updateAsync = async (body) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.ModificarProvincia(body);
        return returnArray;

    }

    
    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.elimianrProvincia(id);
        return returnArray;
    }
}