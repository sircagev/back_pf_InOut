import {pool} from '../database/conexion.js';

export const RegistrarMedida = async (req, res) => {
    try {
        let {Nombre_Medida} = req.body;
        let sql = `insert into unidad_medida (Nombre_Medida) values (?)`;
        let values = [Nombre_Medida];
        let [result] = await pool.query(sql, values);
        
        if (result.affectedRows > 0) {
            return res.status(200).json({"message": "Unidad de medida registrado con éxito"});
        } else {
            return res.status(400).json({"message": "Unidad de medida no registrado."});
        }
    } catch (error){
        return res.status(500).json(error);
    }
}

export const ListarMedida = async (req, res) => {
    try {
        let [result] = await pool.query(`SELECT * FROM unidad_medida WHERE estado = 'activo'`);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({"message": "No hay tipos de unidades de medida registrados."});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};


export const Buscarmedida = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from unidad_medida where codigo_medida = ?`;

        let [result] = await pool.query(sql, id);

        if(result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({"message": "Unidad de medida no encontrada"});
        }
    } catch {
        return res.status(500).json(error);
    }
}

export const ActualizarMedida = async (req, res) => {
    try {
        let id = req.params.id;
        let {Nombre_Medida} = req.body;
        let sql = `UPDATE unidad_medida SET Nombre_Medida = ? WHERE codigo_medida = ?`;

        let [result] = await pool.query(sql, [Nombre_Medida, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({"Message": "Unidad de medida actualizada con éxito."});
        } else {
            return res.status(400).json({"Message": "Unidad de medida no actualizada."});
        }
    } catch (error){
        return res.status(500).json(error);
    }
}

export const EliminarMedida = async (req, res) => {
    try {
        let id = req.param.id;
        let sql = `delete from unidad_medida where codigo_medida = ?`;
        let [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({"Message": "Unidad de medida eliminada con éxito."});
        } else {
            return res.status(400).json({"Message": "Unidad de medida no eliminada."});
        }
    } catch (error){
        return res.status(500).json(error);                  
    } 
}

export const DesactivarMedida = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `UPDATE unidad_medida SET estado = 'inactivo' WHERE codigo_medida= ?`;

        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Unidad de medida desactivada con éxito." });
        } else {
            return res.status(404).json({ "message": "Unidad de medida no desactivada." });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};