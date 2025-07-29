@echo off
setlocal enabledelayedexpansion
echo ========================================
echo     Server Process Termination Script
echo ========================================
echo.

echo [1] Checking currently running ports...
echo.
echo === Port 3000 Processes ===
netstat -ano | findstr :3000
if %errorlevel% neq 0 echo    Port 3000: No processes found
echo.
echo === Port 5000 Processes ===
netstat -ano | findstr :5000
if %errorlevel% neq 0 echo    Port 5000: No processes found
echo.
echo === Port 8080 Processes ===
netstat -ano | findstr :8080
if %errorlevel% neq 0 echo    Port 8080: No processes found
echo.

echo [2] Checking Node.js processes...
tasklist | findstr /I "node.exe"
if %errorlevel% neq 0 echo    No Node.js processes running
echo.

echo [3] Checking Firebase processes...
tasklist | findstr /I "firebase"
if %errorlevel% neq 0 echo    No Firebase processes running
echo.

echo [4] Terminating processes...
echo.

REM Terminate processes using port 3000
echo Terminating port 3000 processes...
set found3000=0
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING 2^>nul') do (
    set found3000=1
    taskkill /F /PID %%a >nul 2>&1
    if !errorlevel! == 0 (
        echo ✓ Process %%a on port 3000 terminated successfully
    ) else (
        echo ✗ Failed to terminate process %%a on port 3000
    )
)
if !found3000! == 0 echo    Port 3000: No processes to terminate

REM Terminate processes using port 5000
echo Terminating port 5000 processes...
set found5000=0
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING 2^>nul') do (
    set found5000=1
    taskkill /F /PID %%a >nul 2>&1
    if !errorlevel! == 0 (
        echo ✓ Process %%a on port 5000 terminated successfully
    ) else (
        echo ✗ Failed to terminate process %%a on port 5000
    )
)
if !found5000! == 0 echo    Port 5000: No processes to terminate

REM Terminate processes using port 8080
echo Terminating port 8080 processes...
set found8080=0
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING 2^>nul') do (
    set found8080=1
    taskkill /F /PID %%a >nul 2>&1
    if !errorlevel! == 0 (
        echo ✓ Process %%a on port 8080 terminated successfully
    ) else (
        echo ✗ Failed to terminate process %%a on port 8080
    )
)
if !found8080! == 0 echo    Port 8080: No processes to terminate

REM Terminate Node.js processes
echo Terminating Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Node.js processes terminated successfully
) else (
    echo    No Node.js processes were running
)

REM Terminate Firebase processes
echo Terminating Firebase processes...
taskkill /F /IM firebase.exe >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Firebase processes terminated successfully
) else (
    echo    No Firebase processes were running
)

echo.
echo [5] Checking port status after termination...
timeout /t 2 /nobreak >nul
echo.
echo === Port 3000 Status ===
netstat -ano | findstr :3000
if %errorlevel% neq 0 (
    echo ✓ Port 3000 is now free
) else (
    echo ⚠ Port 3000 has TIME_WAIT connections (will clear automatically)
)

echo === Port 5000 Status ===
netstat -ano | findstr :5000
if %errorlevel% neq 0 (
    echo ✓ Port 5000 is now free
) else (
    echo ⚠ Port 5000 has TIME_WAIT connections (will clear automatically)
)

echo === Port 8080 Status ===
netstat -ano | findstr :8080
if %errorlevel% neq 0 (
    echo ✓ Port 8080 is now free
) else (
    echo ⚠ Port 8080 has TIME_WAIT connections (will clear automatically)
)

echo.
echo ========================================
echo     All server processes terminated
echo ========================================
echo.
pause
