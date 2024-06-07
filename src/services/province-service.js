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
    return [returnArray,200];
    }

    //hecho por la mitad
    createAsync = async (body) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.createProvincia(body);
        return returnArray;
        }
}