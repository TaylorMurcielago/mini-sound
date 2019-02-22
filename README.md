# mini-sound

#使用Ffpgem ，silk-v3-decoder，wavesurfer。

#第一种实现方式：

#  用php后台来输出波形图，可查看资源包对应的wavToImg.php（没有第二种准确）

#第二种实现方式：

#  使用小程序web-view，通过wavesurfer来实现。因为小程序不支持canvas绘图。
  
  

#以上两种方法都需要注意：

#如果不是真机测试，则不需要silkdecode.php，小程序录音silk文件需要base64解码。
#php_cmd.php用来执行ffpgem。 silk转wav。wavToImg.php则用来绘图。
 
#真机测试则不需要silk-decoded。

#我要做的是通过声波来分析人声音，所以输出的是计算出的一个数值，可根据需要调整波形图或者数值。

#注意：真机测试不需要 
