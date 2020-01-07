import React from 'react';

import styles from './Item.module.css';

export default class ToolbarAddPanelItem extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div className={styles.container} onClick={this.onClick}>
                <div className={styles.fromName}>{this.props.item.fromName}</div>
                <div className={styles.divider}>&#8250;</div>
                <div className={styles.toName}>{this.props.item.toName}</div>
                <div className={styles.tags}>
                    {
                        this.props.item.tags.map((tag, i) => {
                            return (<div key={i} className={styles.tag}>{tag.name}</div>)
                        })
                    }
                </div>
            </div>
        );
    }

    onClick() {
        this.props.onClick(this.props.item.id)
    }
}