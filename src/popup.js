import React from 'react';
import './popup.css'

class EventPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            title: this.props.title,
            place: this.props.place,
            uuid: this.props.uuid,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.handleChange(event);
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <div className="popup-header">
                        <div className="popup-header-text">
                            {this.props.text}
                        </div>
                        <div className="popup-header-button">
                            <button onClick={this.props.closePopup}>Close</button>
                        </div>
                    </div>
                    <div className="popup-content">
                        <form onSubmit={this.props.handleSubmit}>
                            <div className="popup-event-title">
                                <input type="text" name="title" value={this.state.title} placeholder="Title" onChange={this.handleChange} />
                            </div>
                            <div className="popup-event-place">
                                <input type="text" name="place" value={this.state.place} placeholder="Place" onChange={this.handleChange} />
                            </div>
                            <div className="popup-event-start">
                                <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
                                <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
                            </div>
                            <div className="popup-event-end">
                                <input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
                                <input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
                            </div>
                            <div className="popup-event-description">
                                <textarea name="description" value={this.state.description} placeholder="Description" onChange={this.handleChange} />
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class CreateEventPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            title: "",
            place: "",
            uuid: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/partyline/events/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                place: this.state.place,
                startTime: "2019-03-16T23:08:58.109Z",
                endTime: "2019-03-17T01:08:58.109Z",
                nodeId: "telecom-paristech",
                author: {
                    id: "27740b47-0507-40de-b215-5dfa6942f6d8",
                    type: "group",
                    nodeId: "telecom-paristech"
                }
            })
        });
        alert("Submitted");
    }

    render() {
        return (
            <EventPopup text="Create new event" title="" description="" place="" uuid="" handleSubmit={this.handleSubmit} handleChange={this.handleChange} closePopup={this.props.closePopup} />
        );
    }
}

class EditEventPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            title: this.props.title,
            place: this.props.place,
            uuid: this.props.uuid,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClose(e) {
        e.stopPropagation();
        this.props.closePopup("edit");
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/partyline/events/edit', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                place: this.state.place,
                startTime: "2019-03-16T23:08:58.109Z",
                endTime: "2019-03-17T01:08:58.109Z",
                uuid: this.state.uuid,
                nodeId: "telecom-paristech",
                author: {
                    id: "27740b47-0507-40de-b215-5dfa6942f6d8",
                    type: "group",
                    nodeId: "telecom-paristech"
                }
            })
        });
        alert("Submitted");
    }

    render() {
        return (
            <EventPopup text="Edit event" title={this.props.title} description={this.props.description} place={this.props.place} uuid={this.props.uuid} handleSubmit={this.handleSubmit} handleChange={this.handleChange} closePopup={this.handleClose} />
        );
    }
}

class DeleteEventPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: this.props.uuid,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        fetch('/partyline/events/'+this.state.uuid, {
            method: 'DELETE',
        })
        alert("Submitted");
        event.preventDefault();
    }

    handleClose(e) {
        e.stopPropagation();
        this.props.closePopup("delete");
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <div className="popup-header">
                        <div className="popup-header-text">
                            {this.props.text}
                        </div>
                        <div className="popup-header-button">
                            <button onClick={this.handleClose}>Close</button>
                        </div>
                    </div>
                    <div className="popup-content">
                        <button onClick={this.handleClose}>Cancel</button>
                        <form onSubmit={this.handleSubmit}>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateEventPopup;
export {EditEventPopup, DeleteEventPopup };
