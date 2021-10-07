
import EmitterBase from "./EmitterBase.js"
import PointTrail from "./Point_Trail.js"

export default class Emitter_PointTrails extends EmitterBase{
  _type = "PointTrails"
  constructor(State){
    super(State)
  }
  
	collisionParticles(){
    let collisionPoints=[]
		for(var x=0;x<this.count;++x){
			if(this.points[x].bounce==1 && this.points[x].age>10){
				collisionPoints.push([this.points[x].pos[0],this.points[x].pos[1]]);
			}
		}
    return collisionPoints;
	}
  
  scatterPoints( xy, count ){
      var tmp,len,rage, color,alpha;
      let width = xy[0];
      let height = xy[1];
      for(var x=0;x<count;++x){
        let pCount = this.count
        let pSeed = this.time + x
        if(x%10==0){
          len=Math.sin(this.runner*23.24+23+pCount)*4+11;
        }else{
          len=Math.sin(this.runner*23.24+23+pCount)*4+6;
        }
        if(x%4==0){
          alpha=Math.sin(x*234.353)*.1+.35;
          color=[ Math.sin(len*283.24+23+pCount+len)*10+20, Math.sin(len*233.24+23+pCount+len)*15+35, Math.sin(len*6723.24+23+pCount+len)*30+95];
        }else{
          alpha=Math.min(1,Math.sin(x*234.353)*.3+.95);
          color=[ Math.sin(len*263.24+23+pCount+len)*10+20, Math.sin(len*223.24+23+pCount+len)*20+45, Math.sin(len*123.24+23+pCount+len)*35+150];
        }
        let pointXY=[
          (Math.sin(x*230+3434+len)*.5+.5)*width,
          (Math.sin(x*20+234+len)*.5+.5)*height
        ]
        let pointVel=[
          Math.sin(x*230+3434+len)*10,
          Math.sin(x*630+134+len)*10
        ]
        let tmp=new PointTrail(this.State, x, pSeed, pointXY,pointVel,0,color,alpha,[],Math.floor(len));
        this.points.push(tmp);
        this.updateCount()
      }
  }

  genPoint(e){
    var len,alpha,color;
    let pCount = this.count
    let pSeed = this.time
    if(pCount%10==0){
      len=Math.sin(this.runner*23.24+this.time+23+pCount)*4+11;
    }else{
      len=Math.sin(this.runner*23.24+this.time+23+pCount)*4+6;
    }
    if(pCount%4==0){
      alpha=Math.sin(pCount*234.353)*.1+.35;
      color=[ Math.sin(len*223.24+this.time+23+pCount+len)*10+20, Math.sin(len*213.24+23+this.time+pCount+len)*15+35, Math.cos(len*233.24+23+this.time+pCount+len)*30+95];
    }else{
      alpha=Math.min(1,Math.sin(pCount*234.353)*.3+.95);
      color=[ Math.sin(len*2633.24+23+this.time+pCount+len)*10+20, Math.sin(len*243.24+23+this.time+pCount+len)*20+45, Math.cos(len*235.24+23+this.time+pCount+len)*35+150];
    }
    let tmp=new PointTrail(this.State, pCount, pSeed, [this.State.mouseX,this.State.mouseY],[Math.sin(pCount*230+this.time+3434+len)*10,Math.cos(pCount*630+this.time+134+len)*10],0,color,alpha,[],Math.floor(len));
    this.points.push(tmp);
    
    pCount += 1
    pSeed += 1
    tmp=new PointTrail(this.State, pCount, pSeed, [this.State.mouseX,this.State.mouseY],[Math.sin(pCount*430+this.time+434+len)*10,Math.cos(pCount*30+this.time+2134+len)*10],0,color,alpha,[],Math.floor(len));
    this.points.push(tmp);
    
    this.updateCount()
  }

}