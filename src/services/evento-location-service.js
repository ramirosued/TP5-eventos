import EventLocationRepository from '../repositories/evento-location-repository.js';
export default class EventLocationService{
    getAllAsync = async () => {
        const repo = new EventLocationRepository();
        const resArray= await repo.getAllAsync();
        return resArray; 
    }

   
    getEventLocationByLocationId = async (id) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.getEventLocationByLocationId(id);
        return returnArray;
    }

    createAsync = async (body) => {
        const repo = new EventLocationRepository();
        let resArray = repo.createAsync(body);
        return resArray;
    };
    putAsync = async (body) => {
        const repo = new EventLocationRepository();
        let resArray = repo.putAsync(body);
        return resArray;
    };
    deleteAsync = async (id) =>{
        const repo = new EventLocationRepository();
        const resArray= await repo.deleteAsync(id);
        return resArray;
    }
  
       
}