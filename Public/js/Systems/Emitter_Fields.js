
import EmitterBase from "./EmitterBase.js"
import PointNewton from "./Point_Newton.js"

export default class Emitter_Fields extends EmitterBase{
  _type = "Fields"
  _reapRate = 1
  
  constructor(State){
    super(State)
  }
  
  genPoint(e){
    let len=0;
    let color=[0,0,0];
    let alpha=.6;
    let tmp=new PointNewton(this.State, this.count,this.time, [this.State.mouseX,this.State.mouseY],[Math.sin(this.time+this.count)*9,Math.cos(this.time+this.count)*9],90,color,alpha);
    var sizeRand=Math.random(this.count+.3)*10+20;
    tmp.size=sizeRand;
    tmp.origSize=sizeRand;
    tmp.weight=(tmp.weight*.5+.5)*(sizeRand/20+.5);
    this.points.push(tmp);

    this.updateCount()
  }

  newtonSpawn(gen){
    /*
    if(gen == 0){
      cur=0;//new Point;
    }else{
      cur=this.point[this.point.length-1];
    }
    gen+=1;
    if(State.mButton==2){ // Middle mouse click
      setTimeout(function(){
        newtonSpawn(gen);
      },30);
    }
    */
  }
  newtonRelease(){
    if( this.count > 0 ){
      this.points[this.count-1].grow=0;
    }
  }
}