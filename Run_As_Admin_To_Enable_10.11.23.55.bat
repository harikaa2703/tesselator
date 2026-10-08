@echo off
title TESSELATOR - 10.11.23.55 URL Activator
color 0b

:: Check for Administrator permissions automatically; if not admin, request UAC elevation
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting Administrator privileges to map 10.11.23.55...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
    exit /b
)

echo =========================================================
echo    ACTIVATING http://10.11.23.55 COLLEGE PORTAL URL
echo =========================================================
echo.

:: 1. Add 10.11.23.55 to Windows hosts file
echo [1/4] Mapping 10.11.23.55 to localhost in Windows hosts file...
powershell -Command "$p = \"$env:windir\System32\drivers\etc\hosts\"; $c = Get-Content $p -Raw; if ($c -notmatch '10\.11\.23\.55') { Add-Content -Path $p -Value \"`r`n127.0.0.1 10.11.23.55`r`n::1 10.11.23.55`r`n\" }"

:: 2. Route 10.11.23.55 directly to localhost loopback
echo [2/4] Adding route and loopback address for 10.11.23.55...
route add 10.11.23.55 mask 255.255.255.255 127.0.0.1 metric 1 >nul 2>&1
netsh interface ipv4 add address "Loopback Pseudo-Interface 1" 10.11.23.55 255.255.255.255 >nul 2>&1
netsh interface ipv4 add address "Wi-Fi" 10.11.23.55 255.255.255.0 >nul 2>&1

:: 3. Add PortProxy forwarding for both Port 80 and Port 55
echo [3/4] Forwarding Port 80 and Port 55 to TESSELATOR app...
netsh interface portproxy delete v4tov4 listenaddress=10.11.23.55 listenport=80 >nul 2>&1
netsh interface portproxy delete v4tov4 listenaddress=10.11.23.55 listenport=55 >nul 2>&1
netsh interface portproxy add v4tov4 listenaddress=10.11.23.55 listenport=80 connectaddress=127.0.0.1 connectport=55 >nul 2>&1
netsh interface portproxy add v4tov4 listenaddress=10.11.23.55 listenport=55 connectaddress=127.0.0.1 connectport=55 >nul 2>&1
netsh interface portproxy add v4tov4 listenaddress=127.0.0.1 listenport=80 connectaddress=127.0.0.1 connectport=55 >nul 2>&1

:: 4. Flush DNS and launch Chrome
echo [4/4] Flushing DNS cache and opening http://10.11.23.55...
ipconfig /flushdns >nul 2>&1
timeout /t 1 /nobreak >nul
start "" "http://10.11.23.55"

echo.
echo =========================================================
echo   SUCCESS! http://10.11.23.55 is now fully active!
echo =========================================================
echo Both http://10.11.23.55 and http://10.11.23.55:55 will open the app!
echo.
pause
