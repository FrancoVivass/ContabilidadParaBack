@echo off
chcp 65001 >nul
cls

echo ════════════════════════════════════════════════════════════════
echo   FASTBOOKS ROBLES - SERVIDOR DE DESARROLLO
echo   Instituto Paula Robles - Sistema Contable
echo ════════════════════════════════════════════════════════════════
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python no está instalado o no está en el PATH
    echo.
    echo 💡 Soluciones:
    echo    1. Instala Python desde https://www.python.org/
    echo    2. O abre index.html directamente con tu navegador
    echo.
    pause
    exit /b 1
)

echo ✅ Python encontrado
echo.
echo 🚀 Iniciando servidor en http://localhost:8000
echo.
echo 📝 Instrucciones:
echo    - El navegador se abrirá automáticamente
echo    - Presiona Ctrl+C para detener el servidor
echo    - Cierra esta ventana para detener el servidor
echo.
echo ════════════════════════════════════════════════════════════════
echo Iniciando...
echo ════════════════════════════════════════════════════════════════
echo.

REM Iniciar el servidor Python
python iniciar_servidor.py

if %errorlevel% neq 0 (
    echo.
    echo ❌ Error al iniciar el servidor
    echo.
    echo 💡 Intenta ejecutar manualmente:
    echo    python -m http.server 8000
    echo.
    pause
    exit /b 1
)

pause
