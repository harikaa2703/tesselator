# Script to map 10.11.36 and 10.11.0.36 to localhost
$hostsPath = "$env:windir\System32\drivers\etc\hosts"
$entry = "127.0.0.1 10.11.36"
$content = Get-Content $hostsPath -Raw
if ($content -notmatch "10\.11\.36") {
    Add-Content -Path $hostsPath -Value "`r`n$entry"
    Write-Host "Successfully added 10.11.36 to hosts!"
} else {
    Write-Host "10.11.36 already in hosts!"
}
