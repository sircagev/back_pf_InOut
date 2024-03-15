import { Router } from "express"
import { validarUsuario } from "../controllers/validator.controller.js"

const route = Router();

route.post('/validar', validarUsuario);

export default route;