import React from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { withRouter } from 'react-router';
import './main.scss'
import './homeView.css'

class FilterBar extends React.Component{
	render() {
		return (
			<div class="filter-bar">
				<InteressedRow/>
				<SchoolRow/>
				<EventTypeRow/>
				<OtherRow/>
			</div>
		);
	}
}

class FilterBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			check: props.check
		}
	}
	render() {
		return (
            <>
              <span className="filter-bar-checkbox">
                <input type="checkBox" value={this.state.name} checked={this.state.check} />
                {this.state.name}
              </span>
              <br/>
            </>
		)
	}
}
class InteressedRow extends React.Component{
	render() {
		return(
			<form class='filter-button-row'>
			  <FilterBox name = 'All' check = 'true'/>
			  <FilterBox name = 'Interessed' />
			  <FilterBox name = 'Participate' />
			  <FilterBox name = 'Maybe'/>
			</form>
		)
	}
}
class SchoolRow extends React.Component{
	render() {
		return(
			<form class='filter-button-row'>
			  <FilterBox name = 'All' check = 'true'/>
			  <FilterBox name = 'Télécom'/>
			  <FilterBox name = 'X'/>
			  <FilterBox name = 'ENSTA'/>
			  <FilterBox name = 'ENSAE'/>
			  <FilterBox name = "Sup'Optique"/>
			</form>
		)
	}
}
class EventTypeRow extends React.Component{
	render() {
		return(
			<form class='filter-button-row'>
			  <FilterBox name = 'All' check = 'true'/>
			  <FilterBox name = 'Art'/>
			  <FilterBox name = 'Cinema'/>
			  <FilterBox name = 'Party'/>
			  <FilterBox name = 'Music'/>
			  <FilterBox name = 'Afterwork'/>
			</form>
		)
	}
}
class OtherRow extends React.Component {
	render() {
		return (
			<form class='filter-button-row'>
				<div> Other :
                    <div class="selectionBox">
                      <select>
                        <option value="0">None</option>
                        <option value="1">IGR</option>
                        <option value="2">JMThierry</option>
                        <option value="3">Takumi</option>
                        <option value="4">Comete</option>
                        <option value="5">Binouze</option>
                        <option value="6">CoronaParty</option>
                        <option value="7">LudoRave</option>
                        <option value="8">TagRandom</option>
                        <option value="9">...</option>
                      </select>
                    </div>
                </div>
			</form>
		)
	}
}

class HomeViewWithoutRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
            {title: "Binouze Comète", start: "2020-04-01T08:00:00", end:"2020-04-01T08:00:00", url: "/event/3d708a47-fb84-4c63-a391-26cc194ab086", interessedTag: "Participate", schoolTags: ["Télécom"], typeTags: ["Art", "Cinema", "Party"]},
            {title: "Rencontre BR", date: "2020-04-10T16:30:00", end:"2020-04-10T18:00:00", url: "/event/3d708a47-fb84-4c63-a391-26cc194ab086", interessedTag: "Participate", schoolTags: ["Telecom", "X"], typeTags: ["Afterwork"]},
            ],
            interessedFilter: ["All"],
            schoolFilter: ["All"],
            typeFilter: ["All"],
        };
        this.eventClick = this.eventClick.bind(this);
        this.filterEvents = this.filterEvents.bind(this);
    }

    eventClick(info) {
        info.jsEvent.preventDefault();
        this.props.history.push(info.event.url);
    }

    filterEvents(events) {
        let result = this.state.events;
        if(!this.state.interessedFilter.includes("All")) {
            result = result.filter(event => this.state.interessedFilter.contains(event.interessedTag));
        }
        if(!this.state.schoolFilter.includes("All")) {
            result = result.filter(event => !event.schoolTags.every(item => !this.state.schoolFilter.includes(item)));
        }
        if(!this.state.typeFilter.includes("All")) {
            result = result.filter(event => !event.typeTags.every(item => !this.state.typeFilter.includes(item)));
        }
        return result;
    }

    render() {
        return(
            <div className="content-container">
				<FilterBar/>
                <div className="news-calendar">
                    <FullCalendar
                        defaultView="timeGridWeek"
                        height="parent"
                        plugins={[ timeGridPlugin ]}
                        events={this.filterEvents(this.state.events)}
                        nowIndicator="True"
                        eventClick={this.eventClick}
                    />
                </div>
            </div>
        );
    }
}
const HomeView = withRouter(HomeViewWithoutRouter);

export default HomeView;
