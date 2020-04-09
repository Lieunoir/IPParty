import React from 'react';
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClick() {
        this.props.login(this.state.name);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    render() {
        return (
			<div className="loginContainer">
				<div id='IPParty'>
					Welcom to IPParty
				</div>
	            <div className="login">
	                <form onSubmit={this.onClick}>
						<div className='line'>
							Login :
	                    	<input type="text" name="username" className='input' value={this.state.name} onChange={this.handleChange}></input>
						</div>
						<div className='line'>
							Password :
	                    	<input type="password" name="password" className='input'></input>
						</div>
						<div id='submit'>
	                    	<input type="submit" value="Submit"></input>
						</div>
	                </form>
					<div className = 'create'>
						<div id="noaccount">
						Don't have an account yet?
						</div>
		                <button onClick={this.onClick} id='register'>Create Account</button>
					</div>
	            </div>
			</div>
        );
    }
}

export default Login;
