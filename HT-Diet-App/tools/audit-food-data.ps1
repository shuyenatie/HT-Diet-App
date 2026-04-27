$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$foodDbPath = Join-Path $root 'js\food-database.js'
$reportDir = Join-Path $root 'reports'
$reportPath = Join-Path $reportDir 'food-data-audit.md'

if (!(Test-Path $reportDir)) {
  New-Item -ItemType Directory -Path $reportDir | Out-Null
}

$raw = Get-Content $foodDbPath -Raw -Encoding UTF8
$pattern = "\{\s*id:\s*'([^']+)',\s*name:\s*'([^']*)',\s*emoji:\s*'[^']*',\s*category:\s*'([^']*)',\s*caloriesPer100g:\s*([0-9.]+),\s*proteinPer100g:\s*([0-9.]+),\s*fatPer100g:\s*([0-9.]+),\s*carbsPer100g:\s*([0-9.]+)"
$foodLines = $raw -split "`r?`n" | Where-Object { $_ -match "\{\s*id:\s*'f\d+'" }
$parsedIds = @{}

$foods = [regex]::Matches($raw, $pattern) | ForEach-Object {
  $calories = [double]$_.Groups[4].Value
  $protein = [double]$_.Groups[5].Value
  $fat = [double]$_.Groups[6].Value
  $carbs = [double]$_.Groups[7].Value
  $atwater = ($protein * 4) + ($fat * 9) + ($carbs * 4)
  $diff = $calories - $atwater
  $category = $_.Groups[3].Value
  $name = $_.Groups[2].Value
  $reason = ''
  $id = $_.Groups[1].Value
  if (@('f199', 'f200') -contains $id) {
    $reason = 'Calories include ethanol; Atwater macro check omits alcohol energy.'
  } elseif (@('f292', 'f293', 'f297', 'f298', 'f299') -contains $id) {
    $reason = 'Dry fungi often contain fiber/non-available carbohydrate; Atwater check may overestimate usable calories.'
  }

  [pscustomobject]@{
    Id = $id
    Name = $name
    Category = $category
    Calories = $calories
    Protein = $protein
    Fat = $fat
    Carbs = $carbs
    AtwaterCalories = [math]::Round($atwater, 1)
    Difference = [math]::Round($diff, 1)
    DifferencePercent = if ($calories -gt 0) { [math]::Round([math]::Abs($diff) / $calories * 100, 1) } else { 0 }
    PossibleReason = $reason
  }
}

$foods | ForEach-Object { $parsedIds[$_.Id] = $true }
$unparsedLines = $foodLines | Where-Object {
  $_ -match "id:\s*'([^']+)'" | Out-Null
  !$parsedIds.ContainsKey($matches[1])
}

$duplicateIds = $foods | Group-Object Id | Where-Object Count -gt 1
$duplicateNames = $foods | Group-Object Name | Where-Object Count -gt 1
$macroOutliers = $foods |
  Where-Object { [math]::Abs($_.Difference) -gt 50 -and $_.DifferencePercent -gt 15 } |
  Sort-Object DifferencePercent -Descending
$negativeOrImpossible = $foods | Where-Object {
  $_.Calories -lt 0 -or $_.Protein -lt 0 -or $_.Fat -lt 0 -or $_.Carbs -lt 0 -or
  $_.Protein -gt 100 -or $_.Fat -gt 100 -or $_.Carbs -gt 100
}

function Add-TableRows($items, $columns) {
  if (!$items -or @($items).Count -eq 0) {
    return "_None found._`n"
  }

  $header = '| ' + (($columns | ForEach-Object { $_ }) -join ' | ') + ' |'
  $divider = '| ' + (($columns | ForEach-Object { '---' }) -join ' | ') + ' |'
  $rows = @($header, $divider)

  foreach ($item in $items) {
    $rows += '| ' + (($columns | ForEach-Object {
      $value = $item.$_
      if ($null -eq $value) { '' } else { [string]$value -replace '\|', '/' }
    }) -join ' | ') + ' |'
  }

  return ($rows -join "`n") + "`n"
}

$lines = @()
$lines += '# Food Data Audit'
$lines += ''
$lines += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$lines += ''
$lines += '## Summary'
$lines += ''
$lines += "- Parsed food entries: $($foods.Count)"
$lines += "- Food-like lines found: $(@($foodLines).Count)"
$lines += "- Unparsed food-like lines: $(@($unparsedLines).Count)"
$lines += "- Duplicate ids: $(@($duplicateIds).Count)"
$lines += "- Duplicate names: $(@($duplicateNames).Count)"
$lines += "- Macro/calorie outliers: $(@($macroOutliers).Count)"
$lines += "- Negative or impossible macro values: $(@($negativeOrImpossible).Count)"
$lines += ''
$lines += '## Method'
$lines += ''
$lines += 'This audit checks internal consistency only. It estimates energy from macronutrients using general Atwater factors: protein 4 kcal/g, carbohydrate 4 kcal/g, fat 9 kcal/g. Foods where listed calories differ by more than 50 kcal and more than 15% are flagged for manual source verification.'
$lines += ''
$lines += '## Macro/Calorie Outliers'
$lines += ''
$lines += Add-TableRows ($macroOutliers | Select-Object -First 80) @('Id', 'Name', 'Category', 'Calories', 'AtwaterCalories', 'Difference', 'DifferencePercent', 'PossibleReason', 'Protein', 'Fat', 'Carbs')
$lines += ''
$lines += '## Duplicate IDs'
$lines += ''
$lines += if (@($duplicateIds).Count) { ($duplicateIds | ForEach-Object { "- $($_.Name): $($_.Count)" }) -join "`n" } else { '_None found._' }
$lines += ''
$lines += '## Duplicate Names'
$lines += ''
$lines += if (@($duplicateNames).Count) { ($duplicateNames | ForEach-Object { "- $($_.Name): $($_.Count)" }) -join "`n" } else { '_None found._' }
$lines += ''
$lines += '## Negative Or Impossible Values'
$lines += ''
$lines += Add-TableRows $negativeOrImpossible @('Id', 'Name', 'Category', 'Calories', 'Protein', 'Fat', 'Carbs')
$lines += ''
$lines += '## Unparsed Food-Like Lines'
$lines += ''
$lines += if (@($unparsedLines).Count) { ($unparsedLines | ForEach-Object { '- `' + ($_.Trim() -replace '`', '``') + '`' }) -join "`n" } else { '_None found._' }

$lines -join "`n" | Set-Content -Path $reportPath -Encoding UTF8

Write-Output "Parsed food entries: $($foods.Count)"
Write-Output "Food-like lines found: $(@($foodLines).Count)"
Write-Output "Unparsed food-like lines: $(@($unparsedLines).Count)"
Write-Output "Duplicate ids: $(@($duplicateIds).Count)"
Write-Output "Duplicate names: $(@($duplicateNames).Count)"
Write-Output "Macro/calorie outliers: $(@($macroOutliers).Count)"
Write-Output "Negative or impossible macro values: $(@($negativeOrImpossible).Count)"
Write-Output "Report: $reportPath"
