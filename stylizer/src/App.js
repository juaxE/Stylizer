import React from "react";

import axios, { put } from "axios";

import { Button, Grid, Container, Step, Form, Checkbox, Transition, Image } from 'semantic-ui-react'

import image1 from './assets/image1.jpg'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'
import image4 from './assets/image4.jpg'

import Swal from 'sweetalert2'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          key: 'picture',
          icon: 'camera',
          title: 'Picture',
          description: 'Take a picture',
        },
        {
          key: 'Select outfit',
          icon: 'female',
          title: 'Outfit',
          description: 'Select outfit',
          disabled: true,
        },
        /*         {
                  key: 'confirm',
                  icon: 'info',
                  title: 'Confirm report',
                  disabled: true,
                }, */
      ],
      activeIndex: 0,
      formLoading: false,
      lat: null,
      lng: null,
      data: null,
      images: {
        1: image1,
        2: image2,
        3: image3,
        4: image4,
      }
    };
  }

  fileInputRef = React.createRef();

  onFormSubmit = e => {
    e.preventDefault();
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  };

  fileChange = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("source", e.target.files[0]);
    this.setState({
      data: formData
    });
    this.changeActiveIndex(this.state.activeIndex + 1);
  };


  fileChange2 = e => {
    e.preventDefault();

    let fd = this.state.data
    fd.append("target", e.target.files[0]);
    this.sendReport(fd)
  };


  selectImage = (e) => {

    console.log(e)

    let url = 'https://storage.googleapis.com/selko_public_resources/image' + e + '.jpg'
    let fd = this.state.data
    axios.get(url).then(response => {
      let image = response.data;
      fd.append("target", new File([new Blob([image], { type: 'image/jpg' })], "target.jpg"))
    })
    this.sendReport(fd)
  }

  base64EncodeUnicode = (str) =>  {
    // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters, 
    // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
    let utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
    });

    return btoa(utf8Bytes);
}

  sendReport = (data) => {
    console.log("Sending report...")
    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    this.setState({
      formLoading: true,
    })

    const config = {
      headers: {
        "Content-type": "multipart/form-data"
      }
    }

    axios.post('http://35.204.221.49/v1/stylize', data, config).then(response => {
      console.log(response.data)
      Swal.fire({
        icon: 'success',
        title: 'Your new style!',
        imageAlt: 'The uploaded picture'
      });
      this.changeActiveIndex(0);
    });
  }

  cameraForm = () => {
    return (
      <div>
        <Button
          size="large"
          content="Take a picture"
          labelPosition="left"
          icon="file image"
          onClick={() => this.fileInputRef.current.click()}
        />
        <input
          ref={this.fileInputRef}
          type="file"
          hidden
          onChange={this.fileChange}
        />
      </div>
    )
  }


  reportForm = () => {
    let loading = this.state.formLoading;

    /* return (
      <div>
        <Grid columns={2} columns='equal' style={{ height: '100%' }} centered padded="horizontally">
          <Grid.Row centered={true}>
            <Grid.Column verticalAlign='middle' textAlign="center" >
              <Image src={image1} centered onClick={() => this.selectImage(1)} />
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign="center">
              <Image src={image2} centered onClick={() => this.selectImage(2)} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered={true}>
            <Grid.Column verticalAlign='middle' textAlign="center">
              <Image src={image3} centered onClick={() => this.selectImage(3)} />
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign="center">
              <Image src={image4} centered onClick={() => this.selectImage(4)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    ) */

    return (
      <div>
        <Button
          size="large"
          content="Take a picture"
          labelPosition="left"
          icon="file image"
          onClick={() => this.fileInputRef.current.click()}
        />
        <input
          ref={this.fileInputRef}
          type="file"
          hidden
          onChange={this.fileChange2}
        />
      </div>
    )
  }

  changeActiveIndex = (index) => {

    if (this.state.activeIndex === index) {
      return;
    }

    let newSteps = this.state.steps;
    newSteps.forEach(function (step) {
      if (step.active) {
        delete step.active;
      }
    });
    newSteps.forEach(function (step) {
      if (!step.disabled) {
        Object.assign(step, { disabled: true });
      }
    });
    if (newSteps[index]) {
      newSteps[index].active = true
      newSteps[index].disabled = false

    };
    newSteps[this.state.activeIndex].completed = true;
    console.log(newSteps);
    this.setState({
      steps: newSteps,
      activeIndex: index,
    })
  }

  fetchActiveComponent = () => {
    this.changeActiveIndex(this.state.activeIndex);
    console.log(this.state.activeIndex);

    if (this.state.activeIndex === 0) {
      return this.cameraForm();
    } else if (this.state.activeIndex === 1) {
      return this.reportForm();
    } else if (this.state.activeIndex === 2) {
      return this.finishForm();
    }
  }

  render() {
    const { file } = this.state;

    return (
      <div>
        <Grid centered textAlign='center' columns={1} padded="vertically" style={{ height: '100vh' }}>
          <Grid.Row centered style={{ height: '90%' }} textAlign='center' verticalAlign="middle">
            <Grid.Column textAlign='center'>
              {this.fetchActiveComponent()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign="bottom" textAlign='center' style={{ height: '10%' }}>
            <Grid.Column>
              <Container fluid textAlign='center'>
                <Step.Group items={this.state.steps} />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
