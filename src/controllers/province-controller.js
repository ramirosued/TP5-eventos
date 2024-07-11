import validacionesHelper from '../helpers/validaciones-Helper.js';
import PropvinceService from '../services/province-service.js';

import { Router } from "express";
let router = Router();
const  svc = new PropvinceService();

//7
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
 
     router.put("", async(req, res) => {
    let body = req.body;
     const resArray = await svc.updateAsync(body);
     res.status(resArray[1]).send(resArray[0]); 
     
 });
 
 router.delete("/:id", async(req, res) => {
     const id = parseInt(req.params.id);
     const resArray = await svc.deleteByIdAsync(id);
     res.status(resArray[1]).send(resArray[0]);
 });



 export default router;