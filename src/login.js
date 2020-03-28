import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <form onSubmit={this.props.login}>
                    <input type="text" name="username"></input>
                    <input type="password" name="password"></input>
                    <input type="submit" value="Submit"></input>
                </form>
                <button onClick={this.props.login}>Ha</button>
            </div>
        );
    }
}

export default Login;
