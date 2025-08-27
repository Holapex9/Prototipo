@echo off
echo 🚀 Iniciando Backend de DocuFlow...
cd /d "%~dp0" 

:: Levantar el backend con Maven Wrapper
start cmd /k ".\mvnw spring-boot:run"

timeout /t 10 >nul

echo 🌐 Iniciando Ngrok en puerto 8080 con dominio estatico...
start cmd /k "ngrok http --url=touched-included-elephant.ngrok-free.app 8080"

echo ✅ Backend y Ngrok levantados correctamente.
pause
