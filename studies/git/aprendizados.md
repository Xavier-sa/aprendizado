Remove-Item -Recurse -Force .git


usei no no powershell para desvincular do repositorio

git rm -r --cached .

git restore --staged .