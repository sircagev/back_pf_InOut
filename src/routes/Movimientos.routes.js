import { Router } from "express";
import { ListarTodosMovimientos, RegistrarMovimientoPrestamo } from "../controllers/MovimientosController.js";

const route = Router();

route.get('/listar', ListarTodosMovimientos);
route.post('/registrar', RegistrarMovimientoPrestamo)

export default route;