$env:PGPASSWORD = "202610"
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

try {
    & $psqlPath -h localhost -U postgres -d continental -c "SELECT 1 as test;" 2>&1
} catch {
    Write-Host "Error: $_"
}
