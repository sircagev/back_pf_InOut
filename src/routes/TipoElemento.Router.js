import { Router } from "express";
import { RegistrarTipo, ListarTipo, BuscarTipo, ActualizarTipo, EliminarTipo, DesactivarTipo } from "../controllers/TipoElemento.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarTipo);
route.get('/listar', ListarTipo);
route.get('/buscar/:id', BuscarTipo);
route.put('/actualizar/:id', ActualizarTipo);
route.delete('/eliminar/:id', EliminarTipo);
route.put('/desactivar/:id', DesactivarTipo);


export default route;