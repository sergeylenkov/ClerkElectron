import React from 'react';
import TreeMenuItem from './Item.js';
import { TreeMenuIcons } from '../../assets/menu/Icons.js';
import { AccountsIcons } from '../../assets/accounts/Icons.js';
import data, { AccountTypes } from '../../data/data.js';

import styles from './Menu.module.css';

export const TreeMenuTypes = {
	Dashboard: 0,
	Accounts: 1,
	Receipts: 2,
	Deposits: 3,
	Virtual: 4,
	Expenses: 5,
	Debts: 6,
	Archive: 7,
	Account: 8,
	Reports: 9,
	Budgets: 10,
	Goals: 11,
	Schedulers: 12,
	Alerts: 13,
	Tags: 14,
	Trash: 15,

}

export default class TreeMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accounts: [],
			selectedType: TreeMenuTypes.Dashboard,
			selectedObject: null
		}

		this.onSelect = this.onSelect.bind(this)
	}

	componentDidMount() {
		data.accounts.all().then(accounts => {
			this.setState({
				accounts: accounts
			});
		});
	}

	render() {
		let accounts = this.getAccounts();

    	return (
    	  	<div className={styles.container}>
				<TreeMenuItem
					key={TreeMenuTypes.Dashboard}
					type={TreeMenuTypes.Dashboard}
					label="Dashboard"
					icon={TreeMenuIcons.dashboard}
					isSelected={this.state.selectedType === TreeMenuTypes.Dashboard}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Accounts}
					type={TreeMenuTypes.Accounts}
					label="Accounts"
					icon={TreeMenuIcons.accounts}
					children={accounts}
					isSelected={this.state.selectedType === TreeMenuTypes.Accounts}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Reports}
					type={TreeMenuTypes.Reports}
					label="Reports"
					icon={TreeMenuIcons.reports}
					isSelected={this.state.selectedType === TreeMenuTypes.Reports}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Budgets}
					type={TreeMenuTypes.Budgets}
					label="Budgets"
					icon={TreeMenuIcons.budgets}
					isSelected={this.state.selectedType === TreeMenuTypes.Budgets}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Goals}
					type={TreeMenuTypes.Goals}
					label="Goals"
					icon={TreeMenuIcons.goals}
					isSelected={this.state.selectedType === TreeMenuTypes.Goals}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Schedulers}
					type={TreeMenuTypes.Schedulers}
					label="Schedulers"
					icon={TreeMenuIcons.schedulers}
					isSelected={this.state.selectedType === TreeMenuTypes.Schedulers}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Alerts}
					type={TreeMenuTypes.Alerts}
					label="Alerts"
					icon={TreeMenuIcons.alerts}
					isSelected={this.state.selectedType === TreeMenuTypes.Alerts}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Tags}
					type={TreeMenuTypes.Tags}
					label="Tags"
					icon={TreeMenuIcons.tags}
					isSelected={this.state.selectedType === TreeMenuTypes.Tags}
					onSelect={this.onSelect} />

				<TreeMenuItem
					key={TreeMenuTypes.Trash}
					type={TreeMenuTypes.Trash}
					label="Trash"
					icon={TreeMenuIcons.trashEmpty}
					isSelected={this.state.selectedType === TreeMenuTypes.Trash}
					onSelect={this.onSelect} />
      		</div>
    	);
	}

	getAccounts() {
		const { selectedType, selectedObject } = this.state;

		const accountMenuItem = (account) => {
			let isSelected = false;

			if (selectedType === TreeMenuTypes.Account && (selectedObject && selectedObject.id === account.id)) {
				isSelected = true;
			}

			return <TreeMenuItem
						key={account.id}
						type={TreeMenuTypes.Account}
						object={account}
						label={account.name}
						icon={AccountsIcons[account.icon]}
						isSelected={isSelected}
						onSelect={this.onSelect} />;
		}

		const receipts = this.state.accounts.filter(account => {
			return account.type === AccountTypes.Receipts && account.active === true
		}).map(account => {
			return accountMenuItem(account);
		});

		const deposits = this.state.accounts.filter(account => {
			return account.type === AccountTypes.Deposits && account.active === true
		}).map(account => {
			return accountMenuItem(account);
		});

		const virtual = this.state.accounts.filter(account => {
			return account.type === AccountTypes.Virtual && account.active === true
		}).map(account => {
			return accountMenuItem(account);
		});

		const expenses = this.state.accounts.filter(account => {
			return account.type === AccountTypes.Expenses && account.active === true
		}).map(account => {
			return accountMenuItem(account);
		});

		const debts = this.state.accounts.filter(account => {
			return account.type === AccountTypes.Debts && account.active === true
		}).map(account => {
			return accountMenuItem(account);
		});

		const archive = this.state.accounts.filter(account => {
			return account.active === false
		}).map(account => {
			return accountMenuItem(account);
		});

		return [
			<TreeMenuItem
				key={TreeMenuTypes.Receipts}
				type={TreeMenuTypes.Receipts}
				label="Receipts"
				icon={TreeMenuIcons.group}
				children={receipts}
				isSelected={this.state.selectedType === TreeMenuTypes.Receipts}
				onSelect={this.onSelect} />,
			<TreeMenuItem
				key={TreeMenuTypes.Deposits}
				type={TreeMenuTypes.Deposits}
				label="Deposits"
				icon={TreeMenuIcons.group}
				children={deposits}
				isSelected={this.state.selectedType === TreeMenuTypes.Deposits}
				onSelect={this.onSelect} />,
			<TreeMenuItem
				key={TreeMenuTypes.Virtual}
				type={TreeMenuTypes.Virtual}
				label="Virtual"
				icon={TreeMenuIcons.group}
				children={virtual}
				isSelected={this.state.selectedType === TreeMenuTypes.Virtual}
				onSelect={this.onSelect} />,
			<TreeMenuItem
				key={TreeMenuTypes.Expenses}
				type={TreeMenuTypes.Expenses}
				label="Expenses"
				icon={TreeMenuIcons.group}
				children={expenses}
				isSelected={this.state.selectedType === TreeMenuTypes.Expenses}
				onSelect={this.onSelect} />,
			<TreeMenuItem
				key={TreeMenuTypes.Debts}
				type={TreeMenuTypes.Debts}
				label="Debts"
				icon={TreeMenuIcons.group}
				children={debts}
				isSelected={this.state.selectedType === TreeMenuTypes.Debts}
				onSelect={this.onSelect} />,
			<TreeMenuItem
				key={TreeMenuTypes.Archive}
				type={TreeMenuTypes.Archive}
				label="Archive"
				icon={TreeMenuIcons.archive}
				children={archive}
				isSelected={this.state.selectedType === TreeMenuTypes.Archive}
				onSelect={this.onSelect} />
		];
	}

	onSelect(type, object) {
		console.log(type, object);
		this.setState({
			selectedType: type,
			selectedObject: object
		});

		this.props.onSelect();
	}
}
