  
class NeurousGL{
  constructor(target, background){
  }
  
  mapBootEngine(){
    // Rederer
    pxlEnv.engine=new THREE.WebGLRenderer({
      canvas: pxlGuiDraws.mapCanvas,
      //alpha:true,
      antialias: false,
      sortObjects:true,
      depth:true,
      //logarithmicDepthBuffer:true,
    });
    var options = {
      format : THREE.RGBAFormat,
      antialias: false,
      sortObjects:true,
      alpha:false,
      type : /(iPad|iPhone|iPod)/g.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType
    };
    pxlEnv.engine.autoClear=true;
      
    pxlEnv.engine.debug.checkShaderErrors=false;
    //%= Dev
    pxlEnv.engine.debug.checkShaderErrors=true;
    //%
    
    if(verbose){
      if(pxlEnv.engine.extensions.get('WEBGL_depth_texture')){
        console.log("  ** WebGL Depth Texture support enabled **");
      }else{
        console.log("  ** WebGL Depth Texture NOT supported **");
      }
      console.log("-- Depth Composer pass currently not used, --");
      console.log("  -- A future technology for Metal Asylum --");
    }
    let bgCd=0x000000;
    let bgCdHex="#000000";
    pxlEnv.engine.setClearColor(pxlEnv.fogColor, 0);
    //pxlEnv.engine.setPixelRatio(window.devicePixelRatio);
    //pxlEnv.engine.setSize(mapW/pxlQuality.screenResPerc, mapH/pxlQuality.screenResPerc);
    pxlEnv.engine.setPixelRatio(1);
    pxlEnv.engine.setSize(1024, 1024);
    //pxlEnv.engine.gammaOutput=true;
    //pxlEnv.engine.gammaFactor=3.2;
    //pxlEnv.engine.outputEncoding=THREE.sRGBEncoding;
    pxlEnv.engine.outputEncoding=THREE.GammaEncoding;
    
    // Build render targets for depth and world space reference
    // ## Can be pulled at Render Pass
    pxlEnv.scene=new THREE.Scene();
      //pxlEnv.scene.fog=new THREE.Fog(0x555555, 100, 5000);
      pxlEnv.scene.fog=pxlEnv.fog;
      
    //pxlEnv.scene.background = new THREE.Color(bgCdHex);
    pxlEnv.scene.background = new THREE.Color(bgCdHex);//pxlEnv.fogColor;
    pxlEnv.scene.renderTarget=new THREE.WebGLRenderTarget(sW*pxlQuality.screenResPerc,sH*pxlQuality.screenResPerc,options);
    pxlEnv.scene.renderTarget.texture.format=THREE.RGBAFormat;
    pxlEnv.scene.renderTarget.texture.minFilter=THREE.LinearFilter;
    pxlEnv.scene.renderTarget.texture.magFilter=THREE.LinearFilter;
    pxlEnv.scene.renderTarget.texture.generateMipmaps=false;
    //pxlEnv.scene.renderTarget.texture.type=THREE.FloatType;
    pxlEnv.scene.renderTarget.depthBuffer=true;
    pxlEnv.scene.renderTarget.depthTexture = new THREE.DepthTexture();
    pxlEnv.scene.renderTarget.depthTexture.format=THREE.DepthFormat;
    pxlEnv.scene.renderTarget.depthTexture.type=THREE.UnsignedIntType;
    //pxlEnv.scene.renderTarget.depthTexture.type=THREE.UnsignedShortType;
    pxlEnv.scene.renderWorldPos=new THREE.WebGLRenderTarget(sW*pxlQuality.screenResPerc,sH*pxlQuality.screenResPerc,options);
    pxlEnv.scene.renderWorldPos.texture.format=THREE.RGBAFormat;
    pxlEnv.scene.renderWorldPos.texture.minFilter=THREE.NearestFilter;
    pxlEnv.scene.renderWorldPos.texture.magFilter=THREE.NearestFilter;
    pxlEnv.scene.renderWorldPos.texture.generateMipmaps=false;
    
    /*pxlEnv.warpZoneRenderTarget=new THREE.WebGLRenderTarget(1024,1024,options);
    pxlEnv.warpZoneRenderTarget.texture.format=THREE.RGBFormat;
    pxlEnv.warpZoneRenderTarget.texture.minFilter=THREE.LinearFilter;
    pxlEnv.warpZoneRenderTarget.texture.magFilter=THREE.LinearFilter;
    pxlEnv.warpZoneRenderTarget.texture.generateMipmaps=false;*/
    
    var aspectRatio=pxlGuiDraws.mapCanvas.width/pxlGuiDraws.mapCanvas.height;
      // To change the near and far, see Environment .init()
    pxlCamera.camera=new THREE.PerspectiveCamera( pxlEnv.pxlCamFOV, 1, pxlEnv.camNear, pxlEnv.camFar);
      pxlAutoCam.camera=pxlCamera.camera;
      
      //pxlEnv.listener = new THREE.AudioListener();
      //pxlCamera.camera.add( pxlEnv.listener );
      
    //pxlCamera.camera.position.set(-20,0,15);
    pxlCamera.cameraAimTarget=new THREE.Object3D();
    pxlEnv.scene.add(pxlCamera.cameraAimTarget);
    pxlCamera.camera.target=pxlCamera.cameraAimTarget;
    
    //pxlEnv.roomSceneList[pxlEnv.mainRoom]=pxlEnv;
    
    //pxlCamera.camera.layers.enable(0);
    pxlCamera.camera.layers.enable(1);
    pxlCamera.camera.layers.enable(2);
      
      
    pxlEnv.scene.add( pxlEnv.userAvatarGroup );
    
  ///////////////////////////////////////////////////
  // -- FILE I/O & Shared Assets -- -- -- -- -- -- //
  ///////////////////////////////////////////////////
    // Texture needs
    pxlUtils.texLoader=new THREE.ImageLoader();
    
    cloud3dTexture=pxlUtils.loadTexture(assetRoot+"cloud3d.jpg");
    //cloud3dTexture.wrapS=THREE.RepeatWrapping;
    //cloud3dTexture.wrapT=THREE.RepeatWrapping;
    cloud3dTexture.wrapS=THREE.MirroredRepeatWrapping;
    cloud3dTexture.wrapT=THREE.MirroredRepeatWrapping;
    cloud3dTexture.repeat.set(5,5);
    
    cloud3dTexture.minFilter=THREE.LinearFilter;
    cloud3dTexture.magFilter=THREE.LinearFilter;
    pxlEnv.cloud3dTexture=cloud3dTexture;
  }
  
  buildComposers(){
		this.mapOverlaySlimPass = new ShaderPass(
			new THREE.ShaderMaterial( {
				uniforms: {
					exposure:{type:"f",value:this.pxlRenderSettings.exposure},
					time:{ value:this.pxlTimer.msRunner },
                    camPos: { value: this.pxlCamera.camera.position },
					ratio:{ type:'f',value: 1 },
					tDiffuse: { value: null },
					rDiffuse: { value: this.scene.renderTarget.texture },
					bloomTexture: { value: this.mapComposerGlow.renderTarget2.texture },
					sceneDepth: { value: this.scene.renderTarget.depthTexture },
					fogMult: { value: this.fogMult },
					proximityMult: { value: this.pxlAvatars.proximityMult },
					//bloomTexture: { value: this.mapComposerMotionBlur.renderTarget2.texture }
				},
				vertexShader: this.pxlShaders.defaultVert(),
				fragmentShader: this.pxlShaders.finalOverlaySlimShader(),
				defines: {}
			} ), "tDiffuse"
		);
		this.mapOverlaySlimPass.needsSwap = true;

		// -- -- -- -- -- -- -- -- -- -- //
		
		this.mapComposer = new EffectComposer(this.engine);
		
		this.mapComposer.addPass( this.mapOverlayHeavyPass );
		this.mapComposer.addPass( this.mapOverlayPass );
		this.mapComposer.addPass( this.mapOverlaySlimPass );
		this.mapOverlayHeavyPass.enabled=false;
		this.mapOverlayPass.enabled=false;
		//this.mapOverlayPass.autoClear=true;
		//this.mapOverlaySlimPass.enabled=false;
  }
}

modules.export = NeurousGL