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
        fetch("/api/event", {
            credentials: 'include'})
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
                        //error
                    });
                }
            )
    }

    componentDidMount() {
        fetch("/api/event", {
            credentials: 'include'})
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
                        events: [{"author":{"nodeId":"polytechnique","type":"user","uuid":"61973bc4-a3e9-4dba-aad6-72ad2368e2b6"},"children":[],"description":"À vos sacs poubelles ! Prêt⋅e⋅s ! Partez !!","endTime":"2019-04-13T16:25:25Z","nodeId":"polytechnique","place":"828 Boulevard des Maréchaux, 91120 Palaiseau, France","startTime":"2019-04-13T14:25:25Z","title":"Soirée ramassage de déchets","uuid":"3d708a47-fb84-4c63-a391-26cc194ab086"},{"author":{"nodeId":"ens-paris-saclay","type":"user","uuid":"da6f5b68-ec77-41fe-baeb-a2e96d9ae0aa"},"children":[],"description":"Venons célebrer l'amitiée Franco-Allemande avec les étudiant⋅e⋅s d'Outre-Rhin en résidence à CentraleSupélec !","endTime":"2019-04-13T19:58:16Z","nodeId":"centrale-supelec","place":"9 rue Joliot Curie, 91190 Gif-sur-Yvette","startTime":"2019-04-13T17:58:16Z","title":"Große Binouze Franco-Allemande","uuid":"fed1abcc-1a67-484d-8c13-5957993544dd"},{"author":{"nodeId":"polytechnique","type":"user","uuid":"61973bc4-a3e9-4dba-aad6-72ad2368e2b6"},"children":[{"author":{"nodeId":"ens-paris-saclay","type":"user","uuid":"da6f5b68-ec77-41fe-baeb-a2e96d9ae0aa"},"children":[],"createdAt":"2020-02-10T14:41:23","description":"Il y aura des prises pour les bouilloires ?","nodeId":"polytechnique","parent":{"id":"b8358161-a737-48ff-8521-2b509159d41b","type":"event"},"title":null,"updateAt":"2020-02-10T14:41:23","uuid":"f1489cfd-b42e-43fd-a712-b78df8b31ada"},{"author":{"nodeId":"ensta","type":"user","uuid":"02f8cce9-2ab1-4033-b061-1901c4e18ac6"},"children":[],"createdAt":"2020-02-10T14:41:23","description":"Wéééé génial !!","nodeId":"polytechnique","parent":{"id":"b8358161-a737-48ff-8521-2b509159d41b","type":"event"},"title":null,"updateAt":"2020-02-10T14:41:23","uuid":"926677f3-b629-4849-8355-a29c6626bcd2"}],"description":"Le petit-déjeuner d'été 2020 est officiellement là !\nNotre rendez-vous inter-écoles se déroulera sur la pelouse du mat de l'X, à partir de\n8h30. Ramenez de quoi manger et boire, et n'oubliez pas votre bonne humeur !\n","endTime":"2020-06-30T10:00:00Z","nodeId":"polytechnique","place":"48.711374,2.210961","startTime":"2020-06-30T08:30:00Z","title":"Petit-déjeuner sur la pelouse sous le mat !","uuid":"b8358161-a737-48ff-8521-2b509159d41b"}]
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
