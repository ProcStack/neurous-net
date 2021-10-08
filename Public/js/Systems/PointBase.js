
export default class Point{
  _type = "Point"
  get type() {
    return this._type
  }
  set type(value) {
    this._type = value
  }

  constructor(State, id,seed,pos,vel,age,color,alpha){
    this.State=State;
		this.id=id;
    this.seed=seed;
		this.pos=pos;
    this.prevPos=pos;
		this.weight=Math.sin(id*512.532+id*52.63*Math.cos(seed+id*15.7391*Math.sin(-seed/3.14))+seed)*.5+.5;

		this.size=this.weight*3+1;
		this.origSize=this.weight*3+1;
		this.speed=0;
    
		this.vel=vel;
		this.velMagCap=15+(15*this.weight);

		if(age>0){
			this.life=age;
			this.fade=age*.95;
		}else{
			this.life=-1;
			this.fade=-1;
		}
		this.age=0;
		this.dead=0;
		this.color=color;
		this.alpha=alpha;
		this.bounce=0;
		this.mousePerc=0;
	}
  
	step(){
		this.age+=1;
		if(this.age >= this.life && this.life>0){
			this.dead=1;
			return true
		}
		this.checkFadeToDeath()
    return false
	}
  
  postStep(){
    this.prevPos = [ ...this.pos ]
    this.checkFieldPosition();
		var mag=e=>((e[0]**2+e[1]**2)**.5);
		this.speed=mag( [ this.pos[0]-this.prevPos[0], this.pos[1]-this.prevPos[1] ] );
  }
  
	checkFadeToDeath(){
		if(this.life>0){
			if(this.age>this.fade){
				var val= Math.min(1, (this.age-this.fade) / (this.life-this.fade));
				this.size=(this.origSize*(1-val));
				this.weight=this.weight*(1-val*.4);
				this.alpha=this.alpha*(1-val*.3);
			}else if(this.age>this.life){
				this.size=0;
				this.weight=0;
				this.alpha=0;
			}
		}
	}
  
  newForce(){
    let force=[Math.sin(this.id*234+this.seed+35+this.pos[0]+this.age),Math.sin(this.id*1023+this.seed+1325+this.pos[1]+this.age)];
    this.addForce(force);
  }
	addForce( force, clamp=0 ){
		this.vel[0] += force[0];
		this.vel[1] += force[1];
		if( (this.pos[0]+this.vel[0])<=0 || (this.pos[0]+this.vel[0])>=this.State.sW ){
			this.vel[0] = this.vel[0]*-1;
		}
		if( (this.pos[1]+this.vel[1])<=0 || (this.pos[1]+this.vel[1])>=this.State.sH ){
			this.vel[1] = this.vel[1]*-1;
		}
		if(clamp) this.clampVel();
	}
	setPos( poser ){
		this.pos = poser;
		this.trail.push(this.pos[0]);
		this.trail.push(this.pos[1]);
		if( this.trail.length>this.tlen ){
			this.trail = this.trail.slice(2,this.trail.length);
		}
	}
	checkFieldPosition(){
    let padding = 0;
    let maxWH = [ this.State.sW-padding, this.State.sH-padding ]
    let toPos = [ ...this.pos ]
		toPos[0] = Math.min( Math.max(padding, toPos[0]+this.vel[0]), maxWH[0] );
		toPos[1] = Math.min( Math.max(padding, toPos[1]+this.vel[1]), maxWH[1] );
		if( toPos[0]<=padding || toPos[0]>=maxWH[0] ){
      this.pos[0] = toPos[0];
			this.vel[0] = -this.vel[0];//*(Math.sin(this.id*4025+this.age+self.id)*.2-1);
			this.bounce = 1;
		}else{
      this.pos[0] += this.vel[0];
    }
		if( toPos[1]<=padding || toPos[1]>=maxWH[1] ){
      this.pos[1] = toPos[1];
			this.vel[1] = -this.vel[1];//*(Math.sin(this.id*405+this.age+self.id)*.2-1);
			this.bounce = 1;
		}else{
      this.pos[1] += this.vel[1];
    }
	}
	setVel(veler, clamp=0){
		this.vel[0] = veler[0];
		this.vel[1] = veler[1];
		if(clamp) this.clampVel();
	}
	clampVel( addWeight=0 ){
		var tmpVel = [...this.vel];
		var scaler = (tmpVel[0]**2+tmpVel[1]**2)**.5;
		scaler = scaler>this.velMagCap ? this.velMagCap/scaler : 1;
		tmpVel[0] *= scaler;
		tmpVel[1] *= scaler;
		
		this.vel=tmpVel;
	}
	bounce( val ){
		if( val == 0 ){
			this.bounce = 0;
		}else{
			return this.bounce;
		}
	}
}