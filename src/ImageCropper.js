import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import './style.css';

import Cropper from 'react-cropper';

class MyCropper extends Component {

    constructor(props) {
      super(props);
      this.state = {
        src: require('./default.jpg'),
        cropResult: null,
      };
  
      this.cropImage = this.cropImage.bind(this);
      this.onChange = this.onChange.bind(this);
    }
  
    onChange(e) {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ src: reader.result });
      };
      reader.readAsDataURL(files[0]);
    }
  
    cropImage() {
      if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
        return;
      }
      this.setState({
        cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      });
    }
  
    render() {
      return (
        <div className="container">
  
          <div className="cropper-area">
            <input className="choose-img" type="file" onChange={this.onChange} />
            <button className="default-img" onClick={() => this.setState({ src: require('./default.jpg') })}>Use default img</button>
            <button className="crop-img" onClick={this.cropImage}> Crop Image </button>
              <Cropper
                style={{ height: 400, width: '100%' }}
                aspectRatio={1}
                preview=".img-preview"
                guides={false}
                src={this.state.src}
                ref={cropper => { this.cropper = cropper; }}
              />
          </div>
  
          <div className="view-cropper-img">
            {this.state.cropResult &&
              <img src={this.state.cropResult} alt="cropped" className="cropped-img" />
            }
          </div>
        </div>
      );
    }
  }
  
  
  export default MyCropper;