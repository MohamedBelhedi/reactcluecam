import React, { useEffect, useState, useRef, Component,useContext } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import '../App.css';


function Page() {
    const [stop,setStop]=useState(false)

    const stopTest=()=>{
  
  setStop(test=>test)
  
    }
    const [model, setModel] = useState();
    async function loadModel() {
      try {
      let model = await cocoSsd.load();
      setModel(model);
      console.log("set loaded Model");
      } catch (err) {
      console.log(err);
      console.log("failed load model");
      }
      }useEffect(() => {
      tf.ready().then(() => {
      loadModel();
      });
      }, [],[stop]);
      // webcam Ref
      const webcamRef = React.useRef(null);
  const [videoWidth, setVideoWidth] = useState(400);
  const [videoHeight, setVideoHeight] = useState(400);
  const videoConstraints = {
  height: 300,
  width: 300,
  facingMode: "environment",
//   change(){
//     const window1=videoConstraints
//     if(window.matchMedia('(min-width:600px)')){

//         window1.height=500
//         window1.width=500
//         console.log("Hi1")
//         }

//     else if(window.matchMedia('(max-width:500px)'))
//     {

//         window1.height=300
//         window1.width=300
        
//     }else{

// window1.height=300
// window1.width=300

//     }



//   }
 
  };
// const change=()=>{
//     const window1=videoConstraints
//     if(window.matchMedia('(min-width:600px)')){

//         window1.height=500
//         window1.width=500

//         }

//     else if(window.matchMedia('(max-width:500px)'))
//     {

//         window1.height=300
//         window1.width=300
        
//     }



//   }
  // const predictions = model.detect(document.getElementById("img"));
  // console.log(predictions);
      // detect function
     const predictionFunction=async(e)=> {//Clear the canvas for each prediction
      
        console.log("geht")
        var cnvs = document.getElementById("myCanvas");
        var ctx = cnvs.getContext("2d");
        ctx.clearRect(0,0, webcamRef.current.video.videoWidth,webcamRef.current.video.videoHeight);//Start prediction
        const predictions = await model.detect(document.getElementById("img"));
        if (predictions.length > 0) {
        console.log(predictions);
        for (let n = 0; n < predictions.length; n++) {
        console.log(n);
        if (predictions[n].score > 0.8) {
        //Threshold is 0.8 or 80%//Extracting the coordinate and the bounding box information
        let bboxLeft = predictions[n].bbox[0];
        let bboxTop = predictions[n].bbox[1];
        let bboxWidth = predictions[n].bbox[2];
        let bboxHeight = predictions[n].bbox[3] - bboxTop;
        console.log("bboxLeft: " + bboxLeft);
        console.log("bboxTop: " + bboxTop);
        console.log("bboxWidth: " + bboxWidth);
        console.log("bboxHeight: " + bboxHeight);//Drawing begin
        ctx.beginPath();
        ctx.font = "28px Arial";
        ctx.fillStyle = "red";
        const h2=document.querySelector('h2')
     
  
        ctx.fillText(
        predictions[n].class +": " + Math.round(parseFloat(predictions[n].score) * 100) +
        "%", bboxLeft,bboxTop);
        const pred_1=predictions[n].class
        // const pred_2=predictions[n].class
        h2.innerText=pred_1
        // h3.innerText=pred_2
   
      ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.stroke();
        console.log("detected");
  
  
        }
        }
        }
        //Rerun prediction by timeout
        setTimeout(() => {predictionFunction() 
        h2.innerText=""
        
        }, 1000);
        // sobald er keine Objekte Erkennt schreibt er sowas
        const h2=document.querySelector("h2")
        if(predictions.length===0)
        {
  
          h2.innerText="Nicht erkannt"
       
  
        }
        h2.innerTex=""
        
      }
   
  
  
     const stopdetect=()=>{
  
  const cam=document.querySelector(".Cam")
  const h2=document.querySelector('h2')
      console.log("Stop")
        cam.style.display="none"
         webcamRef.current.video=(null)
        var cnvs = document.getElementById("myCanvas");
  
        cnvs.style.display="none"
        h2.innerText=""
        
  
   }
   const start=()=>{
  
    const cam=document.querySelector(".Cam")
     cam.style.display="block"
     webcamRef.current.video=true
  
  
  
    
   
  
  
   }
  
   
  
    return (
    
        <header className="App-header">
  
  
        <button
  variant={"contained"}
  // style={{
  // color: "white",
  // backgroundColor: "blueviolet",
  // width: "50%",
  // maxWidth: "250px",
  // }}
  onClick={
  predictionFunction}
  >
  Start Detect
  </button>
  
  <div>
  Start Cam
  </div>
  
  <i onClick={start}>
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
  </svg>
  </i>
  <div>
  Stop Cam
  </div>
  <i onClick={stopdetect}>
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="red" class="bi bi-camera-video" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
  </svg>  
  </i>
  
  
  
   <div style={{ position: "absolute", top: "400px", zIndex: "9999" }}>
   <canvas
   id="myCanvas"
   width={videoWidth}
   height={videoHeight}
   style={{ backgroundColor: "transparent" }}
   />
   </div>
   <h2></h2>
   
   <Webcam 
//    onChange={videoConstraints.change}
   className="Cam"
   audio={false}
   id="img"
   ref={webcamRef}
   screenshotQuality={1}
   screenshotFormat="image/jpeg"
//    videoConstraints={videoConstraints.change()}
   videoConstraints={videoConstraints}
   />
  
  
        </header>
        
      
    );
}

export default Page