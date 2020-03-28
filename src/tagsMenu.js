import React from 'react';

class TagWidget extends React.Component {
    render() {
        return(
            <div>
                {this.props.name}
            </div>
        )
    }
}

class TagsMenu extends React.Component {
    render() {
        return(
            <div>
                {this.props.tagList.map(tag => (
                    <TagWidget name={tag.name} />
                ))}
            </div>
        )
    }

}

export default TagsMenu;
