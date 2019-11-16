import React, { useCallback, useState } from "react";
import MyUploader from "./components/MyUploader";

import "./App.css";

function App() {

  const [images, setImages] = useState([]);
 
  const uploadModel = 'https://httpbin.org/post';
  const uploadMe = 'https://httpbin.org/post';


 
  return (
    <main className="App">
      <h1 className="text-center">Put some clothes on!</h1>
      
      <div className="App__uploaders">
        <MyUploader className="App__uploader" upload= {uploadModel} text="Upload what you want to try on" />
        <MyUploader className="App__uploader" upload={uploadMe} text="Upload a picture of yourself" />
      </div>
      <div>
        <img className="App__result">

        </img>

      </div>
    </main>
  );
}

export default App;