
import Point from "./PointBase.js"

export default class PointTrail extends Point{
   _type = "PointTrail"

  constructor( State, id,seed,pos,vel,lifeSpan,color,alpha,trail,tlen, forces){
    super( State, id,seed,pos,vel,lifeSpan,color,alpha )
    
		this.pullDist = this.weight*90+(this.State.sW+this.State.sH)*(.1 + .1*this.State.mobile);
    
		this.velMagCap = 30+(30*this.size);
    
		this.tlen = Math.floor(tlen*this.weight)
		this.mouseDist = this.weight*3+1
		this.trail = [];
		for(var x=0; x<tlen; ++x){
			this.trail.push(pos[0])
			this.trail.push(pos[1])
		}
    
    this.prevToPos = [...vel]
		this.mousePerc = 0
    
    this.forces = forces
    
    this.targetOffsetDist = 10+10*this.weight
    this.targetOffsetVariance = 10*this.weight
    
	}
  
	step(){
    super.step()
    if( this.dead == 1 ){
      return true
    }
    
    this.mousePerc *= .9
    
		this.trailUpdate();
		
    if((this.State.mouseAttract>0 || this.forces.length>0)){
      if(this.State.mouseAttract==3){
        this.fullPullInfluence()
      }else{
        this.calculateForceInfluences()
      }
    }else{
      this.prevToPos = [...this.vel]
    }

    this.clampVel()
    this.newForce()
    
    this.postStep()
    if( this.bounce = 1 ){
      this.prevToPos = [...this.vel]
    }
    
    return false
	}
  
  getTargetOffset( multOffset=1 ){
    var mScale=400+(this.State.sW+this.State.sH)*.1;
    let mScaleWH=[ this.State.mouseX/mScale, this.State.mouseY/mScale ];
    let idSeedInf = this.id * 75.1579 + 5014 + this.seed;
    let runnerScale = this.State.runner/30;
    let pi = 3.14159265358979
    let magNoise = this.id/3+this.age/3
    
    let addedOff=[
      Math.sin( idSeedInf + runnerScale + mScaleWH[0] + Math.cos(this.id*215.15+ runnerScale*.2 +mScaleWH[1])*pi)  *  (Math.sin( magNoise )*this.targetOffsetVariance+this.targetOffsetDist*multOffset),
      Math.cos( idSeedInf + runnerScale + mScaleWH[1] + Math.sin(this.id*5215.15+ runnerScale*.2 +mScaleWH[0])*pi)  *  (Math.cos( magNoise+this.seed )*this.targetOffsetVariance+this.targetOffsetDist*multOffset)
    ];
    
    return addedOff;
  }
  
  fullPullInfluence(){
    let sign=e=>e<0?-1:1;
		let normalize=e=>{
      let l=e[0]*sign(e[0])+e[1]*sign(e[1]);
      return l==0 ? [0,0] : [e[0]/l,e[1]/l];
    };
    let dot=(e,b)=>{ return e[0]*b[0]+e[1]*b[1] };
		let mag=e=>((e[0]**2+e[1]**2)**.5);
		let lerpVec=(x,c,v)=>{ return [ lerp(x[0],c[0],v), lerp(x[1],c[1],v) ] };
		let lerp=(x,c,v)=>{ return x*(1-v) + c*v };
    
    var mScale=300+(this.State.sW+this.State.sH)*.1;
    
    let addedOff = this.getTargetOffset();
    
    var offMag=22+this.size*1.5;
    var toPos=[((this.State.mouseX+addedOff[0])-this.pos[0]), ((this.State.mouseY+addedOff[1])-this.pos[1])];
    var normPos=normalize(toPos);
    let pushPosMult = 100;
    toPos[0] += normPos[0] * pushPosMult ;
    toPos[1] += normPos[1] * pushPosMult ;
    
    var mather=mag( toPos );
    offMag=offMag+mather*.4;
    var ratio=(toPos[0]/toPos[1]);
    
    var normVel=normalize( [...this.vel] );
    toPos[0]+=normVel[0]*6;
    toPos[1]+=normVel[1]*6;
    if(mather>offMag){
      toPos = normalize( toPos )
      toPos[0] *= offMag;
      toPos[1] *= offMag;
    }
    var smooth=this.id%5+this.size*((this.weight*.6+.4)**2);
    let curWeight=this.weight*.4+.4;
    toPos[0]=(toPos[0]*(1-curWeight)+this.vel[0]*curWeight+this.vel[0]*smooth)/(smooth+1);
    toPos[1]=(toPos[1]*(1-curWeight)+this.vel[1]*curWeight+this.vel[1]*smooth)/(smooth+1);
    
    let weightInf = this.weight*.4+.6;
    let vDelta=((dot( normalize(this.vel), normalize(toPos) )*.6+.4)*weightInf + (1-weightInf));

    toPos = lerpVec( this.vel, toPos, vDelta );
    toPos = lerpVec( this.prevToPos, toPos, .5);
    this.vel[0]=toPos[0];
    this.vel[1]=toPos[1];
    this.prevToPos = toPos;
    this.mousePerc = Math.min( 1, this.mousePerc+.2 );
  }
  
  calculateForceInfluences(){
    
    let sign=e=>e<0?-1:1;
		let normalize=e=>{
      let l=e[0]*sign(e[0])+e[1]*sign(e[1]);
      return l==0 ? [0,0] : [e[0]/l,e[1]/l];
    };
		let mag=e=>((e[0]**2+e[1]**2)**.5);
    let dot=(e,b)=>{ return e[0]*b[0]+e[1]*b[1] };
    
    var posArr=new Array();
    var infArr=new Array();
    var infRef=.7;
    var infMax=0;
    if(this.State.mouseAttract==1){
      posArr.push([this.State.mouseX,this.State.mouseY]);
      infArr.push(.9);
    }
    if(this.forces.length>0){ 
      for(var x=0; x<this.forces.length; ++x){
        posArr.push( this.forces[x].pos );
        var curInf=(this.forces[x].weight)*infRef;
        infArr.push(curInf);
      }
    }
    
    var toPos=[0,0];
    var toPosTemp=[0,0];
    
    var pullPos=[];
    var pullWeight=[];
    var forceInfluence=0;
    
    let addedOff = this.getTargetOffset();
    
    for(var x=0; x<posArr.length;++x){
      var curMag=mag( [ (posArr[x][0]-this.pos[0]), (posArr[x][1]-this.pos[1]) ] );
      if(curMag<this.pullDist){
        forceInfluence=1;
        var blender=((1-curMag/this.pullDist))*infArr[x];
        blender=Math.max( 0, blender );
        
        var inf=blender*(1-this.weight);
        
        
        let offMag=(15-15*inf) + 7 + this.weight*1.5;//*infArr[x];
        toPos=[((posArr[x][0]+addedOff[0])-this.pos[0]), ((posArr[x][1]+addedOff[1])-this.pos[1])];
        
        let targetDot = dot( normalize(toPos), normalize(this.vel) )*.3+.7;

        pullWeight.push( inf*(1-targetDot*(this.weight*.3+.7)) );
        
        pullPos.push( [...toPos] );
      }
      this.mouseDist=Math.min(this.mouseDist, curMag);
    }
    
    if( forceInfluence > 0){
      var totalWeight=pullWeight.reduce( (x,c)=>x+c);
        
      var avgPos = [0,0];
      var avgWeight = 0;
      for(var x=0; x<pullPos.length;++x){
        avgWeight += pullWeight[x];
        avgPos[0] += pullPos[x][0] * avgWeight
        avgPos[1] += pullPos[x][1] * avgWeight
      }
      
      this.mousePerc = Math.min( 1, this.mousePerc + avgWeight*.5 );

      avgPos[0] = avgPos[0]/pullPos.length
      avgPos[1] = avgPos[1]/pullPos.length
      let avgVelDot = (dot( normalize(avgPos), normalize(this.vel) )*.2+.8)*avgWeight;// * (1-this.mousePerc) + this.mousePerc;
      //avgVelDot *= 1-this.weight
      this.vel[0] += avgPos[0]*avgVelDot;
      this.vel[1] += avgPos[1]*avgVelDot;
      
      
    }
  }
	
	trailUpdate(){
		this.trail.push(this.pos[0]);
		this.trail.push(this.pos[1]);
		if( this.trail.length>this.tlen ){
			this.trail = this.trail.slice(2,this.trail.length);
		}
	}
}