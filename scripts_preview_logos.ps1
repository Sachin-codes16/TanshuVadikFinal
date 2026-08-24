Add-Type -AssemblyName System.Drawing
$names = @('metal','academy','robotics','vaidik','green')
$box = 200
$canvas = New-Object System.Drawing.Bitmap ($box * $names.Count), $box
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.Clear([System.Drawing.Color]::FromArgb(244,239,234))
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

for ($i = 0; $i -lt $names.Count; $i++) {
  $path = "D:\TanshuSwati\Tanshuu\src\capabilities\$($names[$i]).png"
  $img = [System.Drawing.Image]::FromFile($path)
  $scale = [Math]::Min($box / $img.Width, $box / $img.Height)
  $w = $img.Width * $scale
  $h = $img.Height * $scale
  $x = $i * $box + ($box - $w) / 2
  $y = ($box - $h) / 2
  $g.DrawImage($img, $x, $y, $w, $h)
  $img.Dispose()
}
$g.DrawRectangle([System.Drawing.Pens]::Gray, 0,0, ($box*$names.Count)-1, $box-1)
for ($i=1; $i -lt $names.Count; $i++) { $g.DrawLine([System.Drawing.Pens]::LightGray, $i*$box,0,$i*$box,$box) }
$g.Dispose()
$out = "C:\Users\Hp\AppData\Local\Temp\claude\d--TanshuSwati\3c220c22-4687-4c07-879e-89037c6f6c12\scratchpad\logos_preview.png"
$canvas.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()
Write-Output "saved $out"
