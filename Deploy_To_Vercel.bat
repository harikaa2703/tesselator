@echo off
title TESSELATOR - Deploy to Vercel
color 0b
echo ========================================================
echo       TESSELATOR DSA PLATFORM - DEPLOY TO VERCEL
echo ========================================================
echo.
echo Building production assets...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed! Check errors above.
    pause
    exit /b %errorlevel%
)

echo.
echo [INFO] Deploying to Vercel...
echo If this is your first time, a browser tab will open to log in.
echo.
npx vercel --prod
echo.
echo ========================================================
echo Deployment completed!
echo ========================================================
pause
