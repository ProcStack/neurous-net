
import Point from "./PointBase.js"

export default class PointSpark extends Point{
  _type = "Spark"

  constructor(State, id,seed,pos,vel,lifeSpan,color,alpha,trail,tlen){
    super( State, id,seed,pos,vel,lifeSpan,color,alpha )

		this.tlen=Math.floor(tlen*this.weight);
		this.size=this.weight*3+1;
		this.origSize=this.weight*3+1;
		this.speed=0;
		this.trail=new Array();
		for(var x=0; x<tlen; ++x){
			this.trail.push(pos[0]);
			this.trail.push(pos[1]);
		}
	}
  
	step(){
		super.step()
    if( this.dead == 1 ){
      return true
    }
    
    this.newForce();
    
		this.trailUpdate()
		
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