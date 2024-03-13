import { Router } from "express";
import { RegistrarCategoria, ListarCategoria, BuscarCategoria, ActualizarCategoria, DesactivarCategoria } from "../controllers/Categoria.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarCategoria);
route.get('/listar', ListarCategoria);
route.get('/buscar/:id', BuscarCategoria);
route.put('/actualizar/:id', ActualizarCategoria);
route.put('/desactivar/:id', DesactivarCategoria);

export default route;