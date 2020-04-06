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
	constructor(props) {
		super(props);
		this.state = {
			content: [
				['Interessed','Participate','Followed'],
				['Télécom','X','ENSTA','ENSAE','Centrale','Supop'],
				['Party','Music','Art','Cinema','Meeting','Afterwork']
			]
		}
	}
	renderRow(i) {
		return(
			<ButtonRow/>
		)
	}
	render() {
		return (
			<div class="FilterBar">
				{this.renderRow(0)}
				{this.renderRow(1)}
				{this.renderRow(2)}
			</div>
		);
	}
}

class ButtonRow extends React.Component{

	render() {
		return(
			<form class='buttonRow'>
			  <div className="checkBox">
				<label>
				  <input type="checkBox" value="option1" checked={true} />
				  Option 1
				</label>
			  </div>
			  <div className="checkBox">
				<label>
				  <input type="checkBox" value="option1" checked={true} />
				  Option 1
				</label>
			  </div>
			  <div className="checkBox">
				<label>
				  <input type="checkBox" value="option1" checked={true} />
				  Option 1
				</label>
			  </div>

			</form>
		)
	}
}

class HomeView extends React.Component {
    render() {
        return(
            <div className="created-view">
				<FilterBar/>
				<p>Ceci est un calendrier normalement </p>
            </div>
        );
    }
}

export default HomeView;
