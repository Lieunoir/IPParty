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
				<InteressedRow addFilter={this.props.addInteressedFilter} removeFilter={this.props.removeInteressedFilter}/>
				<SchoolRow addFilter={this.props.addSchoolFilter} removeFilter={this.props.removeSchoolFilter}/>
				<EventTypeRow addFilter={this.props.addTypeFilter} removeFilter={this.props.removeTypeFilter}/>
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
        this.handleChange = this.handleChange.bind(this);
	}

    handleChange(event) {
        this.setState({
            check: event.target.checked
        });
        if(event.target.checked)
            this.props.addFilter(this.state.name);
        else
            this.props.removeFilter(this.state.name);
    }

	render() {
		return (
            <>
              <span className="filter-bar-checkbox">
                <input type="checkBox" value={this.state.name} checked={this.state.check} onChange={this.handleChange} />
                {this.state.name}
              </span>
              <br/>
            </>
		)
	}
}
class InteressedRow extends React.Component {
	render() {
		return(
			<form class='filter-button-row'>
			  <FilterBox name = 'All' check = 'true' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Interessed' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Participate' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Maybe' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			</form>
		)
	}
}
class SchoolRow extends React.Component {
	render() {
		return(
			<form class='filter-button-row'>
			  <FilterBox name = 'All' check = 'true' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Télécom' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'X' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'ENSTA' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'ENSAE' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = "Sup'Optique" addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			</form>
		)
	}
}
class EventTypeRow extends React.Component{
	render() {
		return(
			<form class='filter-button-row'>
			  <FilterBox name = 'All' check = 'true' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Art' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Cinema' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Party' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Music' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
			  <FilterBox name = 'Afterwork' addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
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
            {title: "Rencontre BR-Rezel", date: "2020-04-10T16:30:00", end:"2020-04-10T18:00:00", url: "/event/3d708a47-fb84-4c63-a391-26cc194ab086", interessedTag: "Participate", schoolTags: ["Télécom", "X"], typeTags: ["Afterwork"]},
            {title: "Große Binouze Franco-Allemande", date: "2020-04-08T19:30:00", end:"2020-04-08T22:00:00", url: "/event/3d708a47-fb84-4c63-a391-26cc194ab086", interessedTag: "Maybe", schoolTags: ["Télécom"], typeTags: ["Party"]},
            {title: "Nuit des défis", date: "2020-04-09T20:00:00", end:"2020-04-10T12:00:00", url: "/event/3d708a47-fb84-4c63-a391-26cc194ab086", interessedTag: "Interessed", schoolTags: ["Télécom"], typeTags: ["Afterwork", "Party"]},
            {title: "Pôt Telecom-ENSTA", date: "2020-04-10T22:00:00", end:"2020-04-11T04:00:00", url: "/event/3d708a47-fb84-4c63-a391-26cc194ab086", interessedTag: "Maybe", schoolTags: ["Télécom", "ENSTA"], typeTags: ["Party"]},
            {title: "Atelier montage", date: "2020-04-06T17:30:00", end:"2020-04-06T19:00:00", url: "/event/3d708a47-fb84-4c63-a391-26cc194ab086", interessedTag: "Participate", schoolTags: ["Télécom"], typeTags: ["Afterwork", "Art", "Cinema"]},
            ],
            interessedFilter: ["All"],
            schoolFilter: ["All"],
            typeFilter: ["All"],
        };
        this.eventClick = this.eventClick.bind(this);
        this.filterEvents = this.filterEvents.bind(this);
        this.addInteressedFilter = this.addInteressedFilter.bind(this);
        this.addSchoolFilter = this.addSchoolFilter.bind(this);
        this.addTypeFilter = this.addTypeFilter.bind(this);
        this.removeInteressedFilter = this.removeInteressedFilter.bind(this);
        this.removeSchoolFilter = this.removeSchoolFilter.bind(this);
        this.removeTypeFilter = this.removeTypeFilter.bind(this);
    }

    eventClick(info) {
        info.jsEvent.preventDefault();
        this.props.history.push(info.event.url);
    }

    addInteressedFilter(tag) {
        this.setState({
            interessedFilter: this.state.interessedFilter.concat(tag),
        });
    }

    addSchoolFilter(tag) {
        this.setState({
            schoolFilter: this.state.schoolFilter.concat(tag),
        });
    }

    addTypeFilter(tag) {
        this.setState({
            typeFilter: this.state.typeFilter.concat(tag),
        });
    }

    removeInteressedFilter(tag) {
        this.setState({
            interessedFilter: this.state.interessedFilter.filter(item => item !== tag),
        });
    }

    removeSchoolFilter(tag) {
        this.setState({
            schoolFilter: this.state.schoolFilter.filter(item => item !== tag),
        });
    }

    removeTypeFilter(tag) {
        this.setState({
            typeFilter: this.state.typeFilter.filter(item => item !== tag),
        });
    }

    filterEvents(events) {
        let result = this.state.events;
        if(!this.state.interessedFilter.includes("All")) {
            result = result.filter(event => this.state.interessedFilter.includes(event.interessedTag));
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
				<FilterBar
                    addInteressedFilter={this.addInteressedFilter}
                    addSchoolFilter={this.addSchoolFilter}
                    addTypeFilter={this.addTypeFilter}
                    removeInteressedFilter={this.removeInteressedFilter}
                    removeSchoolFilter={this.removeSchoolFilter}
                    removeTypeFilter={this.removeTypeFilter}
                />
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
