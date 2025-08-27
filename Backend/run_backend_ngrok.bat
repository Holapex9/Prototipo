@echo off
echo 🚀 Iniciando Backend con Git Bash...

:: Abrir Git Bash y ejecutar Spring Boot
start "" "E:\Git\bin\bash.exe" -lc "cd '%~dp0' && ./mvnw spring-boot:run"

timeout /t 10 >nul

echo 🌐 Iniciando Ngrok en puerto 8080 con dominio estatico...
start cmd /k "ngrok http --url=touched-included-elephant.ngrok-free.app 8080"

echo ✅ Backend y Ngrok levantados correctamente.
pause
