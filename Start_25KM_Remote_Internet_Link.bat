@echo off
title TESSELATOR - 25km Remote Internet Relay (Cloudflare Tunnel)
color 0A
cls
echo =====================================================================
echo       TESSELATOR - 25-KM REMOTE INTERNET RELAY (PORT 55)
echo =====================================================================
echo.
echo Checking if local server is active on port 55...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:55' -UseBasicParsing -TimeoutSec 2; Write-Host 'Local server is RUNNING!' -ForegroundColor Green } catch { Write-Host 'Starting local server first...' -ForegroundColor Yellow; Start-Process -FilePath 'npm' -ArgumentList 'run dev' -WindowStyle Minimized }"

echo.
echo Starting secure 25-km Cloudflare Tunnel...
echo This gives you a public HTTPS URL accessible from ANY college computer!
echo.
"%~dp0cloudflared.exe" tunnel --url http://localhost:55
pause
