$env:DATABASE_URL = "postgresql://postgres:202610@localhost:5432/continental?schema=public"
$env:PGPASSWORD = "202610"
Set-Location "C:\Proyectos\continental\backend"
& npx prisma db push
