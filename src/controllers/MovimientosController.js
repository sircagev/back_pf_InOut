import { pool } from "../database/conexion.js";

//Lista Todos los Movimientos
export const ListarTodosMovimientos = async (req, res) => {
    try {
        //Consulta trayendo la información completa de los movimientos
        const sql = `SELECT 
                        Codigo_movimiento AS "Código",
                        fecha_movimiento AS "Fecha",
                        CONCAT(nombre_usuario,' ',apellido_usuario) AS "Usuario",
                        Nombre_movimiento AS "Tipo Movimiento" 
                    FROM detalle_movimiento AS dm 
                    JOIN movimiento AS m ON dm.fk_movimiento = m.Codigo_movimiento
                    JOIN tipo_movimiento AS tm ON m.fk_movimiento = codigo_tipo
                    JOIN usuario AS u ON m.Usuario_solicitud = id_usuario`;

        //Ejecutar la consulta
        const [result] = await pool.query(sql);

        //Revisar que llego información y ejecutar manejo de errores
        if (result.length > 0) {
            return res.status(200).json({ message: "Movimientos listados", datos: result });
        } else {
            return res.status(404).json({ message: "No se encontraron movimientos" });
        }
    } catch (error) {
        //Envair error por servidor
        return res.status(500).json({ message: error });
    }
}

//Registrar nuevos movimientos
export const RegistrarMovimientoPrestamo = async (req, res) => {
    try {
        //Traer datos enviados por el body
        let { usuario_solicitud, fk_movimiento, Estado, detalles } = req.body;

        //Iniciar un transaccion en Sql
        await pool.query("START TRANSACTION");

        //Crear un Nuevo Movimiento de tipo Prestamo
        const sqlMovimientoPrestamo = `INSERT INTO movimiento (usuario_solicitud, fk_movimiento, Estado) 
                                        VALUES (?,?,?)`;
        const valuesMovimientoPrestamo = [usuario_solicitud, fk_movimiento, Estado]
        let [rowsMovimientoPrestamo] = await pool.query(sqlMovimientoPrestamo, valuesMovimientoPrestamo);

        //Obtener ID del movimiento recién creado
        const movimientoID = rowsMovimientoPrestamo.insertId;
        const detallesInfo = [];

        for (const detalle of detalles) {
            //Traer informacion de los detalles
            const { fk_elemento, estado, fecha_vencimiento, cantidad, Usuario_recibe, Usuario_entrega, Observaciones } = detalle;
            console.log(detalle)
            //Insertar de a un detalle
            const detalleSql = `INSERT INTO detalle_movimiento (fk_movimiento, fk_elemento, estado, fecha_vencimiento, cantidad, Usuario_recibe, Usuario_entrega, Observaciones) 
                                    VALUES (?,?,?,?,?,?,?,?)`;
            const detalleValues = [movimientoID, fk_elemento, estado, fecha_vencimiento, cantidad, Usuario_recibe, Usuario_entrega, Observaciones];
            let [detalleRows] = await pool.query(detalleSql, detalleValues);

            detallesInfo.push(detalleRows);
        };

        await pool.query("COMMIT");
        return res.status(200).json({ message: "Registro Exitoso", movimiento: rowsMovimientoPrestamo, detalles: detallesInfo });
    } catch (error) {
        await pool.query("ROLLBACK");
        //Enviar error por servidor
        return res.status(500).json({ message: error });
    }
}