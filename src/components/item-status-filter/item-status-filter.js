import React, {Component} from 'react';
import './item-status-filter.css';


export default class ItemStatusFilter extends Component {

    render() {
        let {btnName, onSetFilteredBtn} = this.props;

        const buttonsNames = ['All', 'Active', 'Done'];

        const buttons = buttonsNames.map( (name, i) => {
            let classes = 'btn';
            classes += name === btnName ? ' btn-info' : ' btn-outline-secondary';

            return <button
                type="button"
                className={classes}
                onClick={() => onSetFilteredBtn(name)}
                key={i}
            >{name}</button>
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );

        /*return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-info"
                >
                    All
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                >
                    Active
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                >
                    Done
                </button>
            </div>
        );*/
    }
};

