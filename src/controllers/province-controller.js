import validacionesHelper from '../helpers/validaciones-Helper.js';
import PropvinceService from '../services/province-service.js';
import EventoService from '../services/province-service.js';

import { Router } from "express";
let router = Router();
const  svc = new PropvinceService();


router.get("", async(req,res)=>{
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



 export default router;