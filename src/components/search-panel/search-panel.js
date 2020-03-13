import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        searchedText: ''
    };

    setSearchText = e => {
        this.setState({
            searchedText: e.target.value
        });

        this.props.onSetSearchText(e.target.value)

    };

    render() {
        return <input
            type="text"
            className="form-control search-input"
            placeholder="type to search"
            value={this.state.searchedText}
            onChange={this.setSearchText}
        />;
    }
}