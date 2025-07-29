@echo off
echo 3H-Solutions Server Status Check
echo ================================
echo.

REM Check if port 3000 is in use
echo Checking port 3000...
netstat -ano | findstr :3000
if %errorlevel% == 0 (
    echo.
    echo ✓ Server appears to be running on port 3000
    echo ✓ Website should be available at: http://localhost:3000
) else (
    echo.
    echo ✗ No process found using port 3000
    echo ✗ Server is not running
)

echo.
echo Running Node.js processes:
tasklist | findstr node.exe
if %errorlevel% == 1 (
    echo No Node.js processes found
)

echo.
pause
