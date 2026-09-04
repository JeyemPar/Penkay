param(
  [ValidateSet('dev', 'build')]
  [string]$Action = 'dev'
)

$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $projectDirectory

$nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else { $null }

if (-not $nodePath) {
  $userProfileDirectory = [Environment]::GetFolderPath('UserProfile')
  $bundledNodePath = Join-Path $userProfileDirectory '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'

  if (Test-Path -LiteralPath $bundledNodePath) {
    $nodePath = $bundledNodePath
  }
}

if (-not $nodePath) {
  throw 'No se encontró Node.js. Instala Node.js 22.13 o superior y vuelve a ejecutar este archivo.'
}

$vinextCliPath = Join-Path $projectDirectory 'node_modules\vinext\dist\cli.js'

if (-not (Test-Path -LiteralPath $vinextCliPath)) {
  throw 'No se encontraron las dependencias del proyecto. Instala Node.js y ejecuta: corepack enable; pnpm install'
}

if ($Action -eq 'build') {
  Write-Host 'Compilando Penkay...'
  & $nodePath $vinextCliPath build
} else {
  Write-Host 'Iniciando Penkay en http://localhost:3000 ...'
  & $nodePath $vinextCliPath dev --host localhost
}

exit $LASTEXITCODE
