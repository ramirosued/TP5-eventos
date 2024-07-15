import express from "express";
import cors from "cors";
import EventosRouter from "./src/controllers/event-controller.js";
import ProvinceRouter from "./src/controllers/province-controller.js";
import UserRouter from "./src/controllers/user-controller.js";
import LocationRouter from "./src/controllers/location-controller.js";
import EventCategoryRouter from "./src/controllers/evento-category-controller.js";
import EventLocationRouter from "./src/controllers/evento-locations-controller.js";
const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.

app.use("/api/province", ProvinceRouter)

app.use("/api/eventos", EventosRouter)

app.use("/api/user", UserRouter);

app.use('/api/location', LocationRouter);

app.use('/api/event-category', EventCategoryRouter);

app.use('/api/event-location', EventLocationRouter);


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
