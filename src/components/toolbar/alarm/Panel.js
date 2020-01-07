import React from 'react';

import styles from './Panel.module.css';

export default class ToolbarAlarmPanel extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.item}>
                    <div className={styles.label}>New alert here</div>
                </div>
            </div>
        );
    }
}