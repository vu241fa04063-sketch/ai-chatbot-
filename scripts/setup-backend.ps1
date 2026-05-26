<#
setup-backend.ps1

Automates installing Python (via winget when available), installing backend
requirements, and optionally starting the development server.

Usage:
  PowerShell (admin may be required for winget install):
    .\scripts\setup-backend.ps1
    .\scripts\setup-backend.ps1 -StartServer

If winget is not available, the script will print the Python download URL.
#>

param(
    [switch]$StartServer
)

function Write-Info($m){ Write-Host "[INFO] $m" -ForegroundColor Cyan }
function Write-Err($m){ Write-Host "[ERROR] $m" -ForegroundColor Red }

function Test-Python {
    $py = Get-Command py -ErrorAction SilentlyContinue
    if ($py) { return $true }
    $python = Get-Command python -ErrorAction SilentlyContinue
    if ($python) { return $true }
    return $false
}

if (Test-Python) {
    Write-Info "Python detected."
} else {
    Write-Info "Python not found. Trying to install via winget..."
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget) {
        Write-Info "Running: winget install --id Python.Python.3 -e --source winget"
        try {
            winget install --id Python.Python.3 -e --source winget
        } catch {
            Write-Err "winget install failed. You may need to run PowerShell as Administrator."
            Write-Host "If winget is unavailable or install fails, download Python from: https://www.python.org/downloads/windows/"
            exit 1
        }
        Write-Info "Python install attempted. Please close and reopen your terminal if the 'python' command is not yet available."
        Read-Host -Prompt "Press Enter after reopening your terminal to continue"
        if (-not (Test-Python)) {
            Write-Err "Python still not found. Please ensure Python is installed and in PATH."
            exit 1
        }
    } else {
        Write-Err "winget not found. Please install Python manually from: https://www.python.org/downloads/windows/"
        exit 1
    }
}

Write-Info "Upgrading pip and installing backend requirements..."
try {
    python -m pip install --upgrade pip
    python -m pip install -r ..\backend\requirements.txt
} catch {
    Write-Err "Failed to install Python packages. Check output above for details."
    exit 1
}

Write-Info "Dependencies installed successfully."

if ($StartServer) {
    Write-Info "Starting backend server... (use Ctrl+C to stop)"
    try {
        python -m uvicorn backend.main:app --reload --port 8000
    } catch {
        Write-Err "Failed to start uvicorn. Ensure 'uvicorn' is installed and available."
        exit 1
    }
} else {
    Write-Info "To start the server manually run: python -m uvicorn backend.main:app --reload --port 8000"
}
