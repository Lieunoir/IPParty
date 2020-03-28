import React from 'react';
import AuthorCard from './userCards.js';
import Microlink from '@microlink/react';
import './posts.css';
import './container.css';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            showAnswer: false,
            title: "",
            description: "",
        }
        this.toggleHover = this.toggleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showAnswer = this.showAnswer.bind(this);
        this.hideAnswer = this.hideAnswer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleHover() {
        this.setState({
            hovered: !this.state.hovered,
        });
    }

    handleClick(e) {
        e.stopPropagation();
        alert(1);
    }

    showAnswer() {
        this.setState({
            showAnswer: true,
        });
    }

    hideAnswer() {
        this.setState({
            showAnswer: false,
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        fetch('/partyline/posts/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                createdAt: "2019-03-16T23:08:58.109Z",
                updatedAt: "2019-03-16T23:08:58.109Z",
                uuid: this.props.uuid,
                nodeId: "telecom-paristech",
                author: {
                    id: "27740b47-0507-40de-b215-5dfa6942f6d8",
                    type: "user",
                    nodeId: "telecom-paristech"
                },
                parent: {
                    id: this.props.uuid,
                    type: "post",
                },
                attachments: [],
                children: [],
            })
        });
        alert("Submitted");
        event.preventDefault();
    }

    render() {
        const buttonStyle = this.state.hovered ? {} : {visibility: "hidden"};
        return (
            <div className="comment-tree">
                <div className="comment" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    <div className="comment-header">
                        { this.props.title !== "" && this.props.title !== null &&
                            <span className="comment-title">
                                {this.props.title}
                            </span>
                        }
                        <span className="comment-author">
                            <AuthorCard uuid={this.props.author}/>
                        </span>
                        <span className="comment-buttons">
                            <button onClick={this.handleClick} style={buttonStyle}>Edit</button>
                            <button onClick={this.handleClick} style={buttonStyle}>Delete</button>
                            <button onClick={this.showAnswer} style={buttonStyle}>Answer</button>
                        </span>
                    </div>
                    <div className="comment-description">
                        {this.props.description}
                    </div>
                    {/*{this.props.attachments.length !== 0 &&
                        <div className="comment-attachments">
                            {this.props.attachments.map(attachment => (
                                <>
                                <Microlink url={attachment} size='large' />
                                <img src={attachment} alt=""/>
                                </>
                            ))}
                        </div>
                    }*/}
                </div>
                { this.state.showAnswer &&
                    <div className="answer-comment">
                        <form onSubmit={this.handleSubmit}>
                            <input className="answer-comment-title" type="text" name="title" placeholder="Titre" value={this.props.title} onChange={this.handleChange} />
                            <button onClick={this.hideAnswer}>Close</button>
                            <textarea className="answer-comment-description" name="description" placeholder="Contenu" value={this.props.description} onChange={this.handleChange} />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                }
                <div className="post-answers">
                    {this.props.children.length !== 0 &&
                        <CommentList list={this.props.children} />
                    }
                </div>
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        return (
            <>
            {this.props.list.length !== 0 &&
                <div className="comment-list">
                    {this.props.list.map(post => (
                        <Comment
                            title={post.title}
                            author={post.author}
                            description={post.description}
                            uuid={post.uuid}
                            children={post.children}
                            attachments={post.attachments}
                        />
                    ))}
                </div>
            }
            </>
        );
    }
}

class PostWithPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        alert(1);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        fetch('/partyline/posts/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                place: this.state.place,
                createdAt: "2019-03-16T23:08:58.109Z",
                updatedAt: "2019-03-16T23:08:58.109Z",
                uuid: this.props.uuid,
                nodeId: "telecom-paristech",
                author: {
                    id: "27740b47-0507-40de-b215-5dfa6942f6d8",
                    type: "user",
                    nodeId: "telecom-paristech"
                },
                parent: {
                    id: this.props.uuid,
                    type: "post",
                },
                attachments: [],
            })
        });
        alert("Submitted");
        event.preventDefault();
    }

    render() {
        return (
            <div className="post" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <div className="post-header">
                    { this.props.title !== "" &&
                        <div className="post-title">
                            {this.props.title}
                        </div>
                    }
                    <span className="post-author">
                        <AuthorCard uuid={this.props.author}/>
                    </span>
                    <span className="post-buttons">
                        <button onClick={this.handleClick}>Edit</button>
                        <button onClick={this.handleClick}>Delete</button>
                    </span>
                </div>
                <div className="post-description">
                    {this.props.description}
                </div>
                <div className="answer-post">
                    <form onSubmit={this.handleSubmit}>
                        <input className="answer-post-title" type="text" name="title" placeholder="Titre" value={this.state.title} onChange={this.handleChange} />
                        <textarea className="answer-post-description" name="description" placeholder="Contenu" value={this.state.description} onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

class PostWithComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            post: null,
            hoveredEvent: "",
        };
    }

    hoverEvent() {
    }

    componentDidMount() {
        fetch("/partyline/posts/" + this.props.match.params.uuid)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        post: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    render() {
        const { error, isLoaded, post } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="content-container">
                    <div className="content">
                        <div>Loading...</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="content-container">
                    <div className="content">
                        <div className="content-deck">
                            <PostWithPost
                            title={post.title}
                            author={post.author}
                            description={post.description}
                            uuid={post.uuid}
                            />
                            <CommentList list={post.children} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Comment;
export {CommentList, PostWithComments};
