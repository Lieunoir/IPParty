import React from 'react';
import {CompactEvent} from './event.js';
import './container.css';

class EventBar extends React.Component {
    render() {
        return (
            <div className="menu-bar">
                <div className="menu-bar-text">
                    Event List
                </div>
            </div>
        );
    }
}

class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            events: [],
            showPopup: false,
        };
        this.updateList = this.updateList.bind(this);
    }

    updateList() {
        fetch("/partyline/events")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        events: result
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

    componentDidMount() {
        fetch("/partyline/events")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        events: result
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
        const { error, isLoaded, events} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="content-container">
                    <EventBar />
                    <div className="content">
                        <div>Loading...</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="content-container">
                    <EventBar />
                    <div className="content">
                        <div className="content-deck">
                            {events.map(event => (
                                <CompactEvent
                                    title={event.title}
                                    author={event.author.id}
                                    description={event.description}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    place={event.place}
                                    uuid={event.uuid}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default EventList;
