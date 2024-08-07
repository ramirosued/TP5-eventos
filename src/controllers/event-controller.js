import validacionesHelper from '../helpers/validaciones-Helper.js';
import EventoService from '../services/evento-service.js';
import jwt from 'jsonwebtoken'
import AuthMiddleware from "../auth/authMiddleware.js";

const secretKey = "ClaveSecreta3000$"; 



import { Router } from "express";
let router = Router();
const  svc = new EventoService();

//1
//router.get("", async(req,res)=>{
  // const name = req.query.Name;
  //const category = req.query.Category; 
 //  const date = req.query.Date; 
  // const tag = req.query.Tag; 
   // const resArray = await svc.getEvents(name,category,date,tag);
  //  res.status(resArray[1]).send(resArray[0]);
 //})


//2-3
router.get('', async(req,res)=>{
  const params = req.query; 
   const resArray = await svc.getByIdAsync(params);
   res.status(resArray[1]).send(resArray[0]);
})


//4
router.get('/:id', async (req, res) => {
    const id = req.params.id; 
    console.log(id); 

    const resArray = await svc.getEventById(id); 
    res.status(resArray[1]).send(resArray[0]);
});

//5
router.get("/:id/enrollment", async (req, res) => {
    const enrollment = {};
    enrollment.event_id = req.params.id;
    enrollment.nombreEv = req.query.name;
    enrollment.firstName = req.query.firstName;
    enrollment.lastName = req.query.lastName;
    enrollment.username = req.query.username;
    enrollment.attended = req.query.attended;
    enrollment.rating = req.query.rating;
  
      try {
        const x = await svc.getEventEnrollment(enrollment);
        return res.json(x);
      } catch (error) {
        console.log(error);
        return res.json(error);
      }
  
  });

  //8
 router.post('',AuthMiddleware,async (req, res) => {
    let body = req.body;
    const resArray = await svc.createEventAsync(body);
    res.status(resArray[1]).send(resArray[0]);

});


router.put('',AuthMiddleware, async (req, res) => {
    const body = req.body;
        const resArray = await svc.UpdateEventAsync(body);
        res.status(resArray[1]).send(resArray[0]);

    
});



router.delete('/:id',AuthMiddleware, async (req, res) => {
    const id = req.params.id;
    
        const resArray = await svc.DeleteEventAsync(id);

        res.status(resArray[1]).send(resArray[0]);
   
});


router.patch('/:id/enrollment/:entero',AuthMiddleware, async(req, res) => {
    const bodyDescripcion = req.body.observations;
    const eventId = req.params.id;
    const eventRating = req.params.entero;
    const resArray = await svc.RatingEvento(eventId,eventRating,bodyDescripcion);
    res.status(resArray[1]).send(resArray[0]);
})


//9

router.post("/:id/enrollment", async (req, res) => {
    const idEvent = req.params.id;
    const bearerHeader = req.headers['authorization'];

    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];

            // Verificar el token JWT de forma asincrónica
            const payloadOriginal = await jwt.verify(token, secretKey);
            console.log(payloadOriginal.id);

            // Proceder con la inscripción al evento utilizando el ID del usuario del token
            const response = await svc.postInscribeEvent(idEvent, payloadOriginal.id);

            // Manejar respuestas según el resultado de la operación
            if (response.error === 400) {
                throw response.errorMessage;
            } else if (response.error === 404) {
                return res.status(404).send({ success: false, message: response.errorMessage });
            }

            return response.data > 0 ?
                res.status(201).send({ success: true, message: "Registro exitoso!" }) :
                res.status(404).send({ success: false, message: "No se pudo registrar al evento." });

        } else {
            // Si no se proporciona el token en el encabezado de autorización
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

    } catch (e) {
        // Captura y manejo de errores, por ejemplo, errores de verificación del token o del servicio
        return res.status(400).send({ success: false, error: e.message });
    }
});



export default router;