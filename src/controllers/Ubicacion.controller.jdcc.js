import {pool} from '../database/conexion.js';

export const RegistrarUbicacion = async (req, res) => {
    try {
        let {Nombre_ubicacion, fk_bodega} = req.body;
        let sql = `insert into detalle_ubicacion (Nombre_ubicacion, fk_bodega) values (?,?)`;
        let values = [Nombre_ubicacion, fk_bodega];
        let [result] = await pool.query(sql, values);
        
        if (result.affectedRows > 0) {
            return res.status(200).json({"message": "Detalle_ubicacion registrada con éxito"});
        } else {
            return res.status(400).json({"message": "Detalle_ubicacion no registrada."});
        }
    } catch (error){
        return res.status(500).json(error);
    }
}

export const ListarUbicacion = async (req, res) => {
    try {
        let [result] = await pool.query(`SELECT * FROM detalle_ubicacion WHERE estado = 'activo'`);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({"message": "No hay detalles de ubicación registrados."});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};


export const BuscarUbicacion = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from detalle_ubicacion where codigo_Detalle = ?`;

        let [result] = await pool.query(sql, id);

        if(result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({"message": "Detalle de ubicacion no encontrada"});
        }
    } catch {
        return res.status(500).json(error);
    }
}

export const ActualizarUbicacion = async (req, res) => {
    try {
        let id = req.params.id;
        let {Nombre_ubicacion, fk_bodega} = req.body;
        let sql = `UPDATE detalle_ubicacion SET Nombre_ubicacion = ?, fk_bodega = ?  WHERE codigo_Detalle = ?`;

        let [result] = await pool.query(sql, [Nombre_ubicacion, fk_bodega, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({"Message": "Detalle de ubicación actualizado con éxito."});
        } else {
            return res.status(400).json({"Message": "Detalle de ubicación no actualizado."});
        }
    } catch (error){
        return res.status(500).json(error);
    }
}

export const EliminarUbicacion = async (req, res) => {
    try {
        let id = req.param.id;
        let sql = `delete from detalle_ubicacion where codigo_Detalle = ?`;
        let [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({"Message": "Detalle de ubicación eliminado con éxito."});
        } else {
            return res.status(400).json({"Message": "Detalle de ubicación no eliminado."});
        }
    } catch (error){
        return res.status(500).json(error);                  
    } 
}

export const Desactivarubicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `UPDATE detalle_ubicacion SET estado = 'inactivo' WHERE codigo_Detalle = ?`;

        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Detalle de ubicación desactivado con éxito." });
        } else {
            return res.status(404).json({ "message": "Detalle de ubicación no desactivado." });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};