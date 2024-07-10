import { Router } from 'express';
import UserService from '../services/user-service.js'

let router = Router();
const svc = new UserService();

router.post('/login', async(req, res) => {
    const body = req.body;
    const resArray = await svc.LoginUserAsync(body);
    res.status(resArray[1]).send(resArray[0]);
})

router.post('/register', async(req, res) => {
    const body = req.body;
    const resArray = await svc.CreateUserAsync(body);
    res.status(resArray[1]).send(resArray[0]);
})


export default router;