import React from 'react';
import './button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        };
        this.toggleHover = this.toggleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggleHover() {
        this.setState({
            hovered: !this.state.hovered,
        })
    }

    handleClick() {
        this.props.onClick(this.props.message);
    }

    render() {
        return (
            <span className={this.state.hovered ? "button-hovered" : "button"} onClick={this.handleClick} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                {this.props.text}
            </span>
        );
    }
}
export default Button;
