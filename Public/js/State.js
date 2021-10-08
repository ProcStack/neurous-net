// NeurousNet; Kevin Edzenga
//
//  Device and Interaction States


const State={
  sW : window.innerWidth,
  sH : window.innerHeight,
  mobile : false,
  tablet : false,
  mouseX : 0,
  mouseY : 0,
  mousePrevX : [0,0],
  mousePrevY : [0,0],
  mButton : 0,
  pause : 0,
  runner : 0,
  mouseAttract : 0,

  mouseVel : [0,0],
  mouseVelMag : 0,
  touchDown : 0,
  touchDragCount : 0,
  touchTwoFinger : 0,
  touchTwoFingerPrev : 0,
  touchTimer:null,
  longTouchLength : 500,
  doubleTouchVal : 0,
  touchDoubleTimer:null,
  doubleTouchLength : 600,
  introCardsOrient : 0,

  curTime : (new Date().getTime())*.1,

  IE : document.all?true:false
} 

export default State