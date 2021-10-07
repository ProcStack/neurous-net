
import EmitterBase from "./EmitterBase.js"
import PointSpark from "./Point_Spark.js"

export default class Emitter_Sparks extends EmitterBase{
  _type = "Sparks"
  constructor(State){
    super(State)
  }
  
  
	newPoints(pos, count,alpha, age, spark){
		for(var c=0;c<count;++c){
			let seed=this.time+c;
      let pCount = this.count
			let len=Math.sin(this.State.runner*23.24+23+seed+pCount)*4+6;
			let color=[ Math.sin(len*23.24+23+seed+pCount+len)*10+35, Math.sin(len*23.24+seed+pCount+len)*10+45, Math.sin(len*23.24+23+seed+pCount+len)*15+80];
			let rage=Math.floor(Math.sin(len*125.9757+seed+c+pCount+345)*age[0]+age[1]);
			let tmp=new PointSpark(this.State, pCount,this.time, pos,[Math.sin(c*230+seed+3434+len)*10,Math.cos(c*630+seed+134+len)*10],rage,color,alpha,[],Math.floor(len));
			//tmp=new PointSpark(pCount,[this.points[x].trail[0],this.points[x].trail[1]],[],Math.floor(len),[Math.sin(c*230+3434+len)*10,Math.sin(c*630+134+len)*10],rage,color,1);
			this.points.push(tmp);
      this.updateCount()
		}
	}

  genPoint(xy,count){
    this.newPoints( xy, count, .5, [2,5], 1 );
  }
}