import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import './style.css';

import MyCropper from './ImageCropper';
import MySpellChecker from './SpellChecker';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedService: 'csdsdrop' 
    }
  }

  

  render() {
    return (
      <div className="main-container">
        <div className="select-service">
          <div className="pls-select"> Please select a service : </div>
          <div className="service-item" onClick={()=>this.setState({selectedService: 'crop'})}>Crop Image</div>
          <div className="service-item" onClick={()=>this.setState({selectedService: 'spell'})}>Spell Check</div>
        </div>

        { this.state.selectedService === 'crop' ?
          <MyCropper /> :
          <MySpellChecker /> 
        }
      </div>
    );
  }
}


export default App
