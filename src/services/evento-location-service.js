import EventLocationRepository from '../repositories/evento-location-repository.js';
export default class EventLocationService{
    getAllAsync = async () => {
        const repo = new EventLocationRepository();
        const resArray= await repo.getAllAsync();
        return resArray; 
    }

    getByIdAsync = async (id) =>{
        const repo = new EventLocationRepository();
        const arrayEventLocation= await repo.getByIdAsync(id);
        let resArray;
        if (arrayEventLocation != '') {
            
            resArray = [arrayEventLocation,200];;
        } else {
            resArray = ["Ubicacion no encontrada",404];
        }
        return resArray;
    }
    getLocationByIdAsync = async (id) =>{
        const repo = new EventLocationRepository();
        const arrayEventLocation= await repo.getLocationByIdAsync(id);
        let resArray;
        if (arrayEventLocation != '') {
            
            resArray = [arrayEventLocation,200];;
        } else {
            resArray = ["Ubicacion no encontrada",404];
        }
        return resArray;
    }

       
}