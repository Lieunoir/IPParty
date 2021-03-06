import React from 'react';
import './tags.css';

class TagsSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }


    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.handleClick();
        }
    }

    handleChange(event) {
        this.setState({tagName: event.target.value });
    }

    handleClick() {
        this.props.addTag(this.state.tagName);
        this.setState({tagName: '' });
    }

    render() {
        return(
            <div>
                <span >
                    <input onKeyDown={this.handleKeyDown} value={this.state.tagName} onChange={this.handleChange} className="tags-search-text" type="text" name="tagName" placeholder="Search..." />
                </span>
                <span className="tags-search-button-span">
                    <button onClick={this.handleClick} className="tags-search-button">Add</button>
                </span>
            </div>
        )
    }
}

class TagWidget extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.removeTag(this.props.name);
	}

    render() {
        return(
            <span className="tags-widget">
                {this.props.name}
                <span onClick={this.handleClick} className="tags-widget-delete"></span>
            </span>
        )
    }
}

class TagsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: props.tagList
        };
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    addTag(name) {
        this.setState({
            tagList: [...this.state.tagList, {"name": name}]
        });
    }

	removeTag(name) {
		this.setState({
			tagList: this.state.tagList.filter(tag => tag.name !== name)
		});
	}

    render() {
        return(
            <div>
                <TagsSelector addTag={this.addTag}/>
                {this.state.tagList.map(tag => (
                    <TagWidget removeTag={this.removeTag} name={tag.name} />
                ))}
            </div>
        )
    }

}

export default TagsMenu;
