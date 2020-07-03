param ($file='./tests/MainTest.ts')
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
    Write-Host "Executing script with deno" -ForegroundColor Yellow
    deno.exe run -A $file
} else {
    Invoke-WebRequest https://deno.land/x/install/install.ps1 -useb | Invoke-Expression
    Write-Host "Deno installed! Running project now!" -ForegroundColor Green
    deno.exe run -A $file
}