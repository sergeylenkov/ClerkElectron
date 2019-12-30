import React from 'react';
import SplitPane from 'react-split-pane';
import TreeMenu from './components/treemenu/Menu.js';
import Dashboard from './components/dashboard/Dashboard.js';

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
    	return (
    	  	<div className={styles.container}>
			  	<div className={styles.toolbar}>
				</div>
        		<div className={styles.content}>
					<SplitPane split="vertical" minSize={300} defaultSize={300} resizerClassName={styles.resizer}>
						<div className={styles.leftPanel}>
							<TreeMenu onSelect={this.onMenuSelect} />
						</div>
						<div>
							<Dashboard />
						</div>
					</SplitPane>
				</div>
				<div className={styles.statusbar}>
				</div>
      		</div>
    	);
	  }

	  onMenuSelect() {

	  }
}
