import React from 'react';
import './newsView.css';
import partyImage from './image/takumiparty.jpeg';

class News extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: props.message,
			imagesrc: props.image
		}
	}
	render() {
		return(
			<div class='News'>
				<div class="message">
					<div>{this.state.message} </div>
					<button>See More</button>
				</div>

				<div>
					<img src={partyImage} height="80" width="80"/>
				</div>
			</div>
		)
	}
}

class NewsView extends React.Component {
    render() {
        return(
            <div className="content-container">
                <div className="menu-bar">
                    <div className="menu-bar-text">
                        News
                    </div>
                </div>
                <div className="content">
                    <div className="content-deck">
                        <News message='Takumi has created a New Event!'
                            image='escher1.jpg'/>
                        <News message='Takumi has created another New Event!!!!!'
                            image='../images/takumiparty.jpeg'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsView;
