import { Router } from "express";
import { RegistrarMedida, ListarMedida, Buscarmedida, ActualizarMedida, DesactivarMedida } from "../controllers/UnidadMedida.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarMedida);
route.get('/listar', ListarMedida);
route.get('/buscar/:id', Buscarmedida);
route.put('/actualizar/:id', ActualizarMedida);
route.put('/desactivar/:id', DesactivarMedida);

export default route;