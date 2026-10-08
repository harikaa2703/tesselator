@echo off
echo ========================================================
echo   TESSELATOR - Assigning College Lab IP 10.11.36.55
echo ========================================================
echo.

:: Check for Administrator permissions
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting Administrator privileges to add 10.11.36.55 to loopback adapter...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo Adding 10.11.36.55 to Windows Loopback Pseudo-Interface...
netsh interface ipv4 add address "Loopback Pseudo-Interface 1" 10.11.36.55 255.255.255.255 >nul 2>&1

if %errorlevel% equ 0 (
    echo [SUCCESS] IP 10.11.36.55 successfully added to your laptop!
) else (
    echo [INFO] IP 10.11.36.55 is already configured on your machine.
)

echo.
echo ========================================================
echo   You can now open:
echo   http://10.11.36.55:55/
echo ========================================================
echo.
pause
