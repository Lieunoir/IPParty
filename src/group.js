import React from 'react';
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
            name: "",
        };
        this.updateList = this.updateList.bind(this);
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
                </div>
            );
        }
    }

}

export default EventList;
