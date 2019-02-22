<?php
   function wav_graph($file,$f=0,$w=0)
   {
          
      if(!is_file($file)) 
      return 0;   
// $a=0;
      $fp=fopen($file,'r');
      $raw=fread($fp,36);//对应36个字节的文件头，包含该文件的一些信息
      // echo $raw;
      $str="";
      $header=unpack('A4Riff/VSize/A4Wav/A4Head/VHeadSize/vPCM/vChannels/VSampleRate/VByteRate/vBlockAlign/vSampleBits', $raw);
       //print_r($header);//查看文件头
      foreach($header as $k=>$v)
      $str.=$k.":".$v." ";
       fseek($fp,36+$header['HeadSize']-16);
       $raw=fread($fp,8);
       $data=unpack('A4Data/VDataSize',$raw);
       
       foreach($data as $k=>$v)
       $str.=$k.":".$v." ";
       $b=$header['SampleBits'];//样本数据位数
       $c=$header['Channels'];//声道数
       $l=$b*$c/8;//需要用16比特的原因就在这里，16比特代表采集位数是2个字节，除于8
       $s=$data['DataSize']/$l;//文件数据长度/（样本采集位数*采集频率）=歌曲时间吧
       $r=$header['SampleRate'];//采集频率
       if($f) $h=pow(2,$b)/$f;//设定波的高度
       else {$h=200;$f=pow(2,$b-1)/$h;}
       if($w==0)$w=round($r/5);//后面的5是时间，1000表示按秒为单位
     
       
      header("Content-type:image/png");//查看弹出数据时需要把画图的部分隐藏掉哦
        
       $im=@imagecreate($s/$w,$h*$c*2);
      
       $background_color = imagecolorallocate($im, 255, 255, 255);
       $text_color = imagecolorallocate($im, 233, 14, 91);
        $x=0;$y=array();$yn=array();
       for($i=0;$i<$c;$i++)$y[$i]=$h*$i+$h;
       $n=$l*$w;
      
    
       while(1)
   {
           if($s==0) break;
           if($s<$n)$n=$s;
           $samples=fread($fp,5*$n);//后面的5是时间，1000表示按秒为单位
           
           if($samples==FALSE)break;
           $packed=unpack('s*',$samples);
          
           foreach($packed as $k=>$v)
           {
            $cnt=($k-1)%($w*$l);
            if($cnt>$c-1)continue;
            $yn[$cnt]=$h*$cnt+$h-$v/$f;
            imageline($im,$x,$y[$cnt],$x+1,$yn[$cnt],$text_color);
            $y[$cnt]=$yn[$cnt];
            $x++;
               
           }
           $s-=$n;
       }
      
       
      /**/
       imagepng($im);
       imagedestroy($im);
      
   }
wav_graph('sample.wav');
?>