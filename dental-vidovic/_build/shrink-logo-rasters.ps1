# Post-step for build-logo.js. The source logo is a fake vector: the gold mark is a
# 1024px raster and its transparency comes from a second 1024px raster used as an SVG
# mask. Both are downscaled by the same factor; the SVG's own width/height/transform
# attributes are left alone, so mark and mask stay aligned and only resolution drops.
# The mark renders ~34px tall in the navbar, so 320px is still heavily oversampled.
# Idempotent: rasters already at or below the target are left as they are.
Add-Type -AssemblyName System.Drawing

$imgDir = 'F:\wamp\www\live-demos\dental-vidovic\img'
$target = 320

function Shrink-Base64Png([string]$b64, [int]$target) {
    $bytes = [Convert]::FromBase64String($b64)
    $ms = New-Object System.IO.MemoryStream($bytes, 0, $bytes.Length)
    $img = [System.Drawing.Image]::FromStream($ms)
    if ($img.Width -le $target) { $img.Dispose(); $ms.Dispose(); return $null }

    $h = [int][math]::Round($img.Height * ($target / [double]$img.Width))
    $bmp = New-Object System.Drawing.Bitmap($target, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $target, $h)
    $g.Dispose(); $img.Dispose(); $ms.Dispose()

    $out = New-Object System.IO.MemoryStream
    $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    return [Convert]::ToBase64String($out.ToArray())
}

foreach ($name in @('logo.svg', 'logo-light.svg')) {
    $path = Join-Path $imgDir $name
    if (-not (Test-Path $path)) { Write-Output "SKIP (missing) $name"; continue }
    $before = [math]::Round((Get-Item $path).Length / 1KB)
    $svg = Get-Content $path -Raw

    $shrunk = 0
    $matches = [regex]::Matches($svg, 'data:image/png;base64,([A-Za-z0-9+/=]+)')
    # replace back-to-front so earlier offsets stay valid
    for ($i = $matches.Count - 1; $i -ge 0; $i--) {
        $m = $matches[$i]
        $new = Shrink-Base64Png $m.Groups[1].Value $target
        if ($null -eq $new) { continue }
        $svg = $svg.Remove($m.Groups[1].Index, $m.Groups[1].Length).Insert($m.Groups[1].Index, $new)
        $shrunk++
    }

    [IO.File]::WriteAllText($path, $svg)
    $after = [math]::Round((Get-Item $path).Length / 1KB)
    Write-Output ("{0,-16} {1} raster(s) shrunk to {2}px   {3}KB -> {4}KB" -f $name, $shrunk, $target, $before, $after)
}
