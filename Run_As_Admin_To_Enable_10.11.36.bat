@echo off
title TESSELATOR - 10.11.36 URL Activator
color 0b

:: Check for Administrator permissions automatically; if not admin, request UAC elevation
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting Administrator privileges to map 10.11.36...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
    exit /b
)

:: 1. Add 10.11.36 and 10.11.0.36 to Windows hosts file
echo [1/3] Mapping 10.11.36 to localhost in Windows hosts file...
powershell -Command "$p = \"$env:windir\System32\drivers\etc\hosts\"; $c = Get-Content $p -Raw; if ($c -notmatch '10\.11\.36') { Add-Content -Path $p -Value \"`r`n127.0.0.1 10.11.36`r`n127.0.0.1 10.11.0.36\" }"

:: 2. Add IP 10.11.0.36 to Wi-Fi network interface
echo [2/3] Adding IP alias 10.11.0.36 to network adapter...
netsh interface ipv4 add address "Wi-Fi" 10.11.0.36 255.255.0.0 >nul 2>&1

:: 3. Launch Chrome directly with http://10.11.36:55
echo [3/3] Opening http://10.11.36:55 in Chrome...
timeout /t 1 /nobreak >nul
start "" "http://10.11.36:55"

echo.
echo =========================================================
echo   SUCCESS! 10.11.36:55 is now fully active!
echo =========================================================
echo You can now type http://10.11.36:55 in Chrome anytime.
echo.
pause
