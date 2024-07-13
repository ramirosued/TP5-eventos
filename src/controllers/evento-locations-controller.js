import { Router } from 'express';
import EventLocationService from '../services/evento-location-service.js'
import jwt from 'jsonwebtoken'
import AuthMiddleware from "../auth/authMiddleware.js";

const secretKey = "ClaveSecreta3000$"; 

const router = Router();
const svc = new EventLocationService();


router.get('',AuthMiddleware, async(req, res) => {
    const resArray = await svc.getAllAsync();
    res.status(resArray[1]).send(resArray[0]);
});

router.get("/:id",AuthMiddleware, async (req, res) => {
    const idLocation = req.params.id;
    try{
        if(idLocation == 0) throw (`Id invalido.`)
        const response = await svc.getEventLocationByLocationId(idLocation)
        return response.length > 0 ? res.status(200).send({success: true, results: response}) : res.status(404).send({success: false, message:`No se encontró ninguna localidad para la provincia: ${idProvince}`});
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});

router.post('', async (req, res) => {
    const bearerHeader = req.headers['authorization'];
    let body = req.body;

    try {

        // Obtener el token JWT del encabezado Authorization
        if (typeof bearerHeader === 'undefined') {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
         
        console.log("Token JWT recibido:", token);

        // Verificar el token JWT de forma asincrónica
        const payload = await jwt.verify(token, secretKey);


        // Si la verificación es exitosa, proceder con la creación del evento
        const resArray = await svc.createAsync(body);

        // Enviar la respuesta según el resultado de la operación
        res.status(resArray[1]).send(resArray[0]);

    } catch (error) {
        console.error("Error durante la verificación del token:", error.message);
        // Manejar errores de autenticación o cualquier otro error
        return res.status(401).json({ message: 'Token inválido' });
    }
});



router.put("/",AuthMiddleware, async (req,res)=>{
    const EventLocation={}
    EventLocation.id=req.body.id;
    EventLocation.id_location=req.body.id_location;
    EventLocation.name=req.body.name;
    EventLocation.full_address=req.body.full_address;
    EventLocation.max_capacity=req.body.max_capacity;
    EventLocation.latitude=req.body.latitude;
    EventLocation.longitude=req.body.longitude;
    EventLocation.id_creator_user=req.user.id;
  
    try {
        if((EventLocation.name==null || EventLocation.name.length>3) && (EventLocation.full_address==null  || EventLocation.full_address.length>3)){
  
        if(svc.getEventLocationByLocationId(EventLocation.id_location)!=null || EventLocation.id_location==null){
  
          if (EventLocation.max_capacity>0 || EventLocation.max_capacity == null) {
  
            const respuesta = await svc.UpdateEvLoc(EventLocation);    
            return res.status(201).json(respuesta);
  
          }else{
  
            return res.status(400).send("Maxima capacidad inválida");
          }
        }else{
  
          return res.status(400).send("No existe esa id localidad");
        }
      }else{
        return res.status(400).send("Nombre o dirección inválidos");
      }
        
      } catch (error) {
        console.log(error);
        return res.json(error);
      }
  
  });
  
  router.delete("/:id", AuthMiddleware , async (req,res)=>{
    const id= req.params.id;
    try{
    const evLocById = await svc.getEventLocationByLocationId(id);
    if (evLocById!=null && evLocById.id_creator_user==req.user.id) {
      await svc.deleteEvLoc(id);
      return res.status(200).send("Event location eliminado")
  
      
    }else{
      return res.status(404).send("Not found")
    }
    }catch(error){
      console.log(error);
      return error;
    }
  
  })



export default router;