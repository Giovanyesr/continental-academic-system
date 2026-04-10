import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  console.log("LOGIN BODY:", req.body);
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
  }

  try {
    const estudiante = await prisma.estudiante.findUnique({
      where: { correo },
    });

    if (!estudiante) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    if (estudiante.password !== password) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    res.json({
      id: estudiante.id,
      dni: estudiante.dni,
      nombre: estudiante.nombre,
      correo: estudiante.correo,
      codigo_universitario: estudiante.codigo_universitario,
      carrera: estudiante.carrera,
      facultad: estudiante.facultad,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Get current user by ID
app.get('/api/auth/user/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const estudiante = await prisma.estudiante.findUnique({
      where: { id },
    });

    if (!estudiante) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json({
      id: estudiante.id,
      dni: estudiante.dni,
      nombre: estudiante.nombre,
      correo: estudiante.correo,
      codigo_universitario: estudiante.codigo_universitario,
      carrera: estudiante.carrera,
      facultad: estudiante.facultad,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 1. Buscar estudiante por DNI o código
app.get('/api/estudiantes/:criterio', async (req, res) => {
  const { criterio } = req.params;
  try {
    const estudiante = await prisma.estudiante.findFirst({
      where: {
        OR: [{ dni: criterio }, { codigo_universitario: criterio }],
      },
    });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado en el sistema.' });
    }

    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 2. Obtener catálogo de servicios (dividido por fases)
app.get('/api/servicios', async (req, res) => {
  try {
    const servicios = await prisma.servicio.findMany({
      orderBy: { fase: 'asc' },
    });

    // Agrupar por fase
    const catalogo: Record<number, any[]> = {};
    servicios.forEach((s) => {
      if (!catalogo[s.fase]) {
        catalogo[s.fase] = [];
      }
      catalogo[s.fase].push(s);
    });

    res.json({ catalogo, flatten: servicios });
  } catch (error) {
    res.status(500).json({ error: 'Error cargando los servicios.' });
  }
});

// 3. Obtener historial de pagos de un estudiante
app.get('/api/estudiantes/:id/pagos', async (req, res) => {
  const estudianteId = parseInt(req.params.id);
  try {
    const pagos = await prisma.pago.findMany({
      where: { estudiante_id: estudianteId },
      include: {
        detalles: {
          include: { servicio: true }
        }
      },
      orderBy: { fecha: 'desc' }
    });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar los pagos' });
  }
});

// 4. Procesar el Pago (Simulación de pasarela)
app.post('/api/pagos', async (req, res) => {
  const { estudiante_id, metodo_pago, banco, servicios_ids, tipo_pago, dni_pagador, fecha_nacimiento, provincia_pagador } = req.body;

  try {
    if (!estudiante_id) {
      return res.status(400).json({ error: 'ID de estudiante requerido.' });
    }

    if (!banco) {
      return res.status(400).json({ error: 'Selecciona un banco.' });
    }

    if (!servicios_ids || servicios_ids.length === 0) {
      return res.status(400).json({ error: 'Selecciona al menos un servicio.' });
    }

    const serviciosAComprar = await prisma.servicio.findMany({
      where: {
        id: { in: servicios_ids }
      }
    });

    if (serviciosAComprar.length !== servicios_ids.length) {
      return res.status(400).json({ error: 'Algunos servicios no son válidos.' });
    }

    const monto_total = serviciosAComprar.reduce((total, s) => total + s.precio, 0);

    const nuevoPago = await prisma.pago.create({
      data: {
        estudiante_id,
        monto_total,
        metodo_pago: metodo_pago || 'Tarjeta',
        banco,
        tipo_pago: tipo_pago || 'TARJETA',
        dni_pagador: dni_pagador || null,
        provincia_pagador: provincia_pagador || null,
        validado_dni: tipo_pago === 'DNI',
        estado: 'COMPLETADO',
        detalles: {
          create: serviciosAComprar.map((s) => ({
            servicio_id: s.id,
            precio: s.precio,
          }))
        }
      },
      include: {
        detalles: {
          include: { servicio: true }
        },
        estudiante: true
      }
    });

    res.status(201).json({
      message: 'Pago procesado correctamente.',
      pago: nuevoPago,
      success: true
    });

  } catch (error) {
    console.error('Error en pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago.' });
  }
});

const datosReniec: Record<string, { nombres: string; paterno: string; materno: string }> = {
  '40389963': { nombres: 'Martina', paterno: 'Ramos', materno: 'Arone' },
};

app.get('/api/dni/:dni', async (req, res) => {
  const { dni } = req.params;

  if (!dni || dni.length !== 8) {
    return res.status(400).json({ error: 'DNI debe tener 8 dígitos.' });
  }

  const datos = datosReniec[dni];

  if (datos) {
    res.json({
      success: true,
      nombreCompleto: `${datos.nombres} ${datos.paterno} ${datos.materno}`.trim(),
      nombres: datos.nombres,
      paterno: datos.paterno,
      materno: datos.materno
    });
  } else {
    res.json({
      success: false,
      error: 'No se encontraron datos para este DNI.'
    });
  }
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[🚀] Backend Universitario corriendo exitosamente en el puerto ${PORT}`);
});
