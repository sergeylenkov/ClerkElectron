import React from 'react';
import styled from 'styled-components';
import SplitPane from 'react-split-pane';
import TreeMenu, { TreeMenuTypes } from './components/treemenu/Menu.js';
import Toolbar from './components/toolbar/Toolbar';
import Dashboard from './components/dashboard/Dashboard.js';
import Transactions from './components/transactions/Transactions.js';
import Reports from './components/reports/Reports.js';

const Container = styled.div`
	position: absolute;

	width: 100vw;
	height: 100vh;

	display: flex;
	flex-direction: column;
	overflow: hidden;
`

const ToolbarContainer = styled.div`
	width: 100%;
	height: 40px;

	flex-shrink: 0;
    border-bottom: 1px solid #e8e8e8;
`

const Content = styled.div`
	position: relative;
	width: 100%;
	flex-grow: 1;
`

const LeftPanel = styled.div`
	height: 100%;
	background-color: rgb(250, 251, 252);
    border-right: 1px solid rgb(223, 226, 229);
`

const RigthPanel = styled.div`
	width: 100%;
	height: 100%;
`

const StyledSplitPane = styled(SplitPane)`
	.resizer {
		width: 11px;
  		margin: 0 -5px;
	  cursor: ew-resize;
	}
`

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

			case TreeMenuTypes.Reports:
				page = <Reports />
				break;

			default:
				page = null;
		}

    	return (
    	  	<Container>
			  	<ToolbarContainer>
					  <Toolbar />
				</ToolbarContainer>
        		<Content>
					<StyledSplitPane split="vertical" minSize={300} defaultSize={300} resizerClassName={'resizer'}>
						<LeftPanel>
							<TreeMenu onSelect={this.onMenuSelect} />
						</LeftPanel>
						<RigthPanel>
							{page}
						</RigthPanel>
					</StyledSplitPane>
				</Content>
      		</Container>
    	);
	  }

	onMenuSelect(type, object) {
		this.setState({
			selectedPage: type
		})
	}
}
