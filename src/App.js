import React from 'react';
import SplitPane from 'react-split-pane';
import TreeMenu, { TreeMenuTypes } from './components/treemenu/Menu.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Transactions from './components/transactions/Transactions.js';

import styles from './App.module.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPage: 0
		}

		this.onMenuSelect = this.onMenuSelect.bind(this)
	}

	render() {
		let page = null;

		switch (this.state.selectedPage) {
			case TreeMenuTypes.Dashboard:
				page = <Dashboard />
				break;

			case TreeMenuTypes.Accounts:
				page = <Transactions />
				break;
			default:
				page = null;
		}

    	return (
    	  	<div className={styles.container}>
			  	<div className={styles.toolbar}>
				</div>
        		<div className={styles.content}>
					<SplitPane split="vertical" minSize={300} defaultSize={300} resizerClassName={styles.resizer}>
						<div className={styles.leftPanel}>
							<TreeMenu onSelect={this.onMenuSelect} />
						</div>
						<div className={styles.rigthPanel}>
							{page}
						</div>
					</SplitPane>
				</div>
				<div className={styles.statusbar}>
				</div>
      		</div>
    	);
	  }

	onMenuSelect(type, object) {
		this.setState({
			selectedPage: type
		})
	}
}
