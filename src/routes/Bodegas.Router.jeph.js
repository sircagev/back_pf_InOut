import { Router } from "express";
import { RegistrarBodega, listarBodegas, BuscarBodega, ActualizarBodega, DesactivarBodega } from "../controllers/Bodegas.Controllers.jeph.js";

const route = Router();

route.post('/registrar', RegistrarBodega);
route.get('/listar', listarBodegas);
route.get('/buscar/:id', BuscarBodega)
route.put('/actualizar/:id', ActualizarBodega);
route.delete('/desactivar/:id', DesactivarBodega);


export default route;