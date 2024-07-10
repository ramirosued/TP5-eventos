import validacionesHelper from '../helpers/validaciones-Helper.js';
import EventoService from '../services/evento-service.js';

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
  router.post('', async (req, res) => {
    let body = req.body;
    const resArray = await svc.createEventAsync(body)
    res.status(resArray[1]).send(resArray[0]); 
});

router.put('', async(req, res) => {
    const body = req.body;
    const resArray = await svc.UpdateEventAsync(body);
    res.status(resArray[1]).send(resArray[0]); 
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const resArray = await svc.DeleteEventAsync(id);
    res.status(resArray[1]).send(resArray[0]); 
});

router.patch('/:id/enrollment/:entero', async(req, res) => {
    const bodyDescripcion = req.body.observations;
    const eventId = req.params.id;
    const eventRating = req.params.entero;
    const resArray = await svc.RatingEvento(eventId,eventRating,bodyDescripcion);
    res.status(resArray[1]).send(resArray[0]);
})



export default router;