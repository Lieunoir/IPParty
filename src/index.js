import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, withRouter, useParams } from 'react-router-dom';
import { PostWithComments } from './posts.js';
import CreateEventPopup from './popup.js';
import EventList from './eventList.js';
import EventView from './eventView.js';
import GroupView from './group.js';
import Login from './login.js';
import TagsMenu from './tagsMenu.js';
import HomeView from './homeView.js';
import NewsView from './newsView.js';
import CreatedView from './createdView.js';
import './index.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup : false
        };
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup(event) {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <div className="menu-container">
                <div className="user-card-container">
                    <UserCard username="Colin" />
                </div>
                <div className="menu">
                    <MenuBigButton label="CREATE EVENT" handleClick={this.togglePopup}/>
                    <div className="menu-section">
                        <hr />
                        <div className="menu-section-title">
                            EVENTS
                        </div>
                        <hr />
                    </div>
                    <MenuLink label="Home" path="/"/>
                    <MenuLink label="My Events" path="/created"/>
                    <MenuLink label="News" path="/news"/>
                    <MenuLink label="Test" path="/list"/>
                    <div className="menu-section">
                        <hr />
                        <div className="menu-section-title">
                            FOLLOWED
                        </div>
                        <hr />
                    </div>
                    <div className="tags-container">
                        <TagsMenu tagList={[{"name": "Art"}, {"name": "Comete"}, {"name": "BDE Telecom"}, {"name": "IGR203"}]}/>
                    </div>
                </div>
                    {this.state.showPopup ?
                    <CreateEventPopup
                        text='Click "Close Button" to hide popup'
                        closePopup={this.togglePopup.bind(this)}
                        onUpdate={this.updateList}
                    />
                    : null
                    }
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
        this.props.history.push(this.props.path);
    }

    render() {
        return (
            <Route
                path={this.props.path}
                exact={true}
                children={({ match }) => (
                <div className={match ? "menu-link-selected" :"menu-link"} onClick={this.handleClick}>
                    <div className="menu-link-text">
                        {this.props.label}
                    </div>
                </div>
                )}
            />
        );
    }
}

const MenuLink = withRouter(MenuLinkWithoutRouter);

class MenuBigButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick();
    }

    render() {
        return (
            <div className="menu-button-big" onClick={this.handleClick}>
                <div className="menu-button-big-text">
                    {this.props.label}
                </div>
            </div>
        );
    }
}

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
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
        };
        this.login = this.login.bind(this);
    }

    login() {
        this.setState({
            logged: true,
        });
    }

    render() {
        const {logged} = this.state;
        return (
            <>
            {!logged && <Login login={this.login}/>}
            {logged && <div className="container">
                <Router>
                    <Menu />
                    <Route exact path="/">
                        <HomeView />
                    </Route>
                    <Route path="/event/:uuid">
                        <EventView />
                    </Route>
                    <Route path="/created" exact>
                        <CreatedView />
                    </Route>
                    <Route path="/news" exact>
                        <NewsView />
                    </Route>
                    <Route path="/list" exact>
                        <EventList />
                    </Route>
                    <Route path="/post/:uuid" exact>
                        <PostWithCommentsHack />
                    </Route>
                    <Route path="/group/:uuid" exact>
                        <GroupView />
                    </Route>
                </Router>
            </div>}
            </>
        );
    }
}

function PostWithCommentsHack() {
    let {uuid} = useParams();
    return(
        <PostWithComments uuid={uuid}/>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
