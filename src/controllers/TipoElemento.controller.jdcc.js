import {pool} from '../database/conexion.js';

export const RegistrarTipo = async (req, res) => {
    try {
        let {nombre_tipoElemento} = req.body;
        let sql = `insert into tipo_elemento (nombre_tipoElemento) values (?)`;
        let values = [nombre_tipoElemento];
        let [result] = await pool.query(sql, values);
        
        if (result.affectedRows > 0) {
            return res.status(200).json({"message": "Tipo elemento registrado con éxito"});
        } else {
            return res.status(400).json({"message": "tipo elemento no registrado."});
        }
    } catch (error){
        return res.status(500).json(error);
    }
}

export const ListarTipo = async (req, res) => {
    try {
        let [result] = await pool.query(`SELECT * FROM tipo_elemento WHERE estado = 'activo'`);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({"message": "No hay tipos de elemento registrados con estado activo."});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};


export const BuscarTipo = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from tipo_elemento where codigo_Tipo = ?`;

        let [result] = await pool.query(sql, id);

        if(result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({"message": "Tipo elemento no encontrado"});
        }
    } catch {
        return res.status(500).json(error);
    }
}

export const ActualizarTipo = async (req, res) => {
    try {
        let id = req.params.id;
        let {nombre_tipoElemento} = req.body;
        let sql = `UPDATE tipo_elemento SET nombre_tipoElemento = ? WHERE codigo_Tipo = ?`;

        let [result] = await pool.query(sql, [nombre_tipoElemento, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({"Message": "Tipo Elemento actualizado con éxito."});
        } else {
            return res.status(400).json({"Message": "Tipo Elemento no actualizado."});
        }
    } catch (error){
        return res.status(500).json(error);
    }
}

export const EliminarTipo = async (req, res) => {
    try {
        let id = req.param.id;
        let sql = `delete from tipo_elemento where codigo_Tipo = ?`;
        let [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({"Message": "Tipo Elemento eliminado con éxito."});
        } else {
            return res.status(400).json({"Message": "Tipo Elemento no eliminado."});
        }
    } catch (error){
        return res.status(500).json(error);                  
    } 
}

export const DesactivarTipo = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `UPDATE tipo_elemento SET estado = 'inactivo' WHERE codigo_Tipo = ?`;

        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Tipo Elemento desactivado con éxito." });
        } else {
            return res.status(404).json({ "message": "Tipo Elemento no desactivado." });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};