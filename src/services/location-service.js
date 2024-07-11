import LocationRepository from '../repositories/location-repository.js';
export default class LocationService{
    getAllLocations = async () => {
        const repo = new LocationRepository();
        const resArrayLocation= await repo.getAllLocations();
        return resArrayLocation;
    }

    getByIdAsync = async (id) =>{
        const repo = new LocationRepository();
        const resArrayLocation = await repo.getByIdAsync(id);
        return resArrayLocation
    }
    getLocationByIdAsync = async (id) =>{
        const repo = new LocationRepository();
        const resArray= await repo.getLocationByIdAsync(id);
        return resArray;
    }

       
}