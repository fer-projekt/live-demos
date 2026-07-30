# Downscales and re-encodes the client photos for web delivery.
# No ImageMagick on this box, so this uses System.Drawing from the .NET framework.
# Originals stay untouched in C:\Users\lukam\Downloads\vidovic.
Add-Type -AssemblyName System.Drawing

$imgDir = 'F:\wamp\www\live-demos\dental-vidovic\img'
$quality = 85

# source, destination, max width. Portrait shots are shown ~380-530px wide, so ~2x that
# covers retina without shipping 4000px originals.
$jobs = @(
    @{ src = 'o-nama.jpg';       dst = 'o-nama.jpg';       max = 1100 }
    @{ src = 'tim-goran.jpg';    dst = 'tim-goran.jpg';    max = 900  }
    @{ src = 'tim-tanja.jpg';    dst = 'tim-tanja.jpg';    max = 900  }
    @{ src = 'tim-ivana.jpg';    dst = 'tim-ivana.jpg';    max = 900  }
    @{ src = 'funkcijska-3.png'; dst = 'funkcijska-3.jpg'; max = 1080 }
    @{ src = 'funkcijska-2.png'; dst = 'funkcijska-2.jpg'; max = 1100 }
    @{ src = 'funkcijska-1.jpg'; dst = 'funkcijska-1.jpg'; max = 1080 }
    @{ src = 'tim-grupa.png';    dst = 'tim-grupa.jpg';    max = 1100 }
    @{ src = 'osmijeh.jpg';      dst = 'osmijeh.jpg';      max = 1640 }
)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int]$quality)

foreach ($job in $jobs) {
    $srcPath = Join-Path $imgDir $job.src
    if (-not (Test-Path $srcPath)) { Write-Output "SKIP (missing) $($job.src)"; continue }

    $beforeKB = [math]::Round((Get-Item $srcPath).Length / 1KB)
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $w = $img.Width; $h = $img.Height

    # never upscale
    $scale = [math]::Min(1.0, $job.max / [double]$w)
    $nw = [int][math]::Round($w * $scale)
    $nh = [int][math]::Round($h * $scale)

    $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    # JPEG has no alpha; flatten onto white so any transparency does not go black
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($img, 0, 0, $nw, $nh)
    $g.Dispose()

    # write to a temp file first: src and dst are the same path for the .jpg jobs
    $tmp = Join-Path $env:TEMP ("opt_" + $job.dst)
    $bmp.Save($tmp, $codec, $encParams)
    $bmp.Dispose()
    $img.Dispose()

    Move-Item -Force $tmp (Join-Path $imgDir $job.dst)
    if ($job.src -ne $job.dst) { Remove-Item -Force $srcPath }

    $afterKB = [math]::Round((Get-Item (Join-Path $imgDir $job.dst)).Length / 1KB)
    Write-Output ("{0,-20} {1}x{2} {3}KB  ->  {4,-20} {5}x{6} {7}KB" -f $job.src, $w, $h, $beforeKB, $job.dst, $nw, $nh, $afterKB)
}
