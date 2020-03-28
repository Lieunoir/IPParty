import React from 'react';
import { withRouter } from 'react-router';
import AuthorCard from './userCards.js';
import './event.css';

class CompactEventWithoutRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            uuid: props.uuid,
            startDate: Intl.DateTimeFormat("default", {
                weekday: "short",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(Date.parse(props.startTime))),
            endDate: Intl.DateTimeFormat("default", {
                weekday: "short",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(Date.parse(props.endTime))),
            startTime: Intl.DateTimeFormat("default", {
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(Date.parse(props.startTime))),
            endTime: Intl.DateTimeFormat("default", {
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(Date.parse(props.endTime))),
        };
        this.toggleHover = this.toggleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggleHover() {
        this.setState({
            hovered: !this.state.hovered,
        })
    }


    handleClick() {
        this.props.history.push('/event/'+this.state.uuid);
    }

    handleClick2(e) {
        e.stopPropagation();
        alert(1);
    }

    render() {
        const buttonStyle = this.state.hovered ? {} : {visibility: "hidden"};
        return (
            <div className={this.state.hovered ? "compact-event-hovered" : "compact-event"} onClick={this.handleClick} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <div className="compact-event-infos">
                    <div className="compact-event-infos-1">
                        <span className="compact-event-title">
                            {this.props.title}
                        </span>
                        <span className="compact-event-author">
                            <AuthorCard uuid={this.props.author}/>
                        </span>
                    </div>
                    <div className="compact-event-description">
                        {this.props.description}
                    </div>
                    <div className="compact-event-infos-2">
                        { this.state.startDate === this.state.endDate ?
                            (
                                <>
                                    <span className="compact-event-date">
                                        {this.state.startDate}
                                    </span>
                                    <span className="compact-event-time">
                                        {this.state.startTime}
                                    -
                                        {this.state.endTime}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="compact-event-date">
                                        {this.state.startDate}
                                    </span>
                                    <span className="compact-event-time">
                                        {this.state.startTime}
                                    </span>
                                    -
                                    <span className="compact-event-date">
                                        {this.state.endDate}
                                    </span>
                                    <span className="compact-event-time">
                                        {this.state.endTime}
                                    </span>
                                </>
                            )
                        }
                        <span className="compact-event-place">
                            {this.props.place}
                        </span>
                    </div>
                </div>
                <div className="compact-event-buttons">
                    <button onClick={this.handleClick2} style={buttonStyle}>Edit</button>
                    <button onClick={this.handleClick2} style={buttonStyle}>Delete</button>
                </div>
            </div>
        );
    }
}

class EventWithoutRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            hovered: false,
            uuid: props.uuid,
            startDate: Intl.DateTimeFormat("default", {
                weekday: "short",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(Date.parse(props.startTime))),
            endDate: Intl.DateTimeFormat("default", {
                weekday: "short",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(Date.parse(props.endTime))),
            startTime: Intl.DateTimeFormat("default", {
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(Date.parse(props.startTime))),
            endTime: Intl.DateTimeFormat("default", {
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(Date.parse(props.endTime))),
        };
        this.toggleHover = this.toggleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggleHover() {
        const title = this.props.title;
        this.setState({
            hovered: !this.state.hovered,
        })
        this.props.hoverEvent(title);
    }

    handleClick() {
        this.props.history.push('/event/'+this.state.uuid);
    }

    handleClick2(e) {
        e.stopPropagation();
        alert(1);
    }

    render() {
        const buttonStyle = this.state.hovered ? {} : {visibility: "hidden"};
        return (
            <div className={this.state.hovered ? "event-hovered" : "event"} onClick={this.handleClick} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <div className="event-bar">
                    <div className="event-infos">
                        { this.state.startDate === this.state.endDate ?
                            (
                               <>
                                    <span className="event-date">
                                        {this.state.startDate}
                                    </span>
                                    <span className="event-time">
                                        {this.state.startTime}
                                        -
                                        {this.state.endTime}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="event-date">
                                        {this.state.startDate}
                                    </span>
                                    <span className="event-time">
                                        {this.state.startTime}
                                    </span>
                                    -
                                    <span className="event-date">
                                        {this.state.endDate}
                                    </span>
                                    <span className="event-time">
                                        {this.state.endTime}
                                    </span>
                                </>
                            )
                        }
                        <div className="event-place">
                            {this.props.place}
                        </div>
                    </div>
                    <div className="event-title">
                        {this.props.title}
                    </div>
                    <div className="event-infos-right">
                        <div className="event-author">
                            <AuthorCard uuid={this.props.author}/>
                        </div>
                        <div className="event-buttons">
                            <button onClick={this.handleClick2} style={buttonStyle}>Edit</button>
                            <button onClick={this.handleClick2} style={buttonStyle}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="event-description">
                    {this.props.description}
                </div>
            </div>
        );
    }
}

class EventWithPostWithoutRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            hovered: false,
            startDate: Intl.DateTimeFormat("default", {
                weekday: "short",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(Date.parse(props.startTime))),
            endDate: Intl.DateTimeFormat("default", {
                weekday: "short",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(Date.parse(props.endTime))),
            startTime: Intl.DateTimeFormat("default", {
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(Date.parse(props.startTime))),
            endTime: Intl.DateTimeFormat("default", {
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(Date.parse(props.endTime))),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        fetch('/api/posts/new', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                place: this.state.place,
                createdAt: "2019-03-16T23:08:58.109Z",
                updatedAt: "2019-03-16T23:08:58.109Z",
                uuid: this.props.uuid,
                nodeId: "telecom-paristech",
                author: {
                    id: "27740b47-0507-40de-b215-5dfa6942f6d8",
                    type: "group",
                    nodeId: "telecom-paristech"
                },
                parent: {
                    id: this.props.uuid,
                    type: "event",
                },
                attachements: [
                    null
                ],
                children: [
                    null
                ]
            })
        });
        alert("Submitted");
        event.preventDefault();
    }

    toggleHover() {
        if(this.props.redirect) {
            const title = this.props.title;
            this.setState({
                hovered: !this.state.hovered,
            })
            this.props.hoverEvent(title);
        }
    }

    handleClick() {
        if(this.props.redirect) {
            this.props.history.push('/event/'+this.props.uuid);
        }
    }

    handleClick2(e) {
        e.stopPropagation();
        alert(1);
    }

    render() {
        const buttonStyle = (this.state.hovered || !this.props.redirect) ? {} : {visibility: "hidden"};
        return (
            <div className={this.state.hovered ? "event-hovered" : "event"} onClick={this.handleClick} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <div className="event-bar">
                    <div className="event-infos">
                        { this.state.startDate === this.state.endDate ?
                            (
                               <>
                                    <span className="event-date">
                                        {this.state.startDate}
                                    </span>
                                    <span className="event-time">
                                        {this.state.startTime}
                                        -
                                        {this.state.endTime}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="event-date">
                                        {this.state.startDate}
                                    </span>
                                    <span className="event-time">
                                        {this.state.startTime}
                                    </span>
                                    -
                                    <span className="event-date">
                                        {this.state.endDate}
                                    </span>
                                    <span className="event-time">
                                        {this.state.endTime}
                                    </span>
                                </>
                            )
                        }
                        <div className="event-place">
                            {this.props.place}
                        </div>
                    </div>
                    <div className="event-title">
                        {this.props.title}
                    </div>
                    <div className="event-infos-right">
                        <div className="event-author">
                            <AuthorCard uuid={this.props.author}/>
                        </div>
                        <div className="event-buttons">
                            <button onClick={this.handleClick2} style={buttonStyle}>Edit</button>
                            <button onClick={this.handleClick2} style={buttonStyle}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="event-description">
                    {this.props.description}
                </div>
                <div className='edit-post'>
                    <form onSubmit={this.handleSubmit}>
                        <input className="edit-post-title" type="text" name="title" placeholder="Titre" value={this.state.title} onChange={this.handleChange} />
                        <textarea className="edit-post-description" name="description" placeholder="Contenu" value={this.state.description} onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

EventWithPostWithoutRouter.defaultProps = {
    redirect: true,
}

const Event = withRouter(EventWithoutRouter);
const CompactEvent = withRouter(CompactEventWithoutRouter);
const EventWithPost = withRouter(EventWithPostWithoutRouter);

export default Event;
export { CompactEvent, EventWithPost };

