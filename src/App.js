import React, { useEffect, useState, useRef, Component } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import './App.css';

function App() {
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
const [videoWidth, setVideoWidth] = useState(1000);
const [videoHeight, setVideoHeight] = useState(400);
const videoConstraints = {
height: 700,
width: 700,
facingMode: "environment",
};
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
      const h3=document.querySelector('h3')

      ctx.fillText(
      predictions[n].class +": " + Math.round(parseFloat(predictions[n].score) * 100) +
      "%", bboxLeft,bboxTop);
      const pred_1=predictions[n].class
      const pred_2=predictions[n].class
      h2.innerText=pred_1
      h3.innerText=pred_2
      ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 3;
      ctx.stroke();console.log("detected");
      }
      }
      }
      //Rerun prediction by timeout
      setTimeout(() => {predictionFunction() 
      
      
      }, 1000);
      
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
 const fse=false
 

  return (
    <div className="App" >
      <header className="App-header">


      <button
variant={"contained"}
style={{
color: "white",
backgroundColor: "blueviolet",
width: "50%",
maxWidth: "250px",
}}
onClick={
predictionFunction}
>
Start Detect
</button>

<button 
// onClick={()=>{webCamStart()}} 
onClick={stopdetect}

>Stop Webcam</button>
<button 

onClick={start}

>Start</button>

 <div style={{ position: "absolute", top: "400px", zIndex: "9999" }}>
 <canvas
 id="myCanvas"
 width={videoWidth}
 height={videoHeight}
 style={{ backgroundColor: "transparent" }}
 />
 </div>
 <h2></h2>
 <h3></h3>
 <Webcam 
 onChange={stopdetect}
 className="Cam"
 audio={false}
 id="img"
 ref={webcamRef}
 screenshotQuality={1}
 screenshotFormat="image/jpeg"
 videoConstraints={videoConstraints}
 />


      </header>
    </div>
  );
}

export default App;
