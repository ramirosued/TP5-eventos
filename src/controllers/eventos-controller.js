import validacionesHelper from '../helpers/validaciones-Helper.js';
import eventos from '../entities/province.js';
import { Router } from "express";
import EventoService from '../services/evento-service';
let router =Router();

const  svc = new EventoService();
router.get("/api/busquedaEvento", async(req,res)=>{
   const name = req.query.Name;
   const category = req.query.Category; 
   const date = req.query.Date; 
   const tag = req.query.Tag; 

   const resArray = await svc.getAllAsync(name,category,date,tag);
   res.status(resArray[1]).send(resArray[0]);
})

router.get("/api/participantesEventosId", async(req,res)=>{
    const id = parseInt(req.query.id); 
    const name = parseInt(req.query.firstName); 
    const lastName = parseInt(req.query.lastName); 
    const username = parseInt(req.query.username); 
    const attended = parseInt(req.query.attended); 

   const resArray = await svc.getAllAsync(id,name,lastName,username,attended);
   res.status(resArray[1]).send(resArray[0]);
})

router.post("/api/user/login", async(req,res)=>{
    const date = parseInt(req.query.Date); 
   const resArray = await svc.getAllAsync(date);
   res.status(resArray[1]).send(resArray[0]);
})

router.post("/api/user/register", async(req,res)=>{
    const tag = parseInt(req.query.Tag); 
   const resArray = await svc.getAllAsync(tag);
   res.status(resArray[1]).send(resArray[0]);
})


router.get("/api/province", async(req,res)=>{
    const resArray = await svc.getAllAsync();
    res.status(resArray[1]).send(resArray[0]);
 })
 
 router.get("/api/provinces",async(req,res) =>{
     const id = parseInt(req.query.id); 
     const resArray = await svc.getByIdAsync(id)
     res.status(resArray[1]).send(resArray[0]); 
 })
 
 router.post("/api/provinceP", async(req, res) => {
     let nombre = validacionesHelper.getStringOrDefault(req.body.name);
     let full_name = validacionesHelper.getStringOrDefault(req.body.full_name);
     let latitude = validacionesHelper.getIntegerOrDefault(req.body.latitude);
     let longitude = validacionesHelper.getIntegerOrDefault(req.body.longitude);
     let display_order = validacionesHelper.getIntegerOrDefault(req.body.display_order);
 
     const resArray = await svc.createAsync(nombre, full_name, latitude, longitude, display_order)
     res.status(resArray[1]).send(resArray[0]); 
 
 });
 
 router.put("/api/provincePU", async(req, res) => {
     const id = req.body.id;
 
     let name = req.body.name;
     let full_name = req.body.full_name;
     let latitude = req.body.latitude;
     let longitude = req.body.longitude;
     let display_order = req.body.display_order;
     const resArray = await svc.updateAsync(id, name, full_name, latitude, longitude, display_order);
 
     res.status(resArray[1]).send(resArray[0]); 
 });
 
 router.delete("/api/provinceD", async(req, res) => {
     const id = validacionesHelper.getIntegerOrDefault(req.query.id);
     const resArray = await svc.deleteByIdAsync(id);
     res.status(resArray[1]).send(resArray[0]);
 });

 


 
 router.get("/api/eventos",async(req,res) =>{
     const id = parseInt(req.query.id); 
     const resArray = await svc.getByIdAsync(id)
     res.status(resArray[1]).send(resArray[0]); 
 })
 
 router.post("/api/eventoP", async(req, res) => {
     let nombre = validacionesHelper.getStringOrDefault(req.body.name);
     let full_name = validacionesHelper.getStringOrDefault(req.body.full_name);
     let latitude = validacionesHelper.getIntegerOrDefault(req.body.latitude);
     let longitude = validacionesHelper.getIntegerOrDefault(req.body.longitude);
     let display_order = validacionesHelper.getIntegerOrDefault(req.body.display_order);
 
     const resArray = await svc.createAsync(nombre, full_name, latitude, longitude, display_order)
     res.status(resArray[1]).send(resArray[0]); 
 
 });
 
 router.put("/api/eventoPU", async(req, res) => {
     const id = req.body.id;
 
     let name = req.body.name;
     let full_name = req.body.full_name;
     let latitude = req.body.latitude;
     let longitude = req.body.longitude;
     let display_order = req.body.display_order;
     const resArray = await svc.updateAsync(id, name, full_name, latitude, longitude, display_order);
 
     res.status(resArray[1]).send(resArray[0]); 
 });
 
 router.delete("/api/eventoD", async(req, res) => {
     const id = validacionesHelper.getIntegerOrDefault(req.query.id);
     const resArray = await svc.deleteByIdAsync(id);
     res.status(resArray[1]).send(resArray[0]);
 });
























router.get("/api/province",async(req,res) =>{
    const id = parseInt(req.query.id); 
    const resArray = await svc.getByIdAsync(id)
    res.status(resArray[1]).send(resArray[0]); 
})

router.post("/api/provinceP", async(req, res) => {
    let nombre = validacionesHelper.getStringOrDefault(req.body.name);
    let full_name = validacionesHelper.getStringOrDefault(req.body.full_name);
    let latitude = validacionesHelper.getIntegerOrDefault(req.body.latitude);
    let longitude = validacionesHelper.getIntegerOrDefault(req.body.longitude);
    let display_order = validacionesHelper.getIntegerOrDefault(req.body.display_order);

    const resArray = await svc.createAsync(nombre, full_name, latitude, longitude, display_order)
    res.status(resArray[1]).send(resArray[0]); 

});

router.put("/api/provincePU", async(req, res) => {
    const id = req.body.id;

    let name = req.body.name;
    let full_name = req.body.full_name;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let display_order = req.body.display_order;
    const resArray = await svc.updateAsync(id, name, full_name, latitude, longitude, display_order);

    res.status(resArray[1]).send(resArray[0]); 
});

router.delete("/api/provinceD", async(req, res) => {
    const id = validacionesHelper.getIntegerOrDefault(req.query.id);
    const resArray = await svc.deleteByIdAsync(id);
    res.status(resArray[1]).send(resArray[0]);
});

export default router;