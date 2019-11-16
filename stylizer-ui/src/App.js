import React, { useCallback, useState } from "react";
import MyUploader from "./components/MyUploader";
import torille from "./media/torille.jpg";
import "./App.css";
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null,
      generatedFile: null,
    }

  }

  onChangeHandler = event => {
    this.setState({
      selectedFiles: event.target.files,
      loaded: 0,
    })
  }

  onClickHandler = async () => {
    const data = new FormData()

    for (var d of data) {
      data.append('image', d)
    }

    let res = await axios.post('https://httpbin.org/post', data, { headers: { "Content-type": "multipart/form-data" } })

    console.log(res)
    this.setState({
        generatedFile: res,
    })
  }

  render() {
    const {generatedFile} = this.state;
    return (
      <main className="App">
        <h1 className="text-center">Put some clothes on!</h1>

        <div className="App__uploaders">
          <label>Upload your Files</label>
          <input type="file" name="file" multiple onChange={this.onChangeHandler} />
          <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

        </div>
        <div>
          
          <img src={generatedFile ? generatedFile : torille} className="App__result" />

        </div>
      </main>
    );
  }
}

export default App;