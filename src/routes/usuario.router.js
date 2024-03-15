import { Router } from "express";
import {registrarUsuario, ListarUsuario, EliminarUsuario,BuscarUsuario, ActualizarUsuario, EstadoUsuario, InicioSesion} from "../controllers/usuario.controller.js";

const route = Router();

route.post('/registrar', registrarUsuario);
route.get('/listar', ListarUsuario);
route.delete('/eliminar/:id', EliminarUsuario);
route.get('/buscar/:id', BuscarUsuario);
route.put('/actualizar/:id', ActualizarUsuario);
route.put('/estado/:id', EstadoUsuario);
route.post('/login', InicioSesion);


export default route;