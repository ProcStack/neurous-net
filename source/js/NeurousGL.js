// import * as THREE from "../../node_modules/three/build/three.module.js" 
// import { EffectComposer } from  '../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js' 
// import { RenderPass } from  '../../node_modules/three/examples/jsm/postprocessing/RenderPass.js' 
// import { ShaderPass } from  '../../node_modules/three/examples/jsm/postprocessing/ShaderPass.js' 
import * as THREE from "../libs/three/build/three.module.js" 
import { EffectComposer } from  '../libs/three/examples/jsm/postprocessing/EffectComposer.js' 
import { RenderPass } from  '../libs/three/examples/jsm/postprocessing/RenderPass.js' 
import { ShaderPass } from  '../libs/three/examples/jsm/postprocessing/ShaderPass.js' 
import { UnrealBloomPass } from '../../libs/three/examples/jsm/postprocessing/UnrealBloomPass.js'

import Shaders from  "./Shaders/Shaders.js" 


class NeurousGL{
  constructor(target, source){
    this.engine = null
    this.composer = null
    this.canvas = target
    this.scene = null
    
    this.resWH = null;
    this.resUV = null;
    
    this.time=null;
    
    this.textureLoader = null
    this.textures = {}
    
    this.source = source
    this.pointTexture = null
    
    this.shaderPasses = {}
    
    this.cameraOptions = {
      fov : 70,
      aspect : 1,
      clipping : {
        near : .1,
        far : 10
      }
    }
  }
  
  init(){
    // Rederer
    this.engine=new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha:true,
      antialias: false,
      sortObjects:false,
      depth:false,
      //logarithmicDepthBuffer:true,
    });
    var options = {
      format : THREE.RGBAFormat,
      antialias: false,
      sortObjects:false,
      alpha:true,
      type : /(iPad|iPhone|iPod)/g.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType
    };
    this.engine.autoClear=true;
      
    this.time = new THREE.Vector2(0,0);
    
    let bgCd=0x000000;
    let bgCdHex="#000000";
    this.engine.setClearColor(bgCd, 0);
    this.engine.setPixelRatio(1);
    
    let cnW = this.canvas.width
    let cnH = this.canvas.height
    
    this.resWH = new THREE.Vector2( cnW, cnH );
    this.resUV = new THREE.Vector2( 1/cnW, 1/cnH );
    
    this.engine.setSize( cnW, cnH );
    this.engine.outputEncoding=THREE.GammaEncoding;
    
    this.scene=new THREE.Scene();
      
    this.scene.background = new THREE.Color(bgCdHex);//pxlEnv.fogColor;
    this.scene.renderTarget=new THREE.WebGLRenderTarget( cnW*.5, cnH*.5, options);
    this.scene.renderTarget.texture.format=THREE.RGBAFormat;
    this.scene.renderTarget.texture.minFilter=THREE.LinearFilter; // THREE.NearestFilter;
    this.scene.renderTarget.texture.magFilter=THREE.LinearFilter; // THREE.NearestFilter;
    this.scene.renderTarget.texture.generateMipmaps=false;
    
    
    this.camera=new THREE.PerspectiveCamera( this.cameraOptions.fov, this.cameraOptions.aspect, this.cameraOptions.clipping.near, this.cameraOptions.clipping.far);

      
    // this.camera.position.set(-20,0,15);
    // this.cameraAimTarget=new THREE.Object3D();
    // this.scene.add(pxlCamera.cameraAimTarget);
    
    
    //this.camera.layers.enable(0);
      
      
      
    // Texture needs
    this.textureLoader=new THREE.ImageLoader();
    
    //cloud3dTexture=this.textureLoader.loadTexture(assetRoot+"cloud3d.jpg");
    ////cloud3dTexture.wrapS=THREE.RepeatWrapping;
    ////cloud3dTexture.wrapT=THREE.RepeatWrapping;
    // cloud3dTexture.wrapS=THREE.MirroredRepeatWrapping;
    // cloud3dTexture.wrapT=THREE.MirroredRepeatWrapping;
    // cloud3dTexture.repeat.set(5,5);
    
    // cloud3dTexture.minFilter=THREE.LinearFilter;
    // cloud3dTexture.magFilter=THREE.LinearFilter;
    // this.cloud3dTexture=cloud3dTexture;
    
    this.pointTexture = new THREE.CanvasTexture(this.source);
    this.pointTexture.needsUpdate = true;
    this.pointTexture.format=THREE.RGBAFormat;
    
    this.buildComposers()
  }
  
  buildComposers(){
    
		this.composer = new EffectComposer(this.engine);
    
		this.shaderPasses.blurXShaderPass = new ShaderPass(
			new THREE.ShaderMaterial( {
				uniforms: {
					time:{ value:this.time },
					tDiffuse: { value: null },
					pDiffuse: { value: this.pointTexture },
					resUV: { value: this.resUV },
				},
				vertexShader: Shaders.Defaults.vert(),
				fragmentShader: Shaders.BlurShaderPass.directionalBlurPass( "pDiffuse", [1,0], 20, 1.5 ),
				defines: {}
			} ), "tDiffuse"
		);
    this.shaderPasses.blurXShaderPass.material.transparent = true
		this.shaderPasses.blurXShaderPass.needsSwap = true;
		this.composer.addPass( this.shaderPasses.blurXShaderPass );
    
		this.shaderPasses.blurYShaderPass = new ShaderPass(
			new THREE.ShaderMaterial( {
				uniforms: {
					time:{ value:this.time },
					tDiffuse: { value: null },
					pDiffuse: { value: this.pointTexture },
					resUV: { value: this.resUV },
				},
				vertexShader: Shaders.Defaults.vert(),
				fragmentShader: Shaders.BlurShaderPass.directionalBlurPass( "tDiffuse", [0,1], 20, 1.5 ),
				defines: {}
			} ), "tDiffuse"
		);
    this.shaderPasses.blurYShaderPass.material.transparent = true
		this.composer.addPass( this.shaderPasses.blurYShaderPass );
    
    
		this.shaderPasses.scatterMixShaderPass = new ShaderPass(
			new THREE.ShaderMaterial( {
				uniforms: {
					time:{ value:this.time },
					tDiffuse: { value: null },
					pDiffuse: { value: this.pointTexture },
					resUV: { value: this.resUV },
				},
				vertexShader: Shaders.Defaults.vert(),
				fragmentShader: Shaders.BloomShaderPass.scatterMixShaderPass(),
				defines: {}
			} ), "tDiffuse"
		);
    this.shaderPasses.scatterMixShaderPass.material.transparent = true
		this.composer.addPass( this.shaderPasses.scatterMixShaderPass );
    
		
		// -- -- -- -- -- -- -- -- -- -- //
		
		
		//this.composer.addPass( this.shaderPasses.blurShaderPass );
		//this.shaderPasses.bloomShaderPass.enabled=true;
		//this.mapOverlayPass.autoClear=true;
		//this.mapOverlaySlimPass.enabled=false;
  }
  
  resize(){
    let cnW = this.canvas.width
    let cnH = this.canvas.height
    console.log(cnW,cnH)
    
    this.resWH.set( cnW, cnH );
    this.resUV.set( 1/cnW, 1/cnH );
    
    this.engine.setSize( cnW, cnH );
    this.scene.renderTarget.setSize( cnW*.5, cnH*.5);
    
    
    this.pointTexture = new THREE.CanvasTexture(this.source);
    this.pointTexture.needsUpdate = true;
    this.pointTexture.format=THREE.RGBAFormat;
    
    let shaderKeys = Object.keys( this.shaderPasses )
    shaderKeys.forEach( (s)=>{
      this.shaderPasses[s].material.uniforms.pDiffuse.value = this.pointTexture;
    })
  }
  
  render( time ){
    this.time.x = time
    this.pointTexture.needsUpdate = true;
    this.composer.render()
  }
}

export default NeurousGL