@echo off
echo Starting 3H-Solutions Local Server...
echo.

REM Check if port 3000 is already in use
netstat -ano | findstr :3000 > nul
if %errorlevel% == 0 (
    echo Port 3000 is already in use!
    echo Use stop-server.bat to stop the existing server first.
    pause
    exit /b 1
)

REM Start the server in background
echo Starting server on port 3000...
start /min "3H-Solutions Server" node serve.js

REM Wait a moment and check if server started
timeout /t 3 /nobreak > nul
netstat -ano | findstr :3000 > nul
if %errorlevel% == 0 (
    echo.
    echo ✓ Server started successfully!
    echo ✓ Website is available at: http://localhost:3000
    echo.
    echo To stop the server, run: stop-server.bat
) else (
    echo.
    echo ✗ Failed to start server. Check for errors.
)

pause
