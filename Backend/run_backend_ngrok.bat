@echo off
setlocal

REM === Ruta a Git Bash (ajústala si está en otro directorio) ===
set GIT_BASH="E:\Git\bin\bash.exe"

REM === Ruta a tu backend ===
set BACKEND_DIR=E:\GitHub\Prototipo\Backend

REM === URL estática de Ngrok ===
set NGROK_URL=touched-included-elephant.ngrok-free.app

echo ================================
echo 🚀 Iniciando Backend + Ngrok
echo ================================

REM --- Verificar si Ngrok ya está corriendo ---
tasklist /FI "IMAGENAME eq ngrok.exe" | find /I "ngrok.exe" >nul
if %ERRORLEVEL%==0 (
    echo ✅ Ngrok ya está corriendo, no se lanzará de nuevo.
) else (
    echo ▶️ Lanzando Ngrok...
    start cmd /k "ngrok http --url=%NGROK_URL% 8080"
)

REM --- Lanzar Backend en Git Bash ---
echo ▶️ Iniciando Backend con Git Bash...
start %GIT_BASH% --login -i -c "cd %BACKEND_DIR% && ./mvnw spring-boot:run"

echo ================================
echo ✅ Todo en marcha, revisa las ventanas abiertas.
echo ================================
pause
