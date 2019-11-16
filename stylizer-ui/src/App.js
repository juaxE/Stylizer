/*
filename: App.js 
*/

import React, { useCallback, useState } from "react";
import cuid from "cuid";
import ImageList from "./components/ImageList";
import MyUploader from "./components/MyUploader";

import "./App.css";

function App() {

  const [images, setImages] = useState([]);
  // onDrop function  
  const uploadModel = 'https://httpbin.org/post';
  const uploadMe = 'https://httpbin.org/post';


  // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
  return (
    <main className="App">
      <h1 className="text-center">Put some clothes on!</h1>
      
      <div className="App__uploaders">
        <MyUploader className="App__uploader" upload= {uploadModel} text="Upload what you want to try on" />
        <MyUploader className="App__uploader" upload={uploadMe} text="Upload a picture of yourself" />
      </div>
    </main>
  );
}

export default App;