// NeurousNet - Utilities Class
//  Created by Kevin Edzenga; October 2021
//
//  Neurous( *State.js Object* )
//  Common HTML5 Canvas & Math Functions


export default class Utils{
  constructor(State){
    this.State = State    
  }
  
  drawGeo(loc,eCount,size,color,alpha,filled,flip,canvas,comp){
    var x=loc[0];
    var y=loc[1];
    var R=color[0];
    var G=color[1];
    var B=color[2];
    let hex=this.rgbToHex([Math.floor(R),Math.floor(G),Math.floor(B)] );
    var csW=canvas.width;
    var csH=canvas.height;
    
    let draw=canvas.getContext('2d');
    if(!this.State.mobile) draw.globalCompositeOperation=comp;

    var runCount=1;
    draw.globalAlpha=alpha;
    for(var c=0;c<runCount;c+=1){
      draw.beginPath();
      draw.lineWidth=Math.max(1,filled);
      if(filled==-1){
        draw.fillStyle=hex;
      }else{
        draw.strokeStyle=hex;
      }
      if(eCount<=2){
        if(eCount==1){
          var grad=draw.createRadialGradient((x-this.State.sW/2)+this.State.sW/2,(y-this.State.sH/2)+this.State.sH/2,1,(x-this.State.sW/2)+this.State.sW/2,(y-this.State.sH/2)+this.State.sH/2,size/2);
          grad.addColorStop(0,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',1)');
          if(color.length>4){
            grad.addColorStop(1,'rgba('+Math.floor(color[3])+','+Math.floor(color[4])+','+Math.floor(color[5])+',0)');
          }else{
            grad.addColorStop(1,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',0)');
          }
          draw.fillStyle=grad;
        }else if(eCount==2){
          var grad=draw.createRadialGradient((x-this.State.sW/2)+this.State.sW/2,(y-this.State.sH/2)+this.State.sH/2,1,(x-this.State.sW/2)+this.State.sW/2,(y-this.State.sH/2)+this.State.sH/2,size/2);
          grad.addColorStop(0,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',0)');
          if(color.length>4){
            grad.addColorStop(1,'rgba('+Math.floor(color[3])+','+Math.floor(color[4])+','+Math.floor(color[5])+',1)');
          }else{
            grad.addColorStop(1,'rgba('+Math.floor(color[0])+','+Math.floor(color[1])+','+Math.floor(color[2])+',1)');
          }
          draw.fillStyle=grad;
        }
        draw.arc((x-this.State.sW/2)+this.State.sW/2,(y-this.State.sH/2)+this.State.sH/2,size/2,0,Math.PI*2);
      }else{
        if(loc.length>2){
          if(eCount==3){
            draw.moveTo((x-this.State.sW/2)+this.State.sW/2,(y-this.State.sH/2)+this.State.sH/2);
            //draw.moveTo(x,y);
            for(var v=2; v<loc.length; v+=2){
              draw.lineTo((loc[v]-this.State.sW/2)+this.State.sW/2,(loc[v+1]-this.State.sH/2)+this.State.sH/2);
            }
            draw.lineJoin = 'round';
            if(size==1 && filled!=-1){
              draw.closePath();
            }else{
              draw.lineJoin = 'miter';
            }
          }else{
            draw.lineJoin = 'round';
            draw.moveTo((x-this.State.sW/2)+this.State.sW/2,(y-this.State.sH/2)+this.State.sH/2);
            for(var v=2; v<loc.length; v+=4){
              draw.quadraticCurveTo((loc[v]-this.State.sW/2)+this.State.sW/2,(loc[v+1]-this.State.sH/2)+this.State.sH/2, (loc[v+2]-this.State.sW/2)+this.State.sW/2,(loc[v+3]-this.State.sH/2)+this.State.sH/2);
            }
            if(size==1){
              draw.quadraticCurveTo((loc[loc.length-2]-this.State.sW/2)+this.State.sW/2,(loc[loc.length-1]-this.State.sH/2)+this.State.sH/2, (loc[0]-this.State.sW/2)+this.State.sW/2,(loc[1]-this.State.sH/2)+this.State.sH/2);
            }
            /*
            draw.moveTo(x,y);
            for(var v=2; v<loc.length; v+=4){
              draw.quadraticCurveTo(loc[v],loc[v+1], loc[v+2],loc[v+3]);
            }
            if(size==1){
              draw.quadraticCurveTo(loc[loc.length-2],loc[loc.length-1], loc[0],loc[1]);
            }*/
            if(size==1 && filled!=-1){
              draw.closePath();
            }else{
              draw.lineJoin = 'miter';
            }
          }
        }
      }
      if(filled==-1){
        draw.fill();
      }else{
        draw.stroke();
      }
    }
  }

  drawLine(points,width,color,alpha,arcType,canvas,dash){
    var hex,draw;
    var R=color[0];
    var G=color[1];
    var B=color[2];	
    hex=rgbToHex([Math.floor(R),Math.floor(G),Math.floor(B)] );
    if(typeof(canvas)==="string"){
      draw=canvas.getContext('2d');
    }else{
      draw=canvas;
    }
    
    draw.beginPath();
    if(dash[0]!=-1){
      draw.globalAlpha=alpha/2;
    }
    draw.strokeStyle=hex;
    draw.lineWidth=width;
    draw.moveTo(points[0],points[1]);
    for(var x=2; x<(points.length); x+=2){
      draw.lineTo(points[x],points[x+1]);
    }
    if(arcType==0){
      arcType='round';
    }else if(arcType==1){
      arcType='miter';
    }else if(arcType==2){
      arcType='bevel';
    }else{
      arcType='round';
    }
    draw.lineJoin = arcType;
    draw.lineCap = arcType;
    draw.stroke();
    if(dash[0]!=-1){
      draw.globalAlpha=alpha;
      draw.setLineDash(dash);
      draw.stroke();
    }
  }

  componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(rgb) {
      return "#" + this.componentToHex(Math.min(255, Math.max(0,Math.round(rgb[0])))) + this.componentToHex(Math.min(255, Math.max(0,Math.round(rgb[1])))) + this.componentToHex(Math.min(255, Math.max(0,Math.round(rgb[2]))));
  }
  toHSV(RGB){
    var r=RGB[0]/255;
    var g=RGB[1]/255;
    var b=RGB[2]/255;
    var minv=Math.min(r,g,b);
    var maxv=Math.max(r,g,b);
    var H,S,V=maxv;
    var d=maxv-minv;
    
    if(maxv != 0){
      S=d/maxv;
    }else{
      S=0;
      //H=0;
      //return [H,S,V];
    }
    if(minv==maxv){
      H=0;
    }else{
      if(r == maxv){
        H=(g-b)/d;
        if(g<b){
          H+=6;
        }
      }else if(g == maxv){
        H=2+(b-r)/d;
      }else{
        H=4+(r-g)/d;
      }
      H/=6;
      ////H *= 60;
      //if(H < 0){
      //	H += 360;
      //}
    }
    
    return [H,S,V];
  }

  toRGB(HSV){
    var R,G,B;
    var H=HSV[0];
    var S=HSV[1];
    var V=HSV[2];
    
    var i=Math.floor(H*6);
    var f=H*6-i;
    var p=V*(1-S);
    var q=V*(1-S*f);
    var t=V*(1-S*(1-f));
    
    i=i%6;
    if(i == 0){
      R=V;
      G=t;
      B=p;
    }else if(i == 1){
      R=q;
      G=V;
      B=p;
    }else if(i == 2){
      R=p;
      G=V;
      B=t;
    }else if(i == 3){
      R=p;
      G=q;
      B=V;
    }else if(i == 4){
      R=t;
      G=p;
      B=V;
    }else if(i == 5){
      R=V;
      G=p;
      B=q;
    }

    return [R*255,G*255,B*255];
  }

  gradientRunner(canvas,colorFrom,colorTo,runBlur){
    var drawBG=canvas.getContext("2d");
    var cW=canvas.width;
    var cH=canvas.height;

    drawBG.rect(0, 0, cW, cH);
    var grd = drawBG.createLinearGradient(0,0,cW,cH);
    grd.addColorStop(0, colorFrom);
    grd.addColorStop(1, colorTo);
    drawBG.fillStyle = grd;
    drawBG.fill();

    if(runBlur==1){
      this.blurEffect(drawBG,drawBG,1,80,3);
      //this.blurEffect(drawBG,drawBG,1,70,5);
    }
  }
  blurEffect(input,output,fullCanvas,dist,levels){
    if(dist.constructor !== Array){
      var tmpDist=dist;
      dist = new Array();
      dist[0]=tmpDist;
      dist[1]=tmpDist;
    }
    var cW;
    var cH;
    if(typeof input == "string"){
      var cn=document.getElementById(input);
      if( !cn ){
        console.warn("'blurEffect' cannot find Input Object ")
      }
      cW=cn.width;
      cH=cn.height;
      var input=cn.getContext("2d");
      output=input;
    }else{
      cW=this.State.sW;
      cH=this.State.sH;
    }
    //var canvas=document.getElementById(drawCanvas);
    //var draw=canvas.getContext("2d");
    fader=input.getImageData(0,0,cW,cH);
    pix = fader.data;
    var rx,ry,rpix,px,py,mather ;
    var checker,rCalc,gCalc,bCalc,aCalc,stageX,stageY,mather,distCheck;
    //var distCheck=4+4*Math.abs((Math.floor(this.State.runner/55)*55)%3+(dragTotal%this.State.touchChecker));
    var startPix, endPix,rPix;
    let percer = 1;
    if(fullCanvas==1){
      startPix=0;
      endPix=pix.length;
      percer=1;
    }else{
      startPix=cW*4*(parseInt(refreshWindow[1])-2);
      endPix=(cW*4*(parseInt(refreshWindow[3])+2));
      let percObj = document.getElementById("sl"+diaVal+"_filterPercent_val")
      if( percObj ){
        percer=percObj.val();
      }
    }
    levels=Math.max(1,levels);
    var blendcount=0;
    if(dist[0]>0 || dist[1]>0 || fullCanvas==1){
      for (var i=startPix; i<endPix; i+=4) {
        if( ((i/4)%cW>parseInt(refreshWindow[0])-2 && (i/4)%cW<parseInt(refreshWindow[2])+1) || fullCanvas==1){
          if(pix[i+3]>0){
            blendcount=Math.max(1,levels/2);
            px=(i/4)%cW;
            py=Math.floor((i/4)/cW);
            rCalc=pix[i]*blendcount;
            gCalc=pix[i+1]*blendcount;
            bCalc=pix[i+2]*blendcount;
            aCalc=pix[i+3]*blendcount;
            for (var v=0; v<levels; ++v) {
              rx=Math.round(Math.random()*dist[0]-(dist[0]/2)+px);
              rx=Math.max(0,Math.min(rx,cW-1))-Math.max(0, rx-cW);
              
              ry=Math.round(Math.random()*dist[1]-(dist[1]/2)+py);
              ry=Math.max(0,Math.min(ry,cH-1))-Math.max(0, ry-cH);
              rpix=(ry*cW+rx)*4;
                rCalc+=pix[rpix];
                gCalc+=pix[rpix+1];
                bCalc+=pix[rpix+2];
                aCalc+=pix[rpix+3];
              blendcount++;
            }
              if(percer==1){
                rCalc=(rCalc/blendcount);
                gCalc=(gCalc/blendcount);
                bCalc=(bCalc/blendcount);
                aCalc=(aCalc/blendcount);
              }else{
                rCalc=pix[i]*(1-percer)+(rCalc/blendcount)*percer;
                gCalc=pix[i+1]*(1-percer)+(gCalc/blendcount)*percer;
                bCalc=pix[i+2]*(1-percer)+(bCalc/blendcount)*percer;
                aCalc=pix[i+3]*(1-percer)+(aCalc/blendcount)*percer;
              }
              pix[rpix]=rCalc;
              pix[rpix+1]=gCalc;
              pix[rpix+2]=bCalc;
              pix[rpix+3]=aCalc;
          }
        }
      }
    }	
    for (var i=startPix; i<endPix; i+=4) {
      if( ((i/4)%cW>parseInt(refreshWindow[0])-2 && (i/4)%cW<parseInt(refreshWindow[2])+1) || fullCanvas==1){
        if(pix[i+3]>0){
          blendcount=2;
          px=(i/4)%cW;
          py=Math.floor((i/4)/cW);
          rCalc=pix[i]*2;
          gCalc=pix[i+1]*2;
          bCalc=pix[i+2]*2;
          aCalc=pix[i+3]*2;
          if(py>0){
            rCalc+=pix[i-cW*4];
            gCalc+=pix[i+1-cW*4];
            bCalc+=pix[i+2-cW*4];
            aCalc+=pix[i+3-cW*4];
            blendcount+=1;
          }
          if(py<cH-1){
            rCalc+=pix[i+cW*4];
            gCalc+=pix[i+1+cW*4];
            bCalc+=pix[i+2+cW*4];
            aCalc+=pix[i+3+cW*4];
            blendcount+=1;
          }
          if(px>0){
            rCalc+=pix[i-4];
            gCalc+=pix[i+1-4];
            bCalc+=pix[i+2-4];
            aCalc+=pix[i+3-4];
            blendcount+=1;
          }
          
          if(px<cW-1){
            rCalc+=pix[i+4];
            gCalc+=pix[i+1+4];
            bCalc+=pix[i+2+4];
            aCalc+=pix[i+3+4];
            blendcount+=1;
          }
          if(percer==1){
            rCalc=(rCalc/blendcount);
            gCalc=(gCalc/blendcount);
            bCalc=(bCalc/blendcount);
            aCalc=(aCalc/blendcount);
          }else{
            rCalc=pix[i]*(1-percer)+(rCalc/blendcount)*percer;
            gCalc=pix[i+1]*(1-percer)+(gCalc/blendcount)*percer;
            bCalc=pix[i+2]*(1-percer)+(bCalc/blendcount)*percer;
            aCalc=pix[i+3]*(1-percer)+(aCalc/blendcount)*percer;
          }
          pix[i]=rCalc;
          pix[i+1]=gCalc;
          pix[i+2]=bCalc;
          pix[i+3]=aCalc;
          
        }
      }
    }
    output.putImageData(fader, 0, 0);
  }
}
