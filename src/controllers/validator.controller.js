import {pool} from '../database/conexion.js';
import  jwt  from 'jsonwebtoken';

export const validarUsuario = async(req, res) =>{
    try {
      let {email_usuario, contraseña_usuario} = req.body;
      let sql = `select id_usuario, nombre_usuario, apellido_usuario, rol, numero, ID_ficha from usuarios where email_usuario = '${email_usuario}' and contraseña_usuario = '${contraseña_usuario}'`;
      let [rows] = await pool.query(sql);
      
      if(rows.length > 0) {
        //generar token
        let [rows] = await pool.query(sql);
        let token = jwt.sign({user:rows}, process.env.SECRET, {expiresIn: process.env.TIME});
      return res.status(200).json({ "message": "usuario autenticado", "token": token });
      }
      else return res.status(404).json({ "message": "usuario no autenticado"});
    } catch (e) {
      return res.status(500).json({ "message": e.message });
    }
  };

  export const validarToken = async (req, res, next) => {
    try {
      let token_Cliente = req.headers['token'];
      if(!token_Cliente){
      return res.status(402).json({"msg": "token requerido"});
      }else {
    let decode = jwt.verify(token_Cliente, process.env.SECRET,(error, decoded) =>{
      if(error) return res.status(402).json({"msg": "token inválido"});
      else next();
    }); 
    } 
  }catch (e) {
   return res.status(500).json({"msg": e.message})   
  }
  };