-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "codigo_universitario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fecha_nacimiento" TEXT,
    "provincia_nacimiento" TEXT,
    "nombre_padre" TEXT,
    "nombre_madre" TEXT,
    "carrera" TEXT NOT NULL,
    "facultad" TEXT NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" SERIAL NOT NULL,
    "estudiante_id" INTEGER NOT NULL,
    "monto_total" DOUBLE PRECISION NOT NULL,
    "metodo_pago" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'COMPLETADO',
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_pago" TEXT NOT NULL DEFAULT 'TARJETA',
    "dni_pagador" TEXT,
    "region_pagador" TEXT,
    "provincia_pagador" TEXT,
    "distrito_pagador" TEXT,
    "validado_dni" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "fase" INTEGER NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetallePago" (
    "id" SERIAL NOT NULL,
    "pago_id" INTEGER NOT NULL,
    "servicio_id" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DetallePago_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_dni_key" ON "Estudiante"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_codigo_universitario_key" ON "Estudiante"("codigo_universitario");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_correo_key" ON "Estudiante"("correo");

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePago" ADD CONSTRAINT "DetallePago_pago_id_fkey" FOREIGN KEY ("pago_id") REFERENCES "Pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallePago" ADD CONSTRAINT "DetallePago_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
