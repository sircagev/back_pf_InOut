import { Router } from "express";
import { RegistrarUbicacion, ListarUbicacion, BuscarUbicacion, ActualizarUbicacion, Desactivarubicacion } from "../controllers/Ubicacion.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarUbicacion);
route.get('/listar', ListarUbicacion);
route.get('/buscar/:id', BuscarUbicacion);
route.put('/actualizar/:id', ActualizarUbicacion);
route.put('/desactivar/:id', Desactivarubicacion);

export default route;