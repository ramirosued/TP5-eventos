import express from "express";
import cors from "cors";
import EventosRouter from "./controllers/event-controller.js";
import ProvinceRouter from "./controllers/province-controller.js"



const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.

app.use("/api/province", ProvinceRouter)

app.use("/api/eventos", EventosRouter);



app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
