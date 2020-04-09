import React from 'react';
import {EditEventPopup, DeleteEventPopup} from './popup.js';
import {Event} from './event.js';
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

class GroupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            event: null,
            hoveredEvent: "",
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
        fetch("/partyline/events/" + this.props.uuid)
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
                        event: {"author":{"nodeId":"ens-paris-saclay","type":"user","uuid":"da6f5b68-ec77-41fe-baeb-a2e96d9ae0aa"},"children":[],"description":"Venons célebrer l'amitiée Franco-Allemande avec les étudiant⋅e⋅s d'Outre-Rhin en résidence à CentraleSupélec !","endTime":"2019-04-13T19:58:16Z","nodeId":"centrale-supelec","place":"9 rue Joliot Curie, 91190 Gif-sur-Yvette","startTime":"2019-04-13T17:58:16Z","title":"Große Binouze Franco-Allemande","uuid":"fed1abcc-1a67-484d-8c13-5957993544dd"},
                        //error
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
                            <Event
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

export default GroupView;
