import React, { useState } from "react"; 
import ReactDOM from 'react-dom'
import './App.css';
import ReactPlayer from 'react-player'

const fabric = require("fabric").fabric;
const Nuclear = require("nuclear-js");
const createReactClass = require('create-react-class');

var frame_rate = 15;
var current_annotation_data = []

var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = key;
    }
  }
  return ret;
};

var reactor = new Nuclear.Reactor({ debug: true });
var keys = keyMirror({ fabricData: null, activeObject: null });

// globally accessable fabricCanvas instance
var fabricCanvas = new fabric.Canvas();
var canvas_DOM;

// A place to put fabric data
var fabricStore = Nuclear.Store({
  getInitialState() {
    return Nuclear.toImmutable({
    	fabricData: {
      	objects: [],
      },
      activeObject: false,
    })
  },
  initialize() {
    this.on(keys.fabricData, this.saveFabricData)
    this.on(keys.activeObject, this.saveActiveObject)
  },
  saveFabricData(state, fabricData) {
		return state.set('fabricData', Nuclear.toImmutable(fabricData));
	},
  saveActiveObject(state, value) {
		return state.set('activeObject',value);
	}
});

reactor.registerStores({
  'fabricStore': fabricStore,
});

var Fabric = createReactClass({
	componentDidMount() {
  	var el = ReactDOM.findDOMNode(this);
    canvas_DOM = el
    
    // Here we have the canvas so we can initialize fabric
    fabricCanvas.initialize(el, {
    	height: window.innerHeight*.95,
      width: ((window.innerHeight * .9)/9)*16,
      backgroundColor : null,
    });
    
    // on mouse up lets save some state
    fabricCanvas.on('mouse:up', () => {
      reactor.dispatch(keys.fabricData, fabricCanvas.toObject());
      reactor.dispatch(keys.activeObject, !!fabricCanvas.getActiveObject());
    });
    
    // an event we will fire when we want to save state
    fabricCanvas.on('saveData', () => {
    	reactor.dispatch(keys.fabricData, fabricCanvas.toObject());
      reactor.dispatch(keys.activeObject, !!fabricCanvas.getActiveObject());
      fabricCanvas.renderAll(); // programatic changes we make will not trigger a render in fabric
    });
  }, 
  render() {
    return <canvas></canvas>
  }
});

var player_add;


var NewObjects = createReactClass({
	mixins: [reactor.ReactMixin],
  getDataBindings() {
  	return {
    	fabricData: ['fabricStore', 'fabricData'],
    	activeObject: ['fabricStore', 'activeObject'],
    };
  },
  render: function() {
  	if (this.state.fabricData.get('objects').size == 0) {
    	// no object is on the canvas so show interface to add one
      //<input type="file" id="video_submit" value="none"/> //onClick={this.addKanalImg}/>
      return (
      <div style={{float: "right"}}>
        <button onClick={this.addSquare} style={{position:"relative"}}>Add Square</button>
        <button onClick={this.remove} style={{position:"relative"}}>Remove</button>
      </div>
      );
    } else {
    	// an object is selected so lets interact with it
    	return (
        <div style={{float: "right"}}>
          <button onClick={this.addSquare} style={{position:"relative"}}>Add Square</button>
          <button onClick={this.remove} style={{position:"relative"}}>Remove</button>
        </div>
      );
    }//else {
    	// if there is an object but it is not selected then remove the buttons
    	//return null;
    //}
  },
  addSquare() {
    var color = "#" + ((1<<24)*Math.random() | 0).toString(16)
    var bounding_box = new fabric.Rect({
      hasRotatingPoint: false,
      uniScaleTransform: true,
    	height: 50,
    	width: 50,
      originX: 'center',
      originY: 'center',
      fill: color,
      borderColor: '#000',
      opacity: '.4',
      top: fabricCanvas.height / 2,
      left: fabricCanvas.width / 2,
    }, function(drop){
        console.log(drop)
    })
  	fabricCanvas.add(bounding_box);
    fabricCanvas.setActiveObject(bounding_box);
    fabricCanvas.fire('saveData');
  },
  remove() {
    fabricCanvas.remove(fabricCanvas.getActiveObject());
    fabricCanvas.fire('saveData');
  }
});

var ActiveObject = createReactClass({
	mixins: [reactor.ReactMixin],
  getDataBindings() {
  	return {
    	fabricObject: ['fabricStore', 'fabricData', 'objects', 0],
      activeObject: ['fabricStore', 'activeObject']
    };
  },
  render: function() {
    //return null;
    console.log(this.state.activeObject)
  	if (this.state.fabricObject) {
    	// if an object exists in state we can acess the data from any where in the app
    	var fill = this.state.fabricObject.get('fill');
      console.log((fabricCanvas.getActiveObject()))
      return (<div>
        <div><b>Active Object</b></div>
        <div>fill: <span style={{ color: fill}}>{this.state.fabricObject.get('fill')}</span></div>
        <div>top: {this.state.fabricObject.get('top')}</div>
        <div>left: {this.state.fabricObject.get('left')}</div>
        <div>angle: {this.state.fabricObject.get('angle')}</div>
        <div>scaleX: {this.state.fabricObject.get('scaleX')}</div>
        <div>scaleY: {this.state.fabricObject.get('scaleY')}</div>
      </div>);
    } else {
      console.log(fabricCanvas.getActiveObject())
    	return null;
    }
  },
});

var frame_data = [];
var upload = false;

//Current frame counter
function App() {
  const [videoFilePath, setVideoFileURL] = useState(null);
  const handleVideoUpload = (event) => {
    setVideoFileURL(URL.createObjectURL(event.target.files[0]));
    upload = true;
  };


  const [videoFilePath1, setVideoFileURL1] = useState(null);
  const handleVideoUpload1 = (event) => {
    setVideoFileURL1(URL.createObjectURL(event.target.files[0]));
  };
  

  const [playing, setPlaying] = useState(false);
  const handlePlaying = (event) => {
    setPlaying(!playing)
  }

  const [seeking, setSeeking] = useState(false)
  const [sliderPercent, setSliderPercent] = useState(0)

  const handleSeekChange = e => {
    setSliderPercent(parseFloat(e.target.value))
  }

  const handleSeekMouseDown = e => {
    setSeeking(true)
  }

  const handleSeekMouseUp = e => {
    setSeeking(false)
    player.seekTo(parseFloat(e.target.value))
  }

  const [player, setPlayer] = useState(null)
  const handleSetPlayer = val => {
    setPlayer(val)
    var total_frames = duration * frame_rate
    if(upload == true && player != null){      
      console.log("RESET VALUES")
      frame_data = new Array(7200)
      upload = false;
    }
  }

  const [duration, setDuration] = useState(0);
  const handleSetDuration = val => {
    setDuration(parseInt(val))
    console.log(val)
  }

  const [currentFrame, setCurrentFrame] = useState(0)
  const handleSetCurrentFrame = val => {
    console.log(val)
    var total_frames = duration * frame_rate
    setCurrentFrame(Math.round(val['played']*total_frames))
  }

  const skip_frame_forward = e =>{
    var total_frames = duration * frame_rate
    frame_data[currentFrame] = fabricCanvas.toJSON()
    console.log(currentFrame)
    console.log(frame_data)
    player.seekTo((((player.getCurrentTime()/duration)*total_frames)+1)/(total_frames))
  }

  const skip_frame_backward = e => {
    var total_frames = duration * frame_rate
    player.seekTo((((player.getCurrentTime()/duration)*total_frames)-1)/(total_frames))
  }

  const downloadFile = async () => {
    const fileName = "generated_annotations";
    //const json = JSON.stringify(fabricCanvas.getObjects());
    const json = JSON.stringify(frame_data);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="App">
      <div style={{ float: 'right' , position:'relative'}}>
        <button onClick={skip_frame_backward}>Prev Frame</button>
        <button onClick={handlePlaying}>Pause</button>
        <button onClick={skip_frame_forward}>Next Frame</button>
        <button onClick={downloadFile}>GENERATE JSON</button>
        Frame # {parseInt(currentFrame)}
    		<NewObjects />
      </div>
      <input type="file" onChange={handleVideoUpload} />
      <ReactPlayer 
        onProgress={handleSetCurrentFrame} 
        ref={handleSetPlayer} 
        onDuration={handleSetDuration} 
        url={videoFilePath} 
        width="90%" height="90%" 
        playing={playing} 
        controls={false} 
        style={{position:'realtive', float:'left'}}
        volume={0}
        muted={true}
        pip={false}
        
      />
      <Fabric/>
      <input
        width="100%"
        type='range' min={0} max={0.999999} step='any'
        value={sliderPercent}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
    </div>
  );
}
      //<ActiveObject />
      //<input type="file" onChange={handleVideoUpload1} />
      //<div>
        //<ReactPlayer url={videoFilePath1} width="50%" height="50%" controls={true} style={{position:'relative', float:'left'}}/>
        //<Fabric/>
      //</div>

export default App;