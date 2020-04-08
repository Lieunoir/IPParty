import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './main.scss'
import './homeView.css'
//import './button.css'
/*
A Mettre dans <div> :
<FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}
events={[
{ title: 'event 1', date: '2019-04-01' },
{ title: 'event 2', date: '2019-04-02' }
]}
/*/

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

class HomeView extends React.Component {
    render() {
        return(
            <div className="content-container">
				<FilterBar/>
                <div className="news-calendar">
                    <FullCalendar defaultView="dayGridMonth" height="parent" plugins={[ dayGridPlugin ]} />
                </div>
            </div>
        );
    }
}

export default HomeView;
