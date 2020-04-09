import React from 'react';
import './login.css'

class Login extends React.Component {
    render() {
        return (
			<div className="loginContainer">
				<div id='IPParty'>
					Welcom to IPParty
				</div>
	            <div className="login">
	                <form onSubmit={this.props.login}>
						<div className='line'>
							Login :
	                    	<input type="text" name="username" className='input'></input>
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
		                <button onClick={this.props.login} id='register'>Create Account</button>
					</div>
	            </div>
			</div>
        );
    }
}

export default Login;
