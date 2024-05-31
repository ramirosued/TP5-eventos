import ProvinceRepository from '../repositories/province-repository.js';
export default class PropvinceService {
 
 getAllAsync = async () => {
 const repo = new ProvinceRepository();
 const returnArray = await repo.todasLasProvincias();
 return [returnArray,200];
 }

}