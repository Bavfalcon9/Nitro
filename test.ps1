Function CheckDeno {
    try {
        if (Get-Command deno.exe) {
            return $true;
        } else {
            return $false;
        }
    } catch {
        return $false
    }
}
if (CheckDeno) {
    Write-Host "Starting Tests..." -ForegroundColor Yellow
    deno.exe run -A ./tests/MainTest.ts
} else {
    Invoke-WebRequest https://deno.land/x/install/install.ps1 -useb | Invoke-Expression
    Write-Host "Deno installed! Run ./start.ps1 again to start Test." -ForegroundColor Green
}