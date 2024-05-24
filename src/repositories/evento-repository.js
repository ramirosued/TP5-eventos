import pkg from 'pg'
import provinces from '../entities/province.js';

const { Client, Pool } = pkg;
export default class ProvinceRepository {
 getAllAsync = async () => {
 let returnArray = null;
    returnArray = provinces;
 return returnArray;
 }
 getByIdAsync = async (id) => {
    let provinceEncontrada = provinces.find(province => province.id === id);
    return provinceEncontrada;
 }

 createAsync = async (nombre, full_name, latitude, longitude, display_order) => {
    if (!nombre || !full_name || !latitude || !longitude || !display_order || nombre.length<3 || full_name.length<3) {
    } else {
        let nuevaProvincia = {
            id: provinces.length + 1,
            name: nombre,
            full_name: full_name,
            latitude: latitude,
            longitude: longitude,
            display_order: display_order
        };
        provinces.push(nuevaProvincia);
        return nuevaProvincia;
    }
    return nuevaProvincia;
 }

 updateAsync = async (id, name,full_name, latitude, longitude, display_order) => {
    let devolucion = 0
    if (provinces.find(province => province.id === id) != undefined)
    {
        if(name !== undefined && full_name !== undefined && latitude !== undefined && longitude !== undefined && display_order !==undefined)
        {
            if(name.length>3 && full_name.length > 3)
            {
                const index = provinces.findIndex(province => province.id === id);
                provinces[index] = 
                {
                    id: id,
                    name: name,
                    full_name: full_name,
                    latitude: latitude,
                    longitude: longitude,
                    display_order: display_order
                };
                devolucion = 1
               return 1 ;
            } else  
            {
                devolucion = 2;
                return devolucion;
            }    
        }else 
        {
            devolucion = 2;
            return devolucion;
        }  
    }
    else
    {
        devolucion = 3;
        return devolucion;
    }
 }

 deleteByIdAsync = async (id) => {
    let sePudo= 0;
    let idProvincia = provinces.findIndex(province => province.id === id);
    if (idProvincia!=undefined) { 
        provinces.splice(idProvincia,1);
        sePudo = 1;
        return sePudo;
    } else {
        sePudo = 0
       return sePudo;
    }  
 }
}