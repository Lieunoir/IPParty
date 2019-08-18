import React from 'react';
import './popup.css'

class CreateEventPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "Description.",
            title: "Title",
            place: "Place",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
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
        this.props.onUpdate();
        alert("Submitted");
        event.preventDefault();
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
                        <form onSubmit={this.handleSubmit}>
                            <div className="popup-event-title">
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                            </div>
                            <div className="popup-event-place">
                                <input type="text" name="place" value={this.state.place} onChange={this.handleChange} />
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
                                <textarea name="description" value={this.state.description} onChange={this.handleChange} />
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
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

    handleSubmit(event) {
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
        event.preventDefault();
    }

    handleClose() {
        this.props.closePopup("edit");
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
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                            <input type="text" name="place" value={this.state.place} onChange={this.handleChange} />
                            <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
                            <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
                            <input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
                            <input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
                            <label>
                                Description :
                                <textarea name="description" value={this.state.description} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
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

    handleClose() {
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
