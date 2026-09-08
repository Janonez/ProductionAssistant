@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js 20 or newer first.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:43128 in your browser after the service starts.
node server.cjs
pause
