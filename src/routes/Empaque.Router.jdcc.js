import { Router } from "express";
import { RegistrarEmpaque, ListarEmpaque, BuscarEmpaque, ActualizarEmpaque, DesactivarEmpaque } from "../controllers/Empaque.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarEmpaque);
route.get('/listar', ListarEmpaque);
route.get('/buscar/:id', BuscarEmpaque);
route.put('/actualizar/:id', ActualizarEmpaque);
route.put('/desactivar/:id', DesactivarEmpaque);

export default route;