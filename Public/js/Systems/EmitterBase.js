
export default class EmitterBase{
  _type = "EmitterBase"
  get type() {
    return this._type
  }
  set type(value) {
    this._type = value
  }
  
  _reapRate = 3
  get reapRate() {
    return this._reapRate
  }
  set reapRate(value) {
    this._reapRate = value
  }
  
  constructor( State ){
    this.State=State
    this.time = 0
    this.runner = 0
    
    this.count = 0
    this.points = []
    this.reapList = []
    
    this.updateTime()
  }
  
  updateTime(){
    let curTime = new Date().getTime();
    this.time = curTime*.001;
  }
  
  updateCount(){
    this.count = this.points.length
  }
  
  step(){
    this.runner += 1
    this.updateTime()
    if( this.count > 0 ){
      let reapList = []
      for( let x=0; x<this.count; ++x){
        let curPoint = this.points[x];
        if( curPoint ){
          let hasDied = curPoint.step()
          if( hasDied ){
            reapList.push( x );
          }
        }
      }
      
      this.reapList = reapList ;
      
      this.reapParticles( )
    }
  }
  
  reapParticles(){
    if( this.reapList.length > 0 ){
      let maxReap = 10
      let curReap = 0
      while( this.reapList.length > 0 ){
          curReap+=1
          if( curReap > maxReap ){
            break;
          }
          let curPoint = this.reapList.pop()
          delete this.points.splice( curPoint, 1 );
      }
      
      this.updateCount()
    }
	}
  
}