import React from 'react';
import styled from 'styled-components';
import { TreeMenuIcons } from '../../assets/menu/Icons.js';

const Container = styled.div`
    width: 100%;
	padding: 0 0 0 20px;

    display: flex;
	flex-direction: column;

	box-sizing: border-box;
`

const Item = styled.div`
    width: 100%;
	height: 20px;

    display: flex;
    flex-direction: row;
	flex-shrink: 0;

    cursor: pointer;
`

const Arrow = styled.div`
	margin: auto 5px auto 0;

    width: 12px;
	height: 12px;

    background-image: none;
    background-repeat: no-repeat;
    background-size: cover;

	visibility: ${ props => props.expandable ? 'visible' : 'hidden' };
	transform: ${ props => props.expanded ? 'rotate(0deg)' : 'rotate(-90deg)' };
`

const Icon = styled.div`
	margin: auto 5px auto 0;

	width: 16px;
	height: 16px;

	flex-shrink: 0;

	background-image: none;
    background-repeat: no-repeat;
	background-size: cover;

	z-index: 1;
`

const Label = styled.div`
	margin: auto 0;

	font-size: 12px;

    white-space: nowrap;
    overflow: hidden;
	text-overflow: ellipsis;

	z-index: 1;
`

const Children = styled.div`
	width: 100%;

    flex-direction: column;
	display: ${ props=> props.expanded ? 'flex' : 'none' };
`

const Selection = styled.div`
    position: absolute;
	left: 0;

    width: 100%;
	height: 20px;

	background-color: ${ props => props.selected ? 'rgb(219, 238, 255)' : '' };

	z-index: 0;

	${Item}:hover & {
		background-color: rgb(224, 224, 224);
	}
`

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
			children = (
				<Children expanded={this.state.isExpanded}>
					{this.props.children}
				</Children>
			)
		}

		let isExpandable = false;

		if (this.props.children && this.props.children.length > 0) {
			isExpandable = true;
		}

    	return (
			<Container>
				<Item
					expandable={isExpandable}
					expanded={this.state.isExpanded}
					selected={this.props.isSelected}
					onClick={this.onClick}
				>
					<Selection selected={this.props.isSelected} />
					<Arrow expandable={isExpandable} expanded={this.state.isExpanded} style={{ backgroundImage: `url(${TreeMenuIcons.arrow})` }}></Arrow>
					<Icon style={{ backgroundImage: `url(${this.props.icon})` }}></Icon>
					<Label>{this.props.label}</Label>
				</Item>
				{children}
			</Container>
    	);
	}

	onClick() {
		this.setState({
			isExpanded: !this.state.isExpanded
		});

		this.props.onSelect(this.props.type, this.props.object);
	}
}
