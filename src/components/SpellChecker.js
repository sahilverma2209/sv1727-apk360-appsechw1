import React, { Component } from 'react';
import axios from 'axios';
import '../css/style.css';

class MySpellChecker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedService: '',
      spellcheckText: '',
      searches: []
    }

  }

  componentDidMount(){
    this.fetchRecent()
  }

  async fetchRecent(){
    var token = localStorage.getItem('authToken')
    var email = localStorage.getItem('user') 
    const request = await axios.get(`https://cors-anywhere.herokuapp.com/https://sv1727-apk360-spellcheck.herokuapp.com/userSpells/${email}`, { headers: {'authorization': token}})
    var data = request.data
    var arr = []
    console.log(data)
    if(data.userSpells)data.userSpells.spells.forEach(item => arr.push(<li>{item}</li>))

    this.setState({ searches: arr })
  }

  async spellCheck(){
    var token = localStorage.getItem('authToken')
    var email = localStorage.getItem('user') 
    var preview = document.getElementById('orignial-file-contents');
    var changes = document.getElementById('possible-changes');
    preview.innerHTML = this.state.spellcheckText.replace(/<[^>]+>/g, '') 
    const request = await axios.post('https://cors-anywhere.herokuapp.com/https://sv1727-apk360-spellcheck.herokuapp.com/spellcheck', { 
      "data": this.state.spellcheckText,
      "email": email
    }, { headers: {'authorization': token}});
    var data = request.data
    console.log(data)
    if(data.length > 0){
      var output = ''
      for(var i=0; i<data.length; i++){
          var item = data[i]
  
          output += item.word+"  -->  "+item.fix.join('/')+'</br>'
      }
      changes.innerHTML = output
    } else {
      changes.innerHTML = 'no errors found'
    }
    
  }

  readFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
         var preview = document.getElementById('orignial-file-contents');
         var changes = document.getElementById('possible-changes');
         var file = document.querySelector('input[type=file]').files[0];
         var reader = new FileReader()

         var email = localStorage.getItem('user') 
         var textFile = /text.*/;
        
         if (file.type.match(textFile)) {
            reader.onload = async event => {
                preview.innerHTML = event.target.result;
                const request = await axios.post(
                'https://cors-anywhere.herokuapp.com/https://sv1727-apk360-spellcheck.herokuapp.com/spellcheck', { 
                    "data": event.target.result,
                    "email": email
                });
                var data = request.data
                console.log(data)
                if(data.length > 0){
                  var output = ''
                  for(var i=0; i<data.length; i++){
                      var item = data[i]
              
                      output += item.word+"  -->  "+item.fix.join('/')+'</br>'
                  }
                  changes.innerHTML = output
                } else {
                  changes.innerHTML = 'no errors found'
                }
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
    var text = this.state.spellcheckText.replace(/<[^>]+>/g, '') 
    console.log(text)
    return (
      <div className="spell-container">
        <div className="row1">
          <div className="spell-inputs">
            <input type="file" id="spell-input" onChange={this.readFile}/>

            <div className="or"> OR </div>

            <div className="textarea-spell-cont">
              <textarea  className="textarea-spell" placeholder="Enter Text to Spell-check" value={this.state.spellcheckText} onChange={e => this.setState({ spellcheckText: e.target.value})} />
              <button onClick={() => this.spellCheck()} className="spellcheck-btn">Spell Check</button>
            </div>
          </div>
          
          <div className="data-error">
              <div className="file-content">Original file contents:&nbsp;&nbsp;
                <div id="orignial-file-contents" dangerouslySetInnerHTML={{ __html: text}}></div>
              </div>
              <div className="file-content-with-errors">Possible corrections:&nbsp;&nbsp;<div id="possible-changes"></div></div>
          </div>
        </div>

        <div className="row2">
          <div className="recent-searches">
            <div>SpellCheck History: <span onClick={() => this.fetchRecent()} className="refresh">Refresh</span></div>
            <ol>
              {this.state.searches}
            </ol>
          </div>
        </div>
        
      </div>
    );
  }
}


export default MySpellChecker
