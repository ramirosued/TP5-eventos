import { Router } from 'express';
import EventLocationService from '../services/evento-location-service.js'
import jwt from 'jsonwebtoken'
const secretKey = "ClaveSecreta3000$"; 

const router = Router();
const svc = new EventLocationService();


router.get('', async(req, res) => {
    const resArray = await svc.getAllAsync();
    res.status(resArray[1]).send(resArray[0]);
});

router.get("/:id", async (req, res) => {
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



router.put('', async(req, res) => {
    const body = req.body;
    const resArray = await svc.putAsync(body);
    res.status(resArray[1]).send(resArray[0]);
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resArray = await svc.deleteAsync(id);
    res.status(resArray[1]).send(resArray[0]);
    
});



export default router;