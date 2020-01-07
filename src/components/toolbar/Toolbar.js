import React from 'react';
import ToolbarAlarmButton from './alarm/Button.js';
import ToolbarAlarmPanel from './alarm/Panel.js';
import ToolbarAddButton from './add/Button.js';
import ToolbarAddPanel from './add/Panel.js';

import data from '../../data/data.js';

import styles from './Toolbar.module.css';

export default class Toolbar extends React.Component {
    constructor(props) {
		super(props)

		this.state = {
			isAlarmPanelVisible: false,
			isAddPanelVisible: false,
			recents: []
		}

		this.onAlarm = this.onAlarm.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onAddExpand = this.onAddExpand.bind(this);
        this.onTransactionSelect = this.onTransactionSelect.bind(this);
        this.hidePanels = this.hidePanels.bind(this);
    }

    componentDidMount() {
        data.transactions.getRecents(10).then(items => {
            this.setState({
                recents: items
            });
        });
    }

    render() {
        let alarmPanel = null;
		let addPanel = null;

		if (this.state.isAlarmPanelVisible) {
			alarmPanel = <ToolbarAlarmPanel />
		}

		if (this.state.isAddPanelVisible) {
			addPanel = <ToolbarAddPanel items={this.state.recents} onSelect={this.onTransactionSelect} />
		}

    	return (
    	  	<div className={styles.container}>
			  	<div className={styles.add}>
				  	<ToolbarAddButton onClick={this.onAdd} onExpand={this.onAddExpand} isExpanded={this.state.isAddPanelVisible} />
					{addPanel}
			  	</div>
				<div className={styles.alarm}>
        			<ToolbarAlarmButton badgeCount={3} onClick={this.onAlarm} />
					{alarmPanel}
				</div>
      		</div>
    	);
    }

    onAlarm() {
		this.setState({
			isAlarmPanelVisible: !this.state.isAlarmPanelVisible
		});
	}

	onAdd() {
		this.setState({
			isAddPanelVisible: false
		});
	}

	onAddExpand() {
		const visible = !this.state.isAddPanelVisible;

		this.setState({
			isAddPanelVisible: visible
        });

        if (visible) {
            document.addEventListener('click', this.hidePanels);
        } else {
            document.removeEventListener('click', this.hidePanels);
        }
	}

	onTransactionSelect(id) {
		this.setState({
			isAddPanelVisible: false
		});
    }

    hidePanels() {
        this.setState({
            isAlarmPanelVisible: false,
            isAddPanelVisible: false
        });

        document.removeEventListener('click', this.hidePanels);
    }
}