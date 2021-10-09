
import EmitterBase from  "./EmitterBase.js" 
import PointSpark from  "./Point_Spark.js" 

class Emitter_Sparks extends EmitterBase{
  constructor(State){
    super(State)
    this._type = "Sparks"
  }
  
  
	newPoints(pos, count, alphaMult, age, spark){
		for(let c=0;c<count;++c){
			let seed = ((this.time+c)*12334.53) % 1000;
      let pCount = this.curId
			let len = Math.sin(this.runner*23.24+23+seed+pCount)*3+4;
      
			let color = [
                  Math.sin(len*23.24+23+seed+pCount+len)*10+35,
                  Math.sin(len*23.24+seed+pCount+len)*10+45,
                  Math.sin(len*23.24+23+seed+pCount+len)*15+80
                ];
      let alpha = (Math.sin( seed + pCount )*.3+.7) * alphaMult;
      
			let life = Math.floor(Math.sin(len*125.9757+seed+c+pCount+345)*age[0]+age[1]);
      let vel = [ Math.sin(c*230.34+seed+3434)*10, Math.cos(c*630.53+seed+134)*10 ];
      
			let tmp = new PointSpark(this.State, pCount,seed, pos, vel, life, color, alpha, [], Math.floor(len));

			this.points.push(tmp);
      this.updateCount()
		}
	}

  genPoint(xy,count){
    this.newPoints( xy, count, .5, [2,5], 1 );
  }
}

export default Emitter_Sparks