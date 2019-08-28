import React from 'react';
import CreateEventPopup from './popup.js';
import './container.css';

class GroupBar extends React.Component {
    render() {
        return (
            <div className="menu-bar">
                <div className="menu-bar-text">
                    {this.props.name}
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
            isLoaded: true,
            showPopup: false,
            name: "",
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    togglePopup(event) {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    updateList() {
        this.setState({
            name: "Rezel",
        });
    }

    componentDidMount() {
        this.setState({
            name: "Rezel",
        });
    }

    render() {
        const { error, isLoaded, name } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="content-container">
                    <GroupBar name="..."/>
                    <div className="content">
                        <div>Loading...</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="content-container">
                    <GroupBar name={name}/>
                    <div className="content">
                        <div className="content-deck">
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

}

export default EventList;
