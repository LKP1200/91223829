@echo off
setlocal
cd /d "%~dp0"
set "LUCKYTOOLS_PORT=4173"

where py >nul 2>nul
if %errorlevel%==0 (
    start "" "http://127.0.0.1:%LUCKYTOOLS_PORT%/index.html"
    py -m http.server %LUCKYTOOLS_PORT% --bind 127.0.0.1
    goto :eof
)

where python >nul 2>nul
if %errorlevel%==0 (
    start "" "http://127.0.0.1:%LUCKYTOOLS_PORT%/index.html"
    python -m http.server %LUCKYTOOLS_PORT% --bind 127.0.0.1
    goto :eof
)

set "LUCKYTOOLS_CODEX_PYTHON=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%LUCKYTOOLS_CODEX_PYTHON%" (
    start "" "http://127.0.0.1:%LUCKYTOOLS_PORT%/index.html"
    "%LUCKYTOOLS_CODEX_PYTHON%" -m http.server %LUCKYTOOLS_PORT% --bind 127.0.0.1
    goto :eof
)

echo Python was not found. Install Python or open the site through another local web server.
pause
