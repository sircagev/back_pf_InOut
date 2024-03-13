//Importaciones de Configuracion
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//Importaciones de rutas
import movimientosRoute from './src/routes/Movimientos.routes.js'

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

app.use('/movimientos', movimientosRoute);

//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});