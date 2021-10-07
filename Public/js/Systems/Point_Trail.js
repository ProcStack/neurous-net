
import Point from "./PointBase.js"

export default class PointTrail extends Point{
   _type = "PointTrail"

  constructor( State, id,seed,pos,vel,lifeSpan,color,alpha,trail,tlen){
    super( State, id,seed,pos,vel,lifeSpan,color,alpha )
		this.pullDist=this.weight*90+(this.State.sW+this.State.sH)*(.1 + .1*this.State.mobile);
		this.tlen=Math.floor(tlen*this.weight);
		this.mouseDist=this.weight*3+1;
		this.trail=new Array();
		for(var x=0; x<tlen; ++x){
			this.trail.push(pos[0]);
			this.trail.push(pos[1]);
		}
    
		this.mousePerc=0;
	}
  
	step(){
    super.step()
    if( this.dead == 1 ){
      return true
    }
    
    
    let sign=e=>e<0?-1:1;
		let normalize=e=>{
      let l=e[0]*e[0]<0?-1:1+e[1]*e[1]<0?-1:1;
      return l==0?[0,0]:[e[0]/l,e[1]/l];
    };
		let mag=e=>((e[0]**2+e[1]**2)**.5);
    
		this.trailUpdate();
		
    if((this.State.mouseAttract>0 )){// || this.State.newtonFields.length>0)){
      if(this.State.mouseAttract==3){
            var mScale=300+(this.State.sW+this.State.sH)*.1;;
            var addedOff=[Math.sin(this.id*75.1579+5014+this.State.runner/30+this.State.mouseX/mScale+Math.cos(this.id*215.15+this.State.runner/123+this.State.mouseY/mScale+this.vel[1])*3.14159265 +this.vel[0])*(Math.sin(this.id/3+this.age/3*Math.cos(this.age/10+this.id*17.357))*5+15) , Math.cos(this.id*75.1579+5014+this.State.runner/17+this.State.mouseY/mScale+Math.sin(this.id*215.15+this.State.runner/178+this.State.mouseX/mScale+this.vel[0])*3.14159265+this.vel[1])*(Math.cos(this.id/3+541+this.age/3*Math.sin(this.age/10-this.id*9.157))*5+15)];
            var offMag=22+this.size*1.5;
            var toPos=[((this.State.mouseX+addedOff[0])-this.pos[0]), ((this.State.mouseY+addedOff[1])-this.pos[1])];
            
            var mather=Math.sqrt( Math.pow(toPos[0],2) + Math.pow(toPos[1],2) );
            offMag=offMag+mather/10;
            var ratio=(toPos[0]/toPos[1]);
            
            var normVel=normalize( [...this.vel] );
            toPos[0]+=normVel[0]*.6;
            toPos[1]+=normVel[1]*.6;
            if(mather>offMag){
              if(Math.abs(ratio)<1){
                toPos[0]=offMag* sign(toPos[0]) ;
                toPos[1]=offMag*(1-ratio)* sign(toPos[1]) ;
              }else{
                ratio=(toPos[1]/toPos[0]);
                toPos[0]=offMag*(1-ratio)* sign(toPos[0]);
                toPos[1]=offMag* sign(toPos[1]) ;
              }
            }
          var smooth=this.id%5+this.size*(this.weight**2)*(1)+2;
          let curWeight=this.weight*.6+.4;
          toPos[0]=(toPos[0]*(1-curWeight)+this.vel[0]*curWeight+this.vel[0]*smooth)/(smooth+1);
          toPos[1]=(toPos[1]*(1-curWeight)+this.vel[1]*curWeight+this.vel[1]*smooth)/(smooth+1);
          this.vel[0]=toPos[0];
          this.vel[1]=toPos[1];
          this.mousePerc=1;
      }else{
          
        var posArr=new Array();
        var infArr=new Array();
        var infRef=.15;
        var infMax=0;
        if(this.State.mouseAttract==1){
          posArr.push([this.State.mouseX,this.State.mouseY]);
          infArr.push(1);
        }
        if(false && this.newtonFields.length>0){ // ##############
          for(var x=this.State.newtonFields.length-1; x>=0; --x){
            if(!this.State.newtonFields[x].dead){
              var nPos=[this.State.newtonFields[x].pos[0], this.State.newtonFields[x].pos[1]];
              posArr.push(nPos);
              var curInf=(this.State.newtonFields[x].weight)*infRef;
              infArr.push(curInf);
            }
          }
        }
        var toPos=[0,0];
        var toPosTemp=[0,0];
        this.mousePerc=0;
        var offMag,addedOff;
        var pullPos=new Array(posArr.length).fill([0,0]);
        var pullWeight=new Array(posArr.length).fill(0);
        var hitNewton=0;
        for(var x=0; x<posArr.length;++x){
          var curMag=mag( [ (posArr[x][0]-this.pos[0]), (posArr[x][1]-this.pos[1]) ] );
          if(curMag<this.pullDist){
            hitNewton=1;
            var blender=((1-curMag/this.pullDist))*infArr[x];
            blender=blender<0?0:blender;
            var inf=blender*(1-this.weight);
            pullWeight[x]=blender;
            var mScale=400;//+(this.State.sW+this.State.sH)*.1;
            
            addedOff=[Math.sin(this.id*75.1579+5014+this.State.runner/30+this.State.mouseX/mScale+Math.cos(this.id*215.15+this.State.runner/150+this.State.mouseY/mScale)*3.14159265)*(Math.sin(this.id/3+this.age/3)*5+15) , Math.cos(this.id*75.1579+5014+this.State.runner/30+this.State.mouseY/mScale+Math.sin(this.id*5215.15+this.State.runner/150+this.State.mouseX/mScale)*3.14159265)*(Math.cos(this.id/3+541+this.age/3)*5+15)];
            offMag=(15-15*blender)+7+this.size*1.5;//*infArr[x];
            if(x==0){
              toPos=[((posArr[x][0]+addedOff[0])-this.pos[0]), ((posArr[x][1]+addedOff[1])-this.pos[1])];
            }else{
              toPosTemp=[((posArr[x][0]+addedOff[0])-this.pos[0])*blender, ((posArr[x][1]+addedOff[1])-this.pos[1])*blender];
              toPos=[toPos[0]+toPos[0]*(1-infArr[x])+toPosTemp[0]*infArr[x], toPos[1]+toPos[1]*(1-infArr[x])+toPosTemp[1]*infArr[x], toPos[2]*(1-infArr[x])+toPosTemp[2]*infArr[x] ];
            }
            var mather=( (toPos[0]**2) + (toPos[1]**2) )**.5;
            offMag=offMag+mather/10;
            if(this.id%3>0){
              toPos[0]+=this.vel[0];
              toPos[1]+=this.vel[1];
              var ratio=(toPos[0]/toPos[1]);
              if(mather>offMag){
                if(Math.abs(ratio)<1){
                  toPos[0]=(offMag* sign(toPos[0]) );
                  toPos[1]=(offMag*(1-ratio)* sign(toPos[1]) );
                }else{
                  ratio=(toPos[1]/toPos[0]);
                  toPos[0]=(offMag*(1-ratio)* sign(toPos[0]) );
                  toPos[1]=(offMag* sign(toPos[1]) );
                }
              }
            }else{
              
              var normVel=normalize( [...this.vel] );
              for(var c=0;c<normVel.length;++c){normVel[c]*=inf}
              var dirVec=normalize( [ (toPos[0]*.5*inf+normVel[0]*(.5+this.State.mobile*1.5)), (toPos[1]*.5*inf+normVel[1]*(.5+this.State.mobile*1.5)) ] );
              var curSpeed=mag([...this.vel]);
              curSpeed=curSpeed<offMag?curSpeed:offMag;
              toPos=[ curSpeed*dirVec[0]*inf, curSpeed*dirVec[1]*inf ];
              //toPos=[ offMag*sign(toPos[0]+normVel[0]), offMag* sign(toPos[1]+normVel[1]) ];
            }
            pullPos[x]=[...toPos];
          }else{
            this.mousePerc=Math.max(this.mousePerc, 0);
          }
          this.mouseDist=Math.min(this.mouseDist, mag);
        }
        //toPos[0]/=infMax;
        //toPos[1]/=infMax;
        //.reduce( (x,c)=>x+c)
        if( hitNewton > 0){
          var totalWeight=pullWeight.reduce( (x,c)=>x+c);
            
          blender=(1-(this.weight*.3));//(this.weight**2);//*this.weight*Math.sin(this.State.curTime*.01);
          //var curMouseVel=1-this.State.mouseVelMag*this.weight*5;
          var curMouseVel=1-this.weight;
          var smooth=(this.id%5+this.size)*curMouseVel*blender;
          var avgPos=[0,0];
          try{
          for(var x=0; x<pullPos.length;++x){
            avgPos[0]+=pullPos[x][0];
            avgPos[1]+=pullPos[x][1];
          }
          }catch(err){}
          avgPos=[avgPos[0]*blender, avgPos[1]*blender];
          avgPos[0]=(avgPos[0]+this.vel[0]*smooth)/(smooth+blender);
          avgPos[1]=(avgPos[1]+this.vel[1]*smooth)/(smooth+blender);
          
          //blender=(1-this.State.mouseVelMag/this.velMagCap*this.weight) * blender;
          var vel=[...this.vel];
          vel= [ vel[0]*blender+avgPos[0]*(1-blender), vel[1]*blender+avgPos[1]*(1-blender) ];
          this.setVel(vel,1);
          this.mousePerc=blender;
        }
      }
    }else{
      this.mousePerc=0;
    }

    this.newForce()
    
    this.postStep()
    
    return false
	}
	
	trailUpdate(){
		this.trail.push(this.pos[0]);
		this.trail.push(this.pos[1]);
		if(this.trail.length>this.tlen){
			this.trail=this.trail.slice(2,this.trail.length);
		}
	}
}