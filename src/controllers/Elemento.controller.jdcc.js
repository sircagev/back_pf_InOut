import { pool } from '../database/conexion.js';

export const RegistrarElemento = async (req, res) => {
    try {
        let {Nombre_elemento, stock, fk_tipoElemento, fk_unidadMedida, fk_categoria, fk_tipoEmpaque, fk_detalleUbicacion} = req.body;
        let sql = `insert into elemento (Nombre_elemento, stock, fk_tipoElemento, fk_unidadMedida, fk_categoria, fk_tipoEmpaque, fk_detalleUbicacion) 
                   values (?, ?, ?, ?, ?, ?, ?)`;
        let values = [Nombre_elemento, stock, fk_tipoElemento, fk_unidadMedida, fk_categoria, fk_tipoEmpaque, fk_detalleUbicacion];
        let [result] = await pool.query(sql, values);
        
        if (result.affectedRows > 0) {
            return res.status(200).json({"message": "Elemento registrado con éxito"});
        } else {
            return res.status(400).json({"message": "Elemento no registrado."});
        }
    } catch (error){
        return res.status(500).json(error);
    }
}

export const ListarElemetos = async (req, res) => {
    try {
        let [result] = await pool.query(
                `SELECT e.*, c.nombre_categoria, n.nombre_tipoElemento, me.Nombre_Medida, em.Nombre_empaque, u.Nombre_ubicacion
                FROM elemento AS e 
                JOIN categoria_elemento AS c ON e.fk_categoria = c.codigo_categoria 
                JOIN tipo_elemento AS n ON e.fk_tipoElemento = n.codigo_Tipo
                JOIN unidad_medida AS me ON e.fk_unidadMedida = me.codigo_medida
                JOIN tipo_empaque AS em ON e.fk_tipoEmpaque = em.Codigo_empaque
                JOIN detalle_ubicacion AS u ON e.fk_detalleUbicacion = u.codigo_Detalle
                WHERE e.Estado = 'Activo'
                ORDER BY e.codigo_elemento ASC`);
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ "message": "No hay elementos si." });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

export const BuscarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from elemento where Codigo_elemento = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ "message": "Elemento encontrado con éxito", "Elemento": rows[0] });
        } else {
            return res.status(404).json({ "message": "Elemento no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
}

export const ActualizarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let { Nombre_elemento, stock, fk_tipoElemento, fk_unidadMedida, fk_categoria, fk_tipoEmpaque, fk_detalleUbicacion } = req.body;
        let sql = `UPDATE elemento SET
                   Nombre_elemento = ? ,
                   stock = ?,
                   fk_tipoElemento = ?,
                   fk_unidadMedida = ?,
                   fk_categoria = ?,
                   fk_tipoEmpaque = ?, 
                   fk_detalleUbicacion = ?
                   WHERE Codigo_elemento = ?`;
        let [result] = await pool.query(sql, [Nombre_elemento, stock, fk_tipoElemento, fk_unidadMedida, fk_categoria, fk_tipoEmpaque, fk_detalleUbicacion, id]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Elemento actualizado." });
        } else {
            return res.status(404).json({ "message": "Elemento no actualizado." })
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
};

export const EliminarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from elemento where Codigo_elemento = ?`;
        let [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Elemento eliminado" });
        } else {
            return res.status(404).json({ "message": "Elemento no eliminado" });
        }
    } catch (error) {
        return res.status(500).json({ "message": error.message });
    }
}

export const DesactivarElementos = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `UPDATE elemento SET estado = 'inactivo' WHERE Codigo_elemento = ?`;

        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Elemento desactivado con éxito." });
        } else {
            return res.status(404).json({ "message": "Elemento no desactivado." });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};