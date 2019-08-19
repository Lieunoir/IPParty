import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
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
                    <li>Create Event</li>
                    <Link to="/created"><li>Created events</li></Link>
                    <Link to="/attending"><li>Attending events</li></Link>
                    <Link to="/news"><li>News</li></Link>
                    <div className="menu-section">
                        <hr />
                        <div className="menu-section-title">
                            GROUPS
                        </div>
                        <hr />
                    </div>
                    <div className="groups-container">
                        <GroupCard avatar="https://tutos.apps.rezel.net/logo.png" title="Rezel"/>
                        <GroupCard avatar="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/1011811_479976972078095_1850823628_n.png?_nc_cat=105&_nc_oc=AQkroNN4RPmAoUa2Hw2NovQSwBs8ZVS5a3uStzqNQUXGTOV-CYHGdvlCYnfKTQPb_JyM5cpntJz7wYAIytml1T3K&_nc_ht=scontent-sjc3-1.xx&oh=b081523169e8977c664e8ceb43e0b0de&oe=5E0E8186" title="C'est comme la Ludo sauf que c'est très long"/>
                    </div>
                </ul>
            </div>
        );
    }
}

class MenuLinkWithoutRouter extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push('/group/'+this.props.title);
    }
}

const MenuLink = withRouter(MenuLinkWithoutRouter);

class GroupCardWithoutRouter extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push('/group/'+this.props.title);
    }

    render() {
        return (
            <Route
                path={"/group/"+this.props.title}
                exact={true}
                children={({ match }) => (
                <div className={match ? "group-card-selected" :"group-card"} onClick={this.handleClick}>
                    <div className="group-card-avatar">
                        <img src={this.props.avatar} alt="" width="24" height="24"/>
                    </div>
                    <div className="group-card-title">
                        <div className="group-card-title-text">
                            {this.props.title}
                        </div>
                    </div>
                </div>
                )}
            />
        );
    }
}

const GroupCard = withRouter(GroupCardWithoutRouter);

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
