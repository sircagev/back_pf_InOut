import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import usuarios from "./src/routes/usuario.router.js";
import validar from "./src/routes/validator.router.js";

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
app.use('/usuario', usuarios);
app.use('/validate',validar);

//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});