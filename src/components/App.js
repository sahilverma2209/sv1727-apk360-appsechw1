import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'cropperjs/dist/cropper.css';
import '../css/style.css';

import Dashboard from './Dashboard';
import Landing from './Landing';
class App extends Component {

  constructor(props) {
    super(props);

    
  }

  

  render() {
    return (
      <div className="main-container">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App
