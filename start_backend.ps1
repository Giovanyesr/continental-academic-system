$env:NODE_ENV = "development"
$env:PORT = "3001"
Set-Location "C:\Proyectos\continental\backend"
Write-Host "Starting Backend on port 3001..."
& npx ts-node src/index.ts
