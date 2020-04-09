import React from 'react';
import './userCards.css';

class AuthorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            author: null,
        };
    }

    componentDidMount() {
        fetch("/partyline/user/" + this.props.uuid)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        author: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        author: {"displayName":"Takumi","email":"s.dacunha@crans.org","photo":"https://assets.crans.org/s.dacunha/photo.jpg","node_id":"ens-paris-saclay"},
                        //error
                    });
                }
            )

    }

    addDefaultSrc(ev) {
        ev.target.src = "https://www.w3schools.com/howto/img_avatar2.png";
    }

    render() {
        const imgStyle = {borderRadius: "50%"};
        const { error, isLoaded, author } = this.state;

        if (error) {
            return <span>Error: {error.message}</span>;
        } else if (!isLoaded) {
            return (
                <span className="author-card">
                    <div>Loading...</div>
                </span>
            );
        } else {
            return (
                <div className="author-card">
                    <span className="author-card-image">
                        <img src={author.photo}  onError={this.addDefaultSrc} alt="" style={imgStyle} />
                    </span>
                    <span className="author-card-name">
                        {author.displayName}
                    </span>
                </div>
            );
        }
    }
}

export default AuthorCard;
