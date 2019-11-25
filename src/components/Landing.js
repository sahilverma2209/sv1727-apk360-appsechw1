import React from 'react'
import axios from 'axios';

import '../css/landing.css'

class Landing extends React.Component {
    constructor(){
        super()
        this.state = {
            loginEmail: '',
            loginPass: '',
            loggingIn: false, 
            signupEmail: '',
            signupPass: '',
            signingUp: false
        }
    }

    componentDidMount(){
        // localStorage.clear()
        localStorage.setItem('loggedIn', 'false')
        localStorage.removeItem('user')
    }

    async handleLogin(){
        console.log('clicked')

        if(this.state.loginPass.length > 0 && this.state.loginEmail.length > 0){
            this.setState({loggingIn: true})

            const request = await axios.post('https://cors-anywhere.herokuapp.com/https://sv1727-apk360-spellcheck.herokuapp.com/login', { 
                "email": this.state.loginEmail,
                "password": this.state.loginPass
            });
            console.log(request)
            if(request.data.success){
                this.setState({loggingIn: false})
                localStorage.setItem('loggedIn', 'true')
                localStorage.setItem('authToken', request.data.token)
                localStorage.setItem('user', this.state.loginEmail)
                window.location.replace('/dashboard')
            } else {
                this.setState({loggingIn: false})
                alert(request.data.msg)
            }
        } else alert('Please enter Email & Password')

    }

    async handleSignUp(){
        console.log('clicked')

        if(this.state.signupPass.length > 0 && this.state.signupEmail.length > 0){
            this.setState({signingUp: true})
            const request = await axios.post('https://cors-anywhere.herokuapp.com/https://sv1727-apk360-spellcheck.herokuapp.com/signup', { 
                "email": this.state.signupEmail,
                "password": this.state.signupPass
            });
            
            console.log(request)
            if(request.data.success){
                this.setState({ signingUp: false})
                localStorage.setItem('loggedIn', 'true')
                localStorage.setItem('authToken', request.data.token)
                localStorage.setItem('user', this.state.signupEmail)
                window.location.replace('/dashboard')
            } else {
                this.setState({signingUp: false})
                alert(request.data.msg)
            }

        } else alert('Please enter Email & Password')
        
    }

    render(){
        return(
            <div className="landing">
                <div className="login-form">
                    <input placeholder="Email" className="form-input" type="email" value={this.state.loginEmail} onChange={e => this.setState({ loginEmail: e.target.value})} />
                    <input placeholder="Password" className="form-input" type="password" value={this.state.loginPass} onChange={e => this.setState({ loginPass: e.target.value})} />
                    <button className="btn" disabled={this.state.loggingIn ? 'disabled' : ''} onClick={() => this.handleLogin()}>Login</button>
                </div>

                <div className="signup-form">
                    <input placeholder="Email" className="form-input" type="email" value={this.state.signupEmail} onChange={e => this.setState({ signupEmail: e.target.value})} />
                    <input placeholder="Password" className="form-input" type="password" value={this.state.signupPass} onChange={e => this.setState({ signupPass: e.target.value})} />
                    <button className="btn" disabled={this.state.signingUp ? 'disabled' : ''} onClick={() => this.handleSignUp()}>Signup</button>
                </div>

            </div>
        )
    }
}

export default Landing