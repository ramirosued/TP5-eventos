import { Router } from 'express';
import LocationService from '../services/location-service.js'
import AuthMiddleware from "../auth/authMiddleware.js";


const router = Router();
const svc = new LocationService();


router.get('', async(req, res) => {
    const resArray = await svc.getAllLocations();
    res.status(resArray[1]).send(resArray[0]);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const resArray = await svc.getByIdAsync(id);
    res.status(resArray[1]).send(resArray[0]);
    
});
router.get('/province/:id',AuthMiddleware,async (req, res) => {
    const id = req.params.id;
    const resArray = await svc.getLocationByIdAsync(id);
    res.status(resArray[1]).send(resArray[0]);
});

export default router;