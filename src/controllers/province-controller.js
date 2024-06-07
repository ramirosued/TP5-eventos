import validacionesHelper from '../helpers/validaciones-Helper.js';
import PropvinceService from '../services/province-service.js';

import { Router } from "express";
let router = Router();
const  svc = new PropvinceService();


router.get("", async(req,res)=>{
    const resArray = await svc.getAllAsync();
    res.status(resArray[1]).send(resArray[0]);
 })
 
 router.get("/:id",async(req,res) =>{
     const id = parseInt(req.params.id); 
     const resArray = await svc.getByIdAsync(id)
     res.status(resArray[1]).send(resArray[0]); 
 })
 
 router.post("", async(req, res) => {
    let body = req.body;
     const resArray = await svc.createAsync(body)
     res.status(resArray[1]).send(resArray[0]); 
 
 });
 

 //hasta aca
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