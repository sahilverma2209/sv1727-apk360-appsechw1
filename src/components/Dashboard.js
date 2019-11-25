import React from 'react'
import MyCropper from './ImageCropper';
import MySpellChecker from './SpellChecker';
import '../css/dashboard.css'

class Dashboard extends React.Component {
    constructor(){
        super()

        this.state = {
            loggedIn: false,
            selectedService: 'spell' 
        }
    }

    componentDidMount(){
        var loggedIn = localStorage.getItem('loggedIn')
        if(loggedIn !== 'true') window.location.replace('/')
    }

    logout(){
        localStorage.removeItem('authToken')
        window.location.replace('/')
    }

    render(){
        
        return(
            <div className="dashboard-container">
                
                <div className="select-service">
                    <div className="left">
                        <div className="pls-select"> Please select a service : </div>
                        <div className={`service-item ${this.state.selectedService === 'crop' ? 'active' : ''}`} onClick={()=>this.setState({selectedService: 'crop'})}>Crop Image</div>
                        <div className={`service-item ${this.state.selectedService === 'spell' ? 'active' : ''}`} onClick={()=>this.setState({selectedService: 'spell'})}>Spell Check</div>
                    </div>
                    <div className="right" onClick={this.logout}>Logout</div>
                </div>
                

                

                <div className="service-container">
               { this.state.selectedService === 'crop' ?
                    <MyCropper /> :
                    <MySpellChecker /> 
                }
                </div>
            </div>
        )
    }
}

export default Dashboard;