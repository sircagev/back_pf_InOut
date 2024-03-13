-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 13-03-2024 a las 02:35:29
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_inout`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodega`
--

CREATE TABLE `bodega` (
  `codigo_Bodega` int NOT NULL,
  `ubicacion` varchar(50) NOT NULL,
  `Nombre_bodega` varchar(50) NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bodega`
--

INSERT INTO `bodega` (`codigo_Bodega`, `ubicacion`, `Nombre_bodega`, `Estado`) VALUES
(1, 'Calle 1, Ciudad X', 'Bodega Principal', 'Activo'),
(2, 'Avenida 2, Ciudad Y', 'Almacén Secundario', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_elemento`
--

CREATE TABLE `categoria_elemento` (
  `codigo_Categoria` int NOT NULL,
  `Nombre_Categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria_elemento`
--

INSERT INTO `categoria_elemento` (`codigo_Categoria`, `Nombre_Categoria`) VALUES
(1, 'Informática'),
(2, 'Mobiliario'),
(3, 'Electrónica'),
(4, 'Accesorios'),
(5, 'Material de Oficina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_movimiento`
--

CREATE TABLE `detalle_movimiento` (
  `codigo_detalle` int NOT NULL,
  `fk_movimiento` int DEFAULT NULL,
  `fk_elemento` int DEFAULT NULL,
  `estado` enum('Confirmada','En espera','Cancelada','En Prestamo','Finalizada') DEFAULT 'En espera',
  `fecha_vencimiento` date DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `Usuario_recibe` int DEFAULT NULL,
  `Usuario_entrega` int DEFAULT NULL,
  `Observaciones` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_movimiento`
--

INSERT INTO `detalle_movimiento` (`codigo_detalle`, `fk_movimiento`, `fk_elemento`, `estado`, `fecha_vencimiento`, `cantidad`, `Usuario_recibe`, `Usuario_entrega`, `Observaciones`) VALUES
(1, 1, 1, NULL, '2024-03-15', 10, 2, 1, 'Entrega'),
(2, 2, 2, NULL, '2024-03-16', 5, 3, 2, ''),
(3, 3, 3, 'Cancelada', NULL, 0, NULL, NULL, 'Cancelado por falta de stock'),
(4, 4, 1, NULL, '2024-03-17', 3, 4, 5, 'Mas elementos'),
(5, 5, 2, NULL, '2024-03-18', 8, 5, 1, 'Se despacharon correctamente los elementos'),
(6, 7, 1, NULL, '2024-03-15', 5, 1, 2, 'Ninguna'),
(7, 7, 2, NULL, '2024-03-15', 5, 1, 2, 'Ninguna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ubicacion`
--

CREATE TABLE `detalle_ubicacion` (
  `codigo_Detalle` int NOT NULL,
  `Nombre_ubicacion` varchar(50) NOT NULL,
  `fk_bodega` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_ubicacion`
--

INSERT INTO `detalle_ubicacion` (`codigo_Detalle`, `Nombre_ubicacion`, `fk_bodega`) VALUES
(1, 'Estantería A', 1),
(2, 'Almacén B', 2),
(3, 'Oficina Principal', 1),
(4, 'Almacén C', 2),
(5, 'Estantería B', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elemento`
--

CREATE TABLE `elemento` (
  `Codigo_elemento` int NOT NULL,
  `Nombre_elemento` varchar(50) NOT NULL,
  `stock` int DEFAULT NULL,
  `fk_tipoElemento` int DEFAULT NULL,
  `fk_unidadMedida` int DEFAULT NULL,
  `fk_categoria` int DEFAULT NULL,
  `fk_tipoEmpaque` int DEFAULT NULL,
  `fk_detalleUbicacion` int DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `elemento`
--

INSERT INTO `elemento` (`Codigo_elemento`, `Nombre_elemento`, `stock`, `fk_tipoElemento`, `fk_unidadMedida`, `fk_categoria`, `fk_tipoEmpaque`, `fk_detalleUbicacion`, `Estado`) VALUES
(1, 'Computadora', 20, 1, 1, 1, 1, 1, 'Activo'),
(2, 'Impresora', 15, 2, 2, 2, 2, 2, 'Activo'),
(3, 'Teléfono', 30, 1, 1, 1, 1, 3, 'Activo'),
(4, 'Escritorio', 10, 2, 2, 2, 2, 4, 'Inactivo'),
(5, 'Silla', 25, 1, 1, 1, 1, 5, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `Codigo_movimiento` int NOT NULL,
  `fecha_movimiento` date DEFAULT NULL,
  `Usuario_solicitud` int DEFAULT NULL,
  `fk_movimiento` int DEFAULT NULL,
  `Estado` enum('Confirmada','En espera','Cancelada','En Prestamo','Finalizada') DEFAULT 'En espera'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `movimiento`
--

INSERT INTO `movimiento` (`Codigo_movimiento`, `fecha_movimiento`, `Usuario_solicitud`, `fk_movimiento`, `Estado`) VALUES
(1, '2024-03-10', 1, 1, NULL),
(2, '2024-03-11', 2, 2, NULL),
(3, '2024-03-12', 3, 3, 'Cancelada'),
(4, '2024-03-13', 4, 1, NULL),
(5, '2024-03-14', 5, 2, NULL),
(7, NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_elemento`
--

CREATE TABLE `tipo_elemento` (
  `codigo_Tipo` int NOT NULL,
  `nombre_tipoElemento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_elemento`
--

INSERT INTO `tipo_elemento` (`codigo_Tipo`, `nombre_tipoElemento`) VALUES
(1, 'Devolutivo'),
(2, 'Consumible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_empaque`
--

CREATE TABLE `tipo_empaque` (
  `codigo_Empaque` int NOT NULL,
  `Nombre_Empaque` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_empaque`
--

INSERT INTO `tipo_empaque` (`codigo_Empaque`, `Nombre_Empaque`) VALUES
(1, 'Caja'),
(2, 'Bolsa'),
(3, 'Paquete'),
(4, 'Contenedor'),
(5, 'Sobre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_movimiento`
--

CREATE TABLE `tipo_movimiento` (
  `codigo_tipo` int NOT NULL,
  `Nombre_movimiento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_movimiento`
--

INSERT INTO `tipo_movimiento` (`codigo_tipo`, `Nombre_movimiento`) VALUES
(1, 'Ingreso'),
(2, 'Egreso'),
(3, 'Prestamo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE `unidad_medida` (
  `codigo_medida` int NOT NULL,
  `Nombre_Medida` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `unidad_medida`
--

INSERT INTO `unidad_medida` (`codigo_medida`, `Nombre_Medida`) VALUES
(1, 'Gramo'),
(2, 'Kilogramo'),
(3, 'Metro Cubico'),
(4, 'Centimetro Cubico'),
(5, 'Litro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `apellido_usuario` varchar(50) DEFAULT NULL,
  `email_usuario` varchar(100) DEFAULT NULL,
  `rol` enum('administrador','Encargado','Usuario') DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `contraseña_usuario` varchar(255) DEFAULT NULL,
  `Id_ficha` int DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `email_usuario`, `rol`, `numero`, `contraseña_usuario`, `Id_ficha`, `Estado`) VALUES
(1, 'Juan', 'Perez', 'juan@example.com', 'administrador', '123456789', 'hashed_password_1', 1, 'Activo'),
(2, 'Maria', 'Gomez', 'maria@example.com', 'Encargado', '987654321', 'hashed_password_2', 2, 'Activo'),
(3, 'Pedro', 'Rodriguez', 'pedro@example.com', 'Usuario', '456789123', 'hashed_password_3', 3, 'Inactivo'),
(4, 'Ana', 'Lopez', 'ana@example.com', 'Usuario', '789123456', 'hashed_password_4', 4, 'Activo'),
(5, 'Laura', 'Martinez', 'laura@example.com', 'Usuario', '321654987', 'hashed_password_5', 5, 'Activo');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_stock`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_stock` (
`Codigo_elemento` int
,`Nombre_elemento` varchar(50)
,`stock` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_stock`
--
DROP TABLE IF EXISTS `vista_stock`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_stock`  AS SELECT `e`.`Codigo_elemento` AS `Codigo_elemento`, `e`.`Nombre_elemento` AS `Nombre_elemento`, coalesce(sum((case when (`m`.`fk_movimiento` = 1) then `dm`.`cantidad` when (`m`.`fk_movimiento` = 2) then -(`dm`.`cantidad`) when ((`m`.`fk_movimiento` = 3) and (`dm`.`estado` = 'En Prestamo')) then -(`dm`.`cantidad`) else 0 end)),0) AS `stock` FROM ((`elemento` `e` left join `detalle_movimiento` `dm` on((`e`.`Codigo_elemento` = `dm`.`fk_elemento`))) left join `movimiento` `m` on((`dm`.`fk_movimiento` = `m`.`Codigo_movimiento`))) GROUP BY `e`.`Codigo_elemento`, `e`.`Nombre_elemento` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bodega`
--
ALTER TABLE `bodega`
  ADD PRIMARY KEY (`codigo_Bodega`);

--
-- Indices de la tabla `categoria_elemento`
--
ALTER TABLE `categoria_elemento`
  ADD PRIMARY KEY (`codigo_Categoria`);

--
-- Indices de la tabla `detalle_movimiento`
--
ALTER TABLE `detalle_movimiento`
  ADD PRIMARY KEY (`codigo_detalle`),
  ADD KEY `fk_elemento_detalle` (`fk_elemento`),
  ADD KEY `fk_usuario_entrega_detalle` (`Usuario_entrega`);

--
-- Indices de la tabla `detalle_ubicacion`
--
ALTER TABLE `detalle_ubicacion`
  ADD PRIMARY KEY (`codigo_Detalle`),
  ADD KEY `fk_bodega_detalleUbicacion` (`fk_bodega`);

--
-- Indices de la tabla `elemento`
--
ALTER TABLE `elemento`
  ADD PRIMARY KEY (`Codigo_elemento`),
  ADD KEY `fk_tipoElemento_elemento` (`fk_tipoElemento`),
  ADD KEY `fk_unidadMedida_elemento` (`fk_unidadMedida`),
  ADD KEY `fk_categoria_elemento` (`fk_categoria`),
  ADD KEY `fk_tipoEmpaque_elemento` (`fk_tipoEmpaque`),
  ADD KEY `fk_detalleUbicacion_elemento` (`fk_detalleUbicacion`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`Codigo_movimiento`),
  ADD KEY `fk_usuario_movimiento` (`Usuario_solicitud`),
  ADD KEY `fk_tipo_movimiento` (`fk_movimiento`);

--
-- Indices de la tabla `tipo_elemento`
--
ALTER TABLE `tipo_elemento`
  ADD PRIMARY KEY (`codigo_Tipo`);

--
-- Indices de la tabla `tipo_empaque`
--
ALTER TABLE `tipo_empaque`
  ADD PRIMARY KEY (`codigo_Empaque`);

--
-- Indices de la tabla `tipo_movimiento`
--
ALTER TABLE `tipo_movimiento`
  ADD PRIMARY KEY (`codigo_tipo`);

--
-- Indices de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD PRIMARY KEY (`codigo_medida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bodega`
--
ALTER TABLE `bodega`
  MODIFY `codigo_Bodega` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria_elemento`
--
ALTER TABLE `categoria_elemento`
  MODIFY `codigo_Categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_movimiento`
--
ALTER TABLE `detalle_movimiento`
  MODIFY `codigo_detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detalle_ubicacion`
--
ALTER TABLE `detalle_ubicacion`
  MODIFY `codigo_Detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `elemento`
--
ALTER TABLE `elemento`
  MODIFY `Codigo_elemento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `Codigo_movimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_elemento`
--
ALTER TABLE `tipo_elemento`
  MODIFY `codigo_Tipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_empaque`
--
ALTER TABLE `tipo_empaque`
  MODIFY `codigo_Empaque` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_movimiento`
--
ALTER TABLE `tipo_movimiento`
  MODIFY `codigo_tipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  MODIFY `codigo_medida` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_movimiento`
--
ALTER TABLE `detalle_movimiento`
  ADD CONSTRAINT `fk_elemento_detalle` FOREIGN KEY (`fk_elemento`) REFERENCES `elemento` (`Codigo_elemento`),
  ADD CONSTRAINT `fk_usuario_entrega_detalle` FOREIGN KEY (`Usuario_entrega`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `detalle_ubicacion`
--
ALTER TABLE `detalle_ubicacion`
  ADD CONSTRAINT `fk_bodega_detalleUbicacion` FOREIGN KEY (`fk_bodega`) REFERENCES `bodega` (`codigo_Bodega`);

--
-- Filtros para la tabla `elemento`
--
ALTER TABLE `elemento`
  ADD CONSTRAINT `fk_categoria_elemento` FOREIGN KEY (`fk_categoria`) REFERENCES `categoria_elemento` (`codigo_Categoria`),
  ADD CONSTRAINT `fk_detalleUbicacion_elemento` FOREIGN KEY (`fk_detalleUbicacion`) REFERENCES `detalle_ubicacion` (`codigo_Detalle`),
  ADD CONSTRAINT `fk_tipoElemento_elemento` FOREIGN KEY (`fk_tipoElemento`) REFERENCES `tipo_elemento` (`codigo_Tipo`),
  ADD CONSTRAINT `fk_tipoEmpaque_elemento` FOREIGN KEY (`fk_tipoEmpaque`) REFERENCES `tipo_empaque` (`codigo_Empaque`),
  ADD CONSTRAINT `fk_unidadMedida_elemento` FOREIGN KEY (`fk_unidadMedida`) REFERENCES `unidad_medida` (`codigo_medida`);

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `fk_tipo_movimiento` FOREIGN KEY (`fk_movimiento`) REFERENCES `tipo_movimiento` (`codigo_tipo`),
  ADD CONSTRAINT `fk_usuario_movimiento` FOREIGN KEY (`Usuario_solicitud`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
