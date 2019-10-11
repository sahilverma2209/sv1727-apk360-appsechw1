import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class MySpellChecker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedService: ''
    }

  }

  readFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
         var preview = document.getElementById('orignial-file-contents');
         var changes = document.getElementById('possible-changes');
         var file = document.querySelector('input[type=file]').files[0];
         var reader = new FileReader()

         var textFile = /text.*/;
        
         if (file.type.match(textFile)) {
            reader.onload = async event => {
                preview.innerHTML = event.target.result;
                const request = await axios.post(
                'https://cors-anywhere.herokuapp.com/https://sv1727-apk360-spellcheck.herokuapp.com/spellcheck', { 
                    "data": event.target.result
                });
                var data = request.data
                console.log(data)
                var output = ''
                for(var i=0; i<data.length; i++){
                    var item = data[i]

                    output += item.word+"  -->  "+item.fix.join('/')+'</br>'
                }
                changes.innerHTML = output
            }
         } else {
            preview.innerHTML = "<span class='error'>It doesn't seem to be a text file!</span>";
         }
         reader.readAsText(file);

   } else {
      alert("Your browser is too old to support HTML5 File API");
   }
  }

  render() {
    return (
      <div className="spell-container">
        <input type="file" id="spell-input" onChange={this.readFile}/>
        <div className="data-error">
            <div className="file-content">Original file contents:&nbsp;&nbsp;<div id="orignial-file-contents"></div></div>
            <div className="file-content-with-errors">&nbsp;&nbsp;<div id="possible-changes"></div></div>
        </div>
      </div>
    );
  }
}


export default MySpellChecker
