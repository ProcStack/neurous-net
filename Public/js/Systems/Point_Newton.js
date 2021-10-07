
import Point from "./PointBase.js"

export default class PointNewton extends Point{
  _type = "Newton"

  constructor(State, id,seed,pos,vel,lifeSpan,color,alpha){
    super( State, id,seed,pos,vel,lifeSpan,color,alpha )
    
		this.pullDist=this.weight*90+(State.sW+State.sH)*(.1 + .1*State.mobile);
    
		this.grow=0;
	}
  
	step(){
    super.step()
    if( this.dead == 1 ){
      return true
    }
    
		//this.grow;
		this.sizeGrowUpdate()
		
    this.newForce();
    
    this.postStep()
    
    return false
	}
	sizeGrowUpdate(){
		if(this.grow!=0){
			if(this.grow==-1){
				this.size=this.origSize;
			}else{
				this.size+=this.grow;
			}
		}
	}

}