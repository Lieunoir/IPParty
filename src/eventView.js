import React from 'react';
import {EditEventPopup, DeleteEventPopup} from './popup.js';
import {EventWithPost} from './event.js';
import {CommentList} from './posts.js';
import Button from './button.js';
import './container.css';

class EventViewBar extends React.Component {
    render() {
        return (
            <div className="menu-bar">
                <Button onClick={this.props.onClick} text="Edit Event" message="edit" />
                <Button onClick={this.props.onClick} text="Delete Event" message="delete" />
                {this.props.eventTitle==="" ? "Menu text here" : "Hovered : " + this.props.eventTitle}
            </div>
        );
    }
}

class EventView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            event: null,
            hoveredEvent: "",
            showCreateEventPopup: false,
            showEditEventPopup: false,
        };
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup(event) {
        if(event === "edit") {
            this.setState({
                showEditEventPopup: !this.state.showEditEventPopup
            });
        }
        if(event === "delete") {
            this.setState({
                showDeleteEventPopup: !this.state.showDeleteEventPopup
            });
        }
    }

    hoverEvent() {
    }

    componentDidMount() {
        fetch("/partyline/events/" + this.props.match.params.uuid)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        event: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    render() {
        const { error, isLoaded, event } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="content-container">
                    <EventViewBar eventTitle="Test" />
                    <div className="content">
                        <div>Loading...</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="content-container">
                    <EventViewBar onClick={this.togglePopup}  eventTitle="Test" />
                    <div className="content">
                        <div className="content-deck">
                            <EventWithPost
                                title={event.title}
                                author={event.author.id}
                                description={event.description}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                place={event.place}
                                uuid={event.uuid}
                                hoverEvent={this.hoverEvent}
                                redirect={false}
                            />
                            <CommentList list={event.children} />
                        </div>
                    </div>
                    {this.state.showEditEventPopup &&
                    <EditEventPopup
                        text='Edit Event :'
                        title={event.title}
                        description={event.description}
                        startTime={event.startTime}
                        endTime={event.endTime}
                        place={event.place}
                        uuid={event.uuid}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    }
                    {this.state.showDeleteEventPopup &&
                    <DeleteEventPopup
                        text='Delete Event :'
                        uuid={event.uuid}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    }
                </div>
            );
        }
    }

}

export default EventView;
