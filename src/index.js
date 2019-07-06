import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { PostWithComments } from './posts.js';
import EventList from './eventList.js';
import EventView from './eventView.js';
import './index.css';

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <UserCard username="Colin" />
                <h3>Partyline Events</h3>
                <ul>
                    <Link to="/"><li>Test 1</li></Link>
                    <Link to="/test"><li>Test 2</li></Link>
                    <Link to="/test2"><li>Test 3</li></Link>
                </ul>
            </div>
        );
    }
}

class UserCard extends React.Component {
    render() {
        return (
            <div className="user-card">
                {this.props.username}
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <Menu />
                    <Route path="/" exact component={EventList} />
                    <Route path="/event/:uuid" component={EventView} />
                    <Route path="/test" exact component={EventList} />
                    <Route path="/post/:uuid" exact component={PostWithComments} />
                </Router>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
