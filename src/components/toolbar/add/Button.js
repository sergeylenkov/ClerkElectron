import React from 'react';
import { Icon, Icons } from '../../Icon.js';

import styles from './Button.module.css';

export default class ToolbarAddButton extends React.Component {
    constructor(props) {
        super(props);

        this.onExpand = this.onExpand.bind(this);
        this.onClick= this.onClick.bind(this);
    }

    render() {
        return (
            <button className={`${styles.container} ${ this.props.isExpanded ? styles.expanded : '' }`} onClick={this.onClick}>
                <div className={styles.icon}><Icon svg={Icons.plus}/></div>
                <div className={styles.label}>Transaction</div>
                <div className={styles.expandButton} onClick={this.onExpand}>
                    <div className={styles.arrow}></div>
                </div>
            </button>
        );
    }

    onExpand(e) {
        e.stopPropagation();

        this.props.onExpand();
    }

    onClick() {
        this.props.onClick();
    }
}