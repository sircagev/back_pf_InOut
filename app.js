import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import RouteTipoElemento from "./src/routes/TipoElemento.Router.js";
import RouteCategoeria from "./src/routes/Categoria.controller.jdcc.js";
import RouteEmpaque from "./src/routes/Empaque.Router.jdcc.js";
import RouteMedida from "./src/routes/UnidadMedida.Router.jdcc.js";
import RouteUbicacion from "./src/routes/Ubicacion.Router.jdcc.js"
import RouteElemento from "./src/routes/Elemento.Router.jdcc.js";

const app=express();

//Configuracion
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/',(req, res)=> {
    console.log(process.env);
    res.send('Pagina inicial');
});

app.use('/tipo', RouteTipoElemento);
app.use('/categoria', RouteCategoeria);
app.use('/empaque', RouteEmpaque);
app.use('/medida', RouteMedida);
app.use('/ubicacion', RouteUbicacion);
app.use('/elemento', RouteElemento);

//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});