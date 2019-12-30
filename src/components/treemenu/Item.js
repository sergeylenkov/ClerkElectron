import React from 'react';
import { TreeMenuIcons } from '../../assets/menu/Icons.js';

import styles from './Item.module.css';

export default class TreeMenuItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isExpanded: false
		}

		this.onClick = this.onClick.bind(this)
	}

	render() {
		let children = null;

		if (this.props.children) {
			children = <div className={`${styles.children} ${this.state.isExpanded ? styles.expanded : ''}`}>
				{this.props.children}
			</div>
		}

		let isExpandable = false;

		if (this.props.children && this.props.children.length > 0) {
			isExpandable = true;
		}

    	return (
			<div className={styles.container}>
				<div className={`${styles.item} ${isExpandable ? styles.expandable : ''} ${this.state.isExpanded ? styles.expanded : ''} ${this.props.isSelected ? styles.selected : ''}`} onClick={this.onClick}>
					<div className={styles.selection}></div>
					<div className={styles.arrow} style={{ backgroundImage: `url(${TreeMenuIcons.arrow})` }}></div>
					<div className={styles.icon} style={{ backgroundImage: `url(${this.props.icon})` }}></div>
					<div className={styles.label}>{this.props.label}</div>
				</div>
				{children}
			</div>
    	);
	}

	onClick() {
		this.setState({
			isExpanded: !this.state.isExpanded
		});

		this.props.onSelect(this.props.type, this.props.object);
	}
}
