function XboxButtonAnimation () {

	  var _intervalID = 0;
      var cyclesCounter = 0;
      var totFrames = 4; // NUMBER OF ANIMATION FRAMES

	  var loadingTime_default = 2000;
	  var frameDuration_default = 300;
	  var exitDuration_default = 400;
	  var cycles_default = 2;

	  var LoadingTime = loadingTime_default;
	  var FrameDuration = frameDuration_default;
	  var ExitDuration = exitDuration_default;
	  var Cycles = cycles_default;
	  
      var cyclesCounter = 0;	  
	  	  
      this.SetCycles = SetCycles;
      this.SetLoadingTime = SetLoadingTime;
      this.SetFrameDuration = SetFrameDuration;
      this.SetExitDuration= SetExitDuration;
      // --------
	  this.ValidateInstance=ValidateInstance;
	  this.Start=Start;
	  this.RenderFrame=RenderFrame;
	  this._ClearCallingInterval=_ClearCallingInterval;
	  this._ClearCallingIntervalExit=_ClearCallingIntervalExit;
	  this.FrameFactory=FrameFactory;
	  this.Reset=Reset;
	  this.Exit=Exit;
  
    // Properties
    function SetCycles(cycles) {
      Cycles = !isNaN(cycles) ? cycles : 0;
    }
    
    function SetExitDuration(exitduration) {
      ExitDuration = !isNaN(exitduration) ? exitduration : 0;      
    }

    function SetFrameDuration(frameduration) {
      FrameDuration = !isNaN(frameduration) ? frameduration : 0;      
    }

    function SetLoadingTime(loadingtime) {
      LoadingTime = !isNaN(loadingtime) ? loadingtime : 0;      
    }

    // Methods
    function ValidateInstance() {
       if  (isNaN(Cycles) || (Cycles==0)) Cycles = cycles_default;
       if  (isNaN(LoadingTime) || (LoadingTime==0)) LoadingTime = loadingTime_default;
       if  (isNaN(FrameDuration) || (FrameDuration==0)) FrameDuration = frameDuration_duration;
       if  (isNaN(ExitDuration) || (ExitDuration==0)) ExitDuration = exitDuration_duration;
    }	  
	  
	  function Start() {
	     ValidateInstance();
	     cyclesCounter = Cycles;
	     FrameFactory(1);
	  }
	   
	  function RenderFrame(step) {
		$('.xbox').attr( 'src', 'img/button_xbox3_frame_' + step + '.gif' );
	  }
	
	  function _ClearCallingInterval() {
		 if (_intervalID!=0) window.clearTimeout(_intervalID);
	  }

	  function _ClearCallingIntervalExit() {
		 if (_intervalID!=0) window.clearInterval(_intervalID);
	  }

	  function FrameFactory(iframe) {
		 _ClearCallingInterval();
		 RenderFrame(iframe);
		 if (iframe==1 && (cyclesCounter==Cycles)) {
		   // FROM THE FIRST FRAME      
		   _intervalID=window.setTimeout(function() {FrameFactory(iframe+1);}, LoadingTime);
		 } else {
		   if (iframe==totFrames) {
		     // LAST FRAME  
		     cyclesCounter--;
			 if (cyclesCounter>=1) {
			    // LOAD FIRST FRAME
				_intervalID=window.setTimeout(function() {FrameFactory(1);}, FrameDuration);
			 } else {
			    // END ANIMATION
				_intervalID=window.setTimeout(function() {Exit(true);}, FrameDuration);
			 }
           } else {
             // NORMAL LOAD		   
		     _intervalID=window.setTimeout(function() {FrameFactory(iframe+1);}, FrameDuration);
		   }
		 }  
	  }
	
	  function Reset() {
      _ClearCallingIntervalExit();		 
      cyclesCounter=Cycles;     
		  $('.xbox').attr( 'src', 'img/button_xbox3.gif' );
	  }
	  
	  function Exit(success) {
		  _intervalID=window.setInterval(function() {Reset();}, ExitDuration);
		  if (success) window.open( $('#xboxlink').attr( 'value' ) , '' ,'_blank');
	  }

}

var PageXboxButtonAni = null;
<!-- Click - Event Handler -->  
$(function() {
     $(".xbox").click(function () {	
          // Xbox Animation
          if (!PageXboxButtonAni) {
            PageXboxButtonAni = new XboxButtonAnimation();			  
            PageXboxButtonAni.SetCycles(2);
            PageXboxButtonAni.SetLoadingTime(2000);
            PageXboxButtonAni.SetFrameDuration(300);
            PageXboxButtonAni.SetExitDuration(400);               
            PageXboxButtonAni.Start();
            PageXboxButtonAni = null;
          }	  
     })
})
