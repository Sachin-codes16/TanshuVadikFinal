Add-Type -AssemblyName System.Drawing

function Get-InkBBox($bmp, $alphaThreshold) {
  $w = $bmp.Width
  $h = $bmp.Height
  $minX = $w; $minY = $h; $maxX = -1; $maxY = -1

  $data = $bmp.LockBits((New-Object System.Drawing.Rectangle(0,0,$w,$h)), [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $stride = $data.Stride
  $bytes = New-Object byte[] ($stride * $h)
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
  $bmp.UnlockBits($data)

  for ($y = 0; $y -lt $h; $y++) {
    $rowOffset = $y * $stride
    for ($x = 0; $x -lt $w; $x++) {
      $a = $bytes[$rowOffset + $x*4 + 3]
      if ($a -gt $alphaThreshold) {
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  return @{minX=$minX; minY=$minY; maxX=$maxX; maxY=$maxY}
}

$names = @('metal','academy','robotics','vaidik','green')
foreach ($name in $names) {
  $path = "D:\TanshuSwati\Tanshuu\src\capabilities\$name.png"
  $bmp = [System.Drawing.Bitmap]::FromFile($path)
  $bbox = Get-InkBBox $bmp 10

  $inkW = $bbox.maxX - $bbox.minX + 1
  $inkH = $bbox.maxY - $bbox.minY + 1

  # add padding = 6% of the larger ink dimension
  $pad = [Math]::Round(([Math]::Max($inkW, $inkH)) * 0.06)

  $cropX = [Math]::Max(0, $bbox.minX - $pad)
  $cropY = [Math]::Max(0, $bbox.minY - $pad)
  $cropRight = [Math]::Min($bmp.Width, $bbox.maxX + 1 + $pad)
  $cropBottom = [Math]::Min($bmp.Height, $bbox.maxY + 1 + $pad)
  $cropW = $cropRight - $cropX
  $cropH = $cropBottom - $cropY

  Write-Output "$name : ink=$inkW x $inkH  original=$($bmp.Width)x$($bmp.Height)  crop=$cropW x $cropH"

  $newBmp = New-Object System.Drawing.Bitmap $cropW, $cropH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($newBmp)
  $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0,0,$cropW,$cropH)), (New-Object System.Drawing.Rectangle($cropX,$cropY,$cropW,$cropH)), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $bmp.Dispose()

  $newBmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $newBmp.Dispose()
}
Write-Output "done"
