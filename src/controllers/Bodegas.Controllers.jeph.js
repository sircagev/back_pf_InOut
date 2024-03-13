import { pool } from '../database/conexion.js';

export const RegistrarBodega = async (req, res) => {
    try {
        const { codigo_bodega, ubicacion_bodega, nombre_bodega } = req.body;

        const sql = `INSERT INTO bodegas (codigo_bodega, ubicacion_bodega, nombre_bodega)
                     VALUES (?, ?, ?)`;
        const values = [codigo_bodega, ubicacion_bodega, nombre_bodega];

        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito la Bodega" });
        } else {
            return res.status(403).json({ "message": "Bodega no registrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": `Error en el servidor: ${e.message}` });
    }
};

export const listarBodegas = async(req,res)=> {

    try{
        const [result] = await pool.query('select * from bodegas');
        
        if(result.length>0){
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({'message': 'No se econtró categorias'});
        }
        
    }catch(e){
        return res.status(500).json({'message': 'error' + e});
    }

};

export const BuscarBodega = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from bodegas where codigo_bodega = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ "message": "Bodega encontrado con éxito", "Elemento": rows[0] });
        } else {
            return res.status(404).json({ "message": "Bodega no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const ActualizarBodega = async (req, res) => {
    try {
        let id = req.params.id;
        let { codigo_bodega, ubicacion_bodega, nombre_bodega } = req.body;
        let sql = `
            UPDATE bodegas
                SET codigo_bodega = ?,
                ubicacion_bodega = ?,
                nombre_bodega = ?
            WHERE codigo_bodega = ?
        `;
        let [rows] = await pool.query(sql, [ codigo_bodega, ubicacion_bodega, nombre_bodega, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Bodega actualizada con éxito" });
        } else {
            return res.status(404).json({ "message": "Bodega no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
}

export const DesactivarBodega = async(req, res) => {
try{

const {id} = req.params;

const sql =`UPDATE elementos SET estado = 'inactivo' WHERE codigo_bodega =?`;
const [result] = await pool.query(sql,[id]);

    

        if(rows.affectedRows > 0) {
            return res.status(200).json({"message": "Bodega desactivada con exito con éxito"});
        } else {
            return res.status(403).json({"message": "Bodega no desactivada"});
        }
    }catch(e) {
        return res.status(500).json({"message": e.message});
    }
};
