"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log(`Iniciando el seeder...`);
    await prisma.detallePago.deleteMany();
    await prisma.pago.deleteMany();
    await prisma.servicio.deleteMany();
    await prisma.estudiante.deleteMany();
    await prisma.estudiante.create({
        data: {
            dni: '00000000',
            codigo_universitario: '00000001',
            nombre: 'Estudiante Demo',
            correo: 'demo@continental.edu.pe',
            password: 'demo123',
            fecha_nacimiento: '2000-01-01',
            provincia_nacimiento: 'Lima',
            carrera: 'Ingeniería de Sistemas',
            facultad: 'Ingeniería',
        },
    });
    const serviciosFase1 = [
        { nombre: 'Asesor académico', categoria: 'Tesis', precio: 1500, fase: 1 },
        { nombre: 'Primera revisión de proyecto', categoria: 'Tesis', precio: 1400, fase: 1 },
        { nombre: 'Revisión adicional', categoria: 'Tesis', precio: 1200, fase: 1 },
        { nombre: 'Cambio de asesor', categoria: 'Tesis', precio: 1100, fase: 1 },
    ];
    const serviciosFase2 = [
        { nombre: 'Revisión de tesis final', categoria: 'Sustentación', precio: 960, fase: 2 },
        { nombre: 'Selección de jurados', categoria: 'Sustentación', precio: 800, fase: 2 },
        { nombre: 'Derecho de sustentación', categoria: 'Sustentación', precio: 750, fase: 2 },
        { nombre: 'Programación de defensa', categoria: 'Sustentación', precio: 750, fase: 2 },
        { nombre: 'Reprogramación de defensa', categoria: 'Sustentación', precio: 700, fase: 2 },
    ];
    const serviciosFase3 = [
        { nombre: 'Trámite de bachiller', categoria: 'Bachiller', precio: 1000, fase: 3 },
        { nombre: 'Trámite de titulación', categoria: 'Titulación', precio: 1500, fase: 3 },
        { nombre: 'Emisión de diploma', categoria: 'Diploma', precio: 500, fase: 3 },
    ];
    const serviciosFase4 = [
        { nombre: 'Carné universitario (nuevo)', categoria: 'Carné', precio: 25, fase: 4 },
        { nombre: 'Carné universitario (renovación)', categoria: 'Carné', precio: 15, fase: 4 },
        { nombre: 'Duplicado de carné', categoria: 'Carné', precio: 30, fase: 4 },
    ];
    const serviciosFase5 = [
        { nombre: 'Constancia de estudios', categoria: 'Certificados', precio: 20, fase: 5 },
        { nombre: 'Constancia de promedio', categoria: 'Certificados', precio: 15, fase: 5 },
        { nombre: 'Certificado de estudios', categoria: 'Certificados', precio: 50, fase: 5 },
        { nombre: 'Historial académico', categoria: 'Certificados', precio: 35, fase: 5 },
    ];
    const serviciosFase6 = [
        { nombre: 'Carné de biblioteca', categoria: 'Biblioteca', precio: 10, fase: 6 },
        { nombre: 'Multa por atraso', categoria: 'Biblioteca', precio: 5, fase: 6 },
        { nombre: 'Reposición de libro', categoria: 'Biblioteca', precio: 80, fase: 6 },
        { nombre: 'Acceso a base de datos', categoria: 'Biblioteca', precio: 0, fase: 6 },
    ];
    const serviciosFase7 = [
        { nombre: 'Gym / Centro deportivo', categoria: 'Deportes', precio: 80, fase: 7 },
        { nombre: 'Torneos interuniversitarios', categoria: 'Deportes', precio: 50, fase: 7 },
        { nombre: 'Alquiler de implementos', categoria: 'Deportes', precio: 15, fase: 7 },
        { nombre: 'Clases de natación', categoria: 'Deportes', precio: 120, fase: 7 },
    ];
    const serviciosFase8 = [
        { nombre: 'Seguro médico universitario', categoria: 'Bienestar', precio: 150, fase: 8 },
        { nombre: 'Asesoría psicológica', categoria: 'Bienestar', precio: 0, fase: 8 },
        { nombre: 'Bolsa de trabajo', categoria: 'Bienestar', precio: 0, fase: 8 },
        { nombre: 'Taller de empleabilidad', categoria: 'Bienestar', precio: 30, fase: 8 },
        { nombre: 'Residencia universitaria', categoria: 'Bienestar', precio: 400, fase: 8 },
    ];
    const todos = [...serviciosFase1, ...serviciosFase2, ...serviciosFase3, ...serviciosFase4, ...serviciosFase5, ...serviciosFase6, ...serviciosFase7, ...serviciosFase8];
    await prisma.servicio.createMany({ data: todos });
    console.log(`Se insertaron ${todos.length} servicios.`);
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
