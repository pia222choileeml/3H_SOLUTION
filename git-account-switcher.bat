@echo off
REM ================================================
REM Git Account Switcher for Windows
REM Easy Git account switching script for different projects
REM ================================================

REM Add Git to PATH for this session
set "PATH=%PATH%;C:\Program Files\Git\bin"

echo.
echo ==========================================
echo    Git Account Switcher
echo ==========================================
echo.

REM Display current Git configuration
echo [Current Git Configuration]
git config user.name 2>nul
if errorlevel 1 (
    echo Username: Not configured
) else (
    echo Username: 
    git config user.name
)

git config user.email 2>nul
if errorlevel 1 (
    echo Email: Not configured
) else (
    echo Email: 
    git config user.email
)

echo.
echo ==========================================
echo.

REM Predefined account selection
echo Select Git account to use:
echo.
echo 1. pia222choileeml (Personal Account)
echo    - Name: pia222choileeml
echo    - Email: pia222.choi.lee.ml@gmail.com
echo.
echo 2. kyuyoungleekookmin (Company Account)
echo    - Name: kyuyoungleekookmin
echo    - Email: [Company Email]
echo.
echo 3. Custom Input
echo.
echo 4. Reset GitHub Authentication (Delete credentials)
echo.
set /p choice="Choose (1-4): "

if "%choice%"=="1" goto account1
if "%choice%"=="2" goto account2
if "%choice%"=="3" goto custom
if "%choice%"=="4" goto reset_auth
goto invalid

:account1
echo.
echo [Setting up pia222choileeml account...]
git config --global user.name "pia222choileeml"
git config --global user.email "pia222.choi.lee.ml@gmail.com"
echo ✓ Git account has been configured.
goto show_result

:account2
echo.
echo [Setting up kyuyoungleekookmin account...]
git config --global user.name "kyuyoungleekookmin"
set /p company_email="Enter company email: "
git config --global user.email "%company_email%"
echo ✓ Git account has been configured.
goto show_result

:custom
echo.
echo [Custom Account Setup]
set /p custom_name="Enter Git username: "
set /p custom_email="Enter Git email: "
git config --global user.name "%custom_name%"
git config --global user.email "%custom_email%"
echo ✓ Git account has been configured.
goto show_result

:reset_auth
echo.
echo [Resetting GitHub Authentication...]
echo.
echo 1. Checking Git credential helper...
git config --list | findstr credential
echo.
echo 2. Deleting GitHub info from Windows Credential Manager...
cmdkey /list | findstr github >nul
if errorlevel 1 (
    echo   - No GitHub authentication info found.
) else (
    cmdkey /delete:git:https://github.com
    echo   ✓ GitHub authentication info deleted.
)
echo.
echo 3. You need to re-login GitHub account in VS Code as well.
echo.
echo ✓ Authentication reset completed.
echo   New authentication dialog will appear on next git push.
goto end

:show_result
echo.
echo ==========================================
echo [Updated Git Configuration]
echo Username: 
git config user.name
echo Email: 
git config user.email
echo ==========================================
goto end

:invalid
echo.
echo ❌ Invalid selection. Please choose 1-4.
echo.
pause
goto start

:end
echo.
echo Script completed.
pause
